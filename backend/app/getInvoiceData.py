from flask import Blueprint, request, jsonify
from app.models import db, Invoice

getInvoiceData_bp = Blueprint("getInvoiceData", __name__)

@getInvoiceData_bp.route("/get-invoice-data")
def get_invoice_data():
    invoices = Invoice.query.all()
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
    return jsonify({'text': "Hello, World!"})