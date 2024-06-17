from flask import Blueprint, request, jsonify, session
from app.models import db, Invoice, User, Groups
import base64
import logging
logger = logging.getLogger(__name__)

getInvoiceData_bp = Blueprint("getInvoiceData", __name__)

def invoice(invoices):
    invoice_data = []
    for invoice in invoices:
        invoice_dictionary = {
            'invoice_number': invoice.invoice_number,
            'invoice_CIF': invoice.invoice_CIF,
            'date_of_issue': invoice.date_of_issue,
            'due_date': invoice.due_date,
            'total_price': invoice.total_price,
            'IBAN': invoice.IBAN,
            'bank': invoice.bank,
            'buyer_CIF': invoice.buyer_CIF,
            'supplier_CIF': invoice.supplier_CIF,
            'invoice_text': invoice.text
        }

        if invoice.file_pdf:
            file_pdf = invoice.file_pdf
            encoded_pdf = base64.b64encode(file_pdf).decode()
            invoice_dictionary['file_pdf'] = encoded_pdf

        if invoice.file_image:
            img_file = invoice.file_image
            encoded_img = base64.b64encode(img_file).decode()
            invoice_dictionary['file_image'] = encoded_img

        invoice_data.append(invoice_dictionary)
    return invoice_data

@getInvoiceData_bp.route("/get-invoices")
def getInvoices():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({'error': 'User not logged in'}), 401

    invoices = Invoice.query.filter_by(user_id=user_id).all()
    invoice_data = invoice(invoices)
    return jsonify({'invoices': invoice_data})

@getInvoiceData_bp.route("/get-group")
def getGroups():
    user_id = session.get("user_id")
    user = User.query.get(user_id)
    group_data = [{'id': group.id, 'name': group.name, 'info': group.info, 'invite_code': group.code} for group in user.groups]
    
    current_group_id = user.current_group_id
    current_group = None
    if current_group_id:
        current_group = [group for group in group_data if group['id'] == current_group_id][0]

    return jsonify({'groups': group_data, 'current_group': current_group})

@getInvoiceData_bp.route('/get-users')
def getUsers():
    users = User.query.all()
    user_data = [{'id': user.id, 'username': user.name, 'email': user.email, 'role': user.role.value} for user in users]
    return jsonify({'users': user_data})

@getInvoiceData_bp.route('/get-group-invoices', methods=['POST'])
def getGroupInvoices():
    group_id = request.json['group_id']
    invoices = Invoice.query.filter_by(group_id=group_id).all()
    invoice_data = invoice(invoices)
    return jsonify({'invoices': invoice_data})

@getInvoiceData_bp.route('/save-time-other', methods=['POST'])
def saveTimeOther():
    invoice_id = request.json['invoice_id']
    time_other = request.json['time_other']

    invoice = Invoice.query.get(invoice_id)
    invoice.other_time = time_other

    return jsonify({'success': True})

@getInvoiceData_bp.route('/get-performance-data', methods=['POST'])
def getPerformanceData():
    invoice_id = request.json['invoice_id']
    logger.info(f'FETCHING INVOICE WITH ID: {invoice_id}')

    invoice = Invoice.query.get(invoice_id)

    if invoice is None:
        logger.warning(f'No invoice found with ID: {invoice_id}')
    else:
        logger.info(f'Fetched invoice: {invoice}')
        logger.info(f'avg_score: {invoice.avg_score}, rec_time: {invoice.rec_time}, parse_time: {invoice.parse_time}, other_time: {invoice.other_time}')
    
    avg_score = invoice.avg_score
    rec_time = invoice.rec_time
    parse_time = invoice.parse_time
    other_time = invoice.other_time if invoice.other_time is not None else 0

    return jsonify({'avg_score': avg_score, 'rec_time': rec_time, 'parse_time': parse_time, 'other_time': other_time})