from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from app.models import db, User
from app.preprocessing import preprocessing_bp
from app.tesseractOCR import tesseract_bp
from app.translate import translate_bp
import requests


app = Flask(__name__)

app.config.from_object(ApplicationConfig)
app.config.update(ENV='development')

db.init_app(app)

CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(preprocessing_bp)
app.register_blueprint(tesseract_bp)
app.register_blueprint(translate_bp)

app.config['SESSION_SQLALCHEMY'] = db

bcrypt = Bcrypt(app)
server_session = Session(app)

with app.app_context():
    db.create_all()
    print("Database tables created successfully")

@app.route("/hello")
def hello():
    return "Hello, World!"

@app.route("/@me")
def get_current_user():

    user_id = session.get("user_id")
    print(user_id)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


apiKey = "sec_0LSWqNmRjyNhtR0rwJx1elsFHZo5rbEW"  # Replace with your actual key

@app.route("/upload-file", methods=["POST"])
def upload_file():
    if 'file' in request.files:
        file = request.files['file']

        upload_url = 'https://api.chatpdf.com/v1/sources/add-file' 
        try:
            upload_response = requests.post(
                upload_url, 
                files={'file': file}, 
                headers={'x-api-key': apiKey}
            )
            upload_response.raise_for_status() 
            source_id = upload_response.json()['sourceId']
            return jsonify({"sourceId": source_id}), 200  # Return the sourceId
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"ChatPDF File Upload Error: {e}"}), 500
    else:
        return jsonify({"error": "No file provided"}), 400


@app.route("/send-message", methods=["POST"])
def send_message():
    if 'sourceId' in request.json and 'messages' in request.json:
        source_id = request.json['sourceId']
        messages = request.json['messages']

        message_url = 'https://api.chatpdf.com/v1/chats/message' 
        try:
            message_response = requests.post(
                message_url,
                json={'sourceId': source_id, 'messages': messages}, 
                headers={'x-api-key': apiKey}
            )
            message_response.raise_for_status()  
            chatpdf_response = message_response.json()  
            return jsonify(chatpdf_response), 200
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"ChatPDF Message Error: {e}"}), 500
    else:
        return jsonify({"error": "Invalid request"}), 400