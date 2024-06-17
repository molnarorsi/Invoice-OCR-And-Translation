from flask import Blueprint, request, jsonify, session
import pytesseract
from app.parserOCR import parse_text
from app.addInvoiceToDB import add_invoice, load_image
import time


tesseract_bp = Blueprint('tesseract', __name__)

@tesseract_bp.route('/tesseract', methods=['POST'])
def tesseract():
    img = load_image()

    start_time_rec = time.time()

    data = pytesseract.image_to_data(img, lang='ron+eng+deu+fra+hun', output_type='dict')

    rec_time = time.time() - start_time_rec

    text = ''
    total_conf = 0
    nr_conf_words = 0
    nr_words = len(data['text'])
    for i in range(nr_words):
        if int(data['conf'][i]) > 0:
            text += data['text'][i] + " "
            total_conf += int(data['conf'][i])
            nr_conf_words += 1

            print(int(data['conf'][i]))
    if nr_conf_words > 0:
        avg_score = total_conf / nr_conf_words
    else:
        avg_score = 0

    start_time_parse = time.time()

    parsed_text = parse_text(text)

    parse_time = time.time() - start_time_parse

    file_pdf = None
    file_image = None
    if request.files.get('pdf'):
        file_pdf = request.files['pdf'].read()
    if request.files.get('image'):
        file_image = request.files['image'].read()
        
    invoice_id = add_invoice(parsed_text, text, file_pdf, file_image, avg_score, rec_time, parse_time)
    return jsonify({'invoice_id': invoice_id, 'text': text, 'parsed_text': parsed_text, 'time': {'recognition': rec_time, 'parsing': parse_time}, 'avg_score': avg_score})


