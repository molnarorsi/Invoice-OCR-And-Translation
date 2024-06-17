from flask import Blueprint, request, jsonify
from doctr.models import ocr_predictor
from PIL import Image
import numpy as np
from app.models import Invoice, db
from flask import session
from app.parserOCR import parse_text
import time
from app.addInvoiceToDB import add_invoice, load_image, check_is_invoice

doctr_bp = Blueprint('doctr', __name__)


def calculate_word_score(word):
    # Assuming `word` is an object with a `confidence` attribute
    return word.confidence

@doctr_bp.route('/doctr', methods=['POST'])
def doctr():
    img = load_image()
    ocr_method = 'DocTROCR'

    start_time_rec = time.time()

    print(f"Image shape before batch dimension: {img.shape}")
    model = ocr_predictor(det_arch='db_resnet50', reco_arch='crnn_vgg16_bn', pretrained=True)
    
    img_batch = np.expand_dims(img, axis=0)
    print(f"Image shape after adding batch dimension: {img_batch.shape}")
    
    result = model(img_batch)
    rec_time = time.time() - start_time_rec
    print(f"Result: {result}")  # Print the result to inspect its structure
    
    # Extract text from result
    text = []
    total_score = 0
    nr_words = 0
    for page in result.pages:
        for block in page.blocks:
            for line in block.lines:
                for word in line.words:
                    text.append(word.value)
                    total_score += calculate_word_score(word)
                    nr_words += 1
    avg_score = total_score / nr_words if nr_words > 0 else 0
                    
    text_str = ' '.join(text)  # Convert list of words to a single string
    
    start_time_parse = time.time()

    parsed_text = parse_text(text_str)

    parse_time = time.time() - start_time_parse

    isInvoice = check_is_invoice(parsed_text)

    if isInvoice:
        file_pdf = None
        file_image = None
        if request.files.get('pdf'):
            file_pdf = request.files['pdf'].read()
        elif request.files.get('image'):
            file_image = request.files['image'].read()

        invoice_id = add_invoice(parsed_text, text, file_pdf, file_image, avg_score*100, rec_time, parse_time, ocr_method)

        return jsonify({'invoice_id': invoice_id, 'text': text_str, 'parsed_text': parsed_text, 'time': {'recognition': rec_time, 'parsing': parse_time}, 'avg_score': avg_score*100})
    
    return jsonify({'text': text_str, 'parsed_text': parsed_text, 'time': {'recognition': rec_time, 'parsing': parse_time}, 'avg_score': avg_score*100})
