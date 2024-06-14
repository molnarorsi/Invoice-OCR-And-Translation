from flask import Blueprint, request, jsonify, session
from app.models import db, Invoice, User, Groups

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
            'supplier_CIF': invoice.supplier_CIF
        }
        invoice_data.append(invoice_dictionary)
    return invoice_data

@getInvoiceData_bp.route("/get-invoices")
def getInvoices():
    user_id = session.get("user_id")
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