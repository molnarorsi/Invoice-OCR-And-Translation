from flask import Blueprint, request, jsonify, session
from app.models import db, PDFSource
import requests

chatpdf_bp = Blueprint('chatpdf', __name__)

apiKey = "sec_0LSWqNmRjyNhtR0rwJx1elsFHZo5rbEW"

@chatpdf_bp.route("/upload-file", methods=["POST"])
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

            # Get the user's ID from the session
            user_id = session.get("user_id")
            if not user_id:
                return jsonify({"error": "Unauthorized"}), 401

            # Create a new PDFSource instance
            pdf_source = PDFSource(source_id=source_id, user_id=user_id)
            # Add the new PDFSource to the database
            db.session.add(pdf_source)
            db.session.commit()

            return jsonify({"sourceId": source_id}), 200  # Return the sourceId
        except requests.exceptions.RequestException as e:
            return jsonify({"error": f"ChatPDF File Upload Error: {e}"}), 500
    else:
        return jsonify({"error": "No file provided"}), 400
    
@chatpdf_bp.route("/send-message", methods=["POST"])
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