from flask import Blueprint, request, jsonify, session
import numpy as np
import cv2
import pytesseract
from app.parserOCR import parse_text
from app.models import db, Invoice, User
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

tesseract_bp = Blueprint('tesseract', __name__)

def load_image():
    file = request.files['file'].read()
    npimg = np.fromstring(file, np.uint8)
    img = cv2.imdecode(npimg,cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img , cv2.COLOR_BGR2RGB)
    return img


def add_invoice(parsed_text, text, file_pdf):
    user_id = session.get('user_id')
    user = User.query.get(user_id)
    current_gr_id = user.current_group_id
    invoice = Invoice(
        user_id=session.get('user_id'),
        group_id=None,
        invoice_number=parsed_text.get('invoice_number'),
        invoice_CIF=parsed_text.get('invoice_CIF'),
        date_of_issue=parsed_text.get('date_of_issue'),
        due_date=parsed_text.get('due_date'),
        total_price=parsed_text.get('total_price'),
        IBAN=parsed_text.get('IBAN'),
        bank=parsed_text.get('bank'),
        buyer_CIF=parsed_text.get('buyer_CIF'),
        supplier_CIF=parsed_text.get('supplier_CIF'),
        text=text,
        file_pdf=file_pdf
        )

    if current_gr_id:
        invoice.group_id = current_gr_id

    db.session.add(invoice)
    db.session.commit()
    logger.info(f"Added invoice: {invoice}")

@tesseract_bp.route('/tesseract', methods=['POST'])
def tesseract():
    img = load_image()
    text = pytesseract.image_to_string(img, lang='ron+eng+deu+fra+hun')
    parsed_text = parse_text(text)
    file_pdf = request.files['pdf'].read()
    add_invoice(parsed_text, text, file_pdf)
    return jsonify({'text': text, 'parsed_text': parsed_text})
