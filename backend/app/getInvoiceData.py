from flask import Blueprint, request, jsonify
from app.models import db, Invoice

getInvoiceData_bp = Blueprint("getInvoiceData", __name__)

@getInvoiceData_bp.route("/get-invoice-data")
def get_invoice_data():
    return jsonify({'text': "Hello, World!"})