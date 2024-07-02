# Import necessary modules for the application
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from app.models import db, User, PDFSource, UserRoles, Invoice
from app.preprocessing import preprocessing_bp
from app.tesseractOCR import tesseract_bp
from app.translate import translate_bp
from app.getInvoiceData import getInvoiceData_bp
from app.chatpdf import chatpdf_bp
from app.groups import groups_bp
from app.auth import auth_bp
from app.doctrOCR import doctr_bp
from app.visualization import visualization_bp
import requests

from flask_migrate import Migrate

# Create a new Flask web server instance
app = Flask(__name__)


# Load the configuration settings from the ApplicationConfig class
app.config.from_object(ApplicationConfig)
# Set the environment to development
app.config.update(ENV='development')

# Initialize the database with the Flask app instance
db.init_app(app)

# Initialize Flask-Migrate for handling database migrations
migrate = Migrate(app, db)

app.config['SESSION_SQLALCHEMY'] = db
# Set the CORS headers to 'Content-Type'
app.config['CORS_HEADERS'] = 'Content-Type'
# Initialize the CORS extension with the Flask app instance
CORS(app, supports_credentials=True)

# Register the blueprints with the Flask app instance
app.register_blueprint(preprocessing_bp)
app.register_blueprint(tesseract_bp)
app.register_blueprint(translate_bp)
app.register_blueprint(getInvoiceData_bp)
app.register_blueprint(chatpdf_bp)
app.register_blueprint(groups_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(doctr_bp)
app.register_blueprint(visualization_bp)

# Initialize the Flask Bcrypt extension with the Flask app instance
bcrypt = Bcrypt()


# Initialize the Flask Session extension with the Flask app instance
server_session = Session(app)

# Create the database tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully")

    admin = User.query.filter_by(email='admin@admin.com').first()
    if not admin:
        pwd = bcrypt.generate_password_hash('admin').decode('utf-8')
        admin = User(email='admin@admin.com', name='admin', password=pwd)
        admin.role = UserRoles.ADMIN
        db.session.add(admin)
        db.session.commit()

# Define the route for the root of the web server
@app.route("/hello")
def hello():
    return "Hello, World!"

# Define the route for the current user
@app.route("/@")
def get_current_user():

    user_id = session.get("user_id")
    print(user_id)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "name": user.name,
        "email": user.email,
        "role": user.role.value
    })

@app.route("/manage-users", methods=["POST"])
def manage_users():
    role = request.json.get("role")
    user_id = request.json.get("user_id")
    user = User.query.filter_by(id=user_id).first()

    if role not in UserRoles.__members__:
        return jsonify({"error": "Invalid role"}), 400

    user.role = UserRoles[role]
    db.session.commit()
    return jsonify({"message": "User role updated successfully"}), 200

@app.route("/update-users", methods=["POST"])
def update_users():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    name = request.json.get("name")
    email = request.json.get("email")

    user.name = name
    user.email = email
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

@app.route('/delete-invoice', methods=['DELETE'])
def delete_invoice():
    print(f"Request arguments: {request.args}")  # Debugging statement
    invoice_id = request.args.get('invoice_id', type=int)
    print(f"Received invoice ID: {invoice_id}")  # Debugging statement
    if invoice_id is None:  # Check if invoice_id is None
        return jsonify({"error": "Invalid invoice id"}), 400

    invoice = Invoice.query.get(invoice_id)
    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404

    db.session.delete(invoice)
    db.session.commit()

    return jsonify({"message": "Invoice deleted successfully"}), 200





@app.route('/modify-invoice-data', methods=['POST'])
def modify_invoice_data():
    new_data = request.json["new_data"]
    invoice_id = new_data["id"]

    if not invoice_id:
        return jsonify({"error": "Invalid invoice id"}), 400
    
    invoice = Invoice.query.get(invoice_id)

    if not invoice:
        return jsonify({"error": "Invoice not found"}), 404
    
    invoice.invoice_number = new_data["invoice_number"]
    invoice.invoice_CIF = new_data["invoice_CIF"]
    invoice.date_of_issue = new_data["date_of_issue"]
    invoice.due_date = new_data["due_date"]
    invoice.total_price = new_data["total_price"]
    invoice.IBAN = new_data["IBAN"]
    invoice.bank = new_data["bank"]
    invoice.buyer_CIF = new_data["buyer_CIF"]
    invoice.supplier_CIF = new_data["supplier_CIF"]
    invoice.buyer_name = new_data["buyer_name"]
    invoice.supplier_name = new_data["supplier_name"]
    invoice.buyer_address = new_data["buyer_address"]
    invoice.supplier_address = new_data["supplier_address"]
    invoice.buyer_city = new_data["buyer_city"]
    invoice.supplier_city = new_data["supplier_city"]
    invoice.buyer_TVA = new_data["buyer_TVA"]
    invoice.supplier_TVA = new_data["supplier_TVA"]

    db.session.commit()

    return jsonify({"message": "Invoice data updated successfully"}), 200