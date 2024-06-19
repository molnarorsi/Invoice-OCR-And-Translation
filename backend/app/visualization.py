from flask import Blueprint, jsonify
from app.models import db, Invoice
from sqlalchemy import func

visualization_bp = Blueprint('visualization', __name__)

@visualization_bp.route("/invoice-count-over-time")
def get_invoice_count_over_time():
    # Group by date_of_issue and count the number of invoices for each date
    invoice_count = db.session.query(Invoice.date_of_issue, func.count(Invoice.id)).group_by(Invoice.date_of_issue).all()

    # Convert the result into a dictionary
    result = {str(date): count for date, count in invoice_count}

    return jsonify(result)