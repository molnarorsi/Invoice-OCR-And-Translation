from flask import request, session
from app.models import db, Invoice, User
import numpy as np
import cv2
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def load_image():
    file = request.files['file'].read()
    npimg = np.fromstring(file, np.uint8)
    img = cv2.imdecode(npimg,cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img , cv2.COLOR_BGR2RGB)
    return img


def add_invoice(parsed_text, text, file_pdf, img_file, avg_score, rec_time, parse_time, ocr_method):
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
        avg_score=avg_score,
        rec_time=rec_time,
        parse_time=parse_time,
        ocr_method=ocr_method
        )

    if current_gr_id:
        invoice.group_id = current_gr_id

    if file_pdf:
        invoice.file_pdf = file_pdf

    if img_file:
        invoice.file_image = img_file

    db.session.add(invoice)
    db.session.merge(invoice)
    try:
        db.session.commit()
    except Exception as e:
        logger.error(f"Failed to commit invoice to database: {e}")
    db.session.refresh(invoice)
    logger.info(f"Added invoice: {invoice}")
    
    return invoice.id