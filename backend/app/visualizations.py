from datetime import datetime, timedelta
from collections import defaultdict
from app.models import db, Invoice
from flask import Blueprint, request, jsonify, session

visualization_bp = Blueprint("visualization", __name__)

@visualization_bp.route('/invoice_count_over_time')
def invoice_count_over_time():
    # Initialize counters
    daily_count = defaultdict(int)
    weekly_count = defaultdict(int)
    monthly_count = defaultdict(int)
    quarterly_count = defaultdict(int)
    yearly_count = defaultdict(int)

    invoices = Invoice.query.all()

    # Count invoices by date
    for invoice in invoices:
        date = datetime.strptime(invoice.date_of_issue, '%Y-%m-%d')
        daily_count[date.date()] += 1
        weekly_count[date.strftime('%Y-%W')] += 1
        monthly_count[date.strftime('%Y-%m')] += 1
        quarterly_count[date.year, (date.month-1)//3 + 1] += 1
        yearly_count[date.year] += 1

    # Prepare response
    response = {
        "daily": dict(daily_count),
        "weekly": dict(weekly_count),
        "monthly": dict(monthly_count),
        "quarterly": dict(quarterly_count),
        "yearly": dict(yearly_count)
    }

    return jsonify(response)