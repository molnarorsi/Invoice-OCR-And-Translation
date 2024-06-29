from flask import Blueprint, jsonify, session
from app.models import db, Invoice
from sqlalchemy import func, desc, Float, cast

visualization_bp = Blueprint('visualization', __name__)

@visualization_bp.route("/invoice-count-over-time")
def get_invoice_count_over_time():
    user_id = session.get("user_id")
    # Group by date_of_issue and count the number of invoices for each date
    invoice_count = db.session.query(Invoice.date_of_issue, func.count(Invoice.id)).filter_by(user_id=user_id).group_by(Invoice.date_of_issue).all()

    # Convert the result into a dictionary
    result = {str(date): count for date, count in invoice_count}

    return jsonify(result)

@visualization_bp.route("/top-buyers-by-total-spend")
def get_top_buyers_by_total_spend():
    user_id = session.get("user_id")
    # Group by buyer_name and sum the total_price for each buyer
    buyer_spend = db.session.query(
    Invoice.buyer_name, 
    func.sum(cast(Invoice.total_price, Float))).filter_by(user_id=user_id).group_by(Invoice.buyer_name).order_by(desc(func.sum(cast(Invoice.total_price, Float)))).all()

    # Convert the result into a dictionary, ensuring that neither buyer_name nor total_spend is None
    result = {buyer: total_spend for buyer, total_spend in buyer_spend if buyer is not None and total_spend is not None}

    return jsonify(result)