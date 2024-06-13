from flask import Blueprint, request, jsonify
from doctr.models import ocr_predictor
from PIL import Image
import numpy as np
from app.models import Invoice, db
from flask import session
from app.parserOCR import parse_text

doctr_bp = Blueprint('doctr', __name__)

def load_image():
    file = request.files['file']
    image = Image.open(file.stream).convert('RGB')
    return np.array(image)

def add_invoice(parsed_text):
    invoice = Invoice(
        user_id=session.get('user_id'),
        invoice_number=parsed_text.get('invoice_number'),
        invoice_CIF=parsed_text.get('invoice_CIF'),
        date_of_issue=parsed_text.get('date_of_issue'),
        due_date=parsed_text.get('due_date'),
        total_price=parsed_text.get('total_price'),
        IBAN=parsed_text.get('IBAN'),
        bank=parsed_text.get('bank'),
        buyer_CIF=parsed_text.get('buyer_CIF'),
        supplier_CIF=parsed_text.get('supplier_CIF')
    )
    db.session.add(invoice)
    db.session.commit()

@doctr_bp.route('/doctr', methods=['POST'])
def doctr():
    img = load_image()
    print(f"Image shape before batch dimension: {img.shape}")
    model = ocr_predictor(det_arch='db_resnet50', reco_arch='crnn_vgg16_bn', pretrained=True)
    
    img_batch = np.expand_dims(img, axis=0)
    print(f"Image shape after adding batch dimension: {img_batch.shape}")
    
    result = model(img_batch)
    print(f"Result: {result}")  # Print the result to inspect its structure
    
    # Extract text from result
    text = []
    for page in result.pages:
        for block in page.blocks:
            for line in block.lines:
                for word in line.words:
                    text.append(word.value)
                    
    text_str = ' '.join(text)  # Convert list of words to a single string
    
    parsed_text = parse_text(text_str)
    add_invoice(parsed_text)
    return jsonify({'text': text_str, 'parsed_text': parsed_text})
