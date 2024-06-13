# Import necessary modules for the application
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from app.models import db, User, PDFSource, UserRoles
from app.preprocessing import preprocessing_bp
from app.tesseractOCR import tesseract_bp
from app.translate import translate_bp
from app.getInvoiceData import getInvoiceData_bp
from app.chatpdf import chatpdf_bp
from app.groups import groups_bp
from app.auth import auth_bp
from app.doctrOCR import doctr_bp
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
@app.route("/@me")
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