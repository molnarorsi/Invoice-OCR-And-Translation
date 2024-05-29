import deepl
from flask import Blueprint, jsonify, request
from app.parserOCR import parse_text

def translate_to_language(text, target_lang):
    translator = deepl.Translator("12090a2d-c9f7-420e-871c-5c23c435a6d1:fx") 
    try:
        result = translator.translate_text(text, target_lang=target_lang)
        return result.text
    except deepl.DeepLException as e:
        print(f"Translation error: {e}")
        return text  # Return original text in case of an error

    
translate_bp = Blueprint('translate', __name__)

@translate_bp.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    if 'text' in data and 'lang' in data:
        translated_text = translate_to_language(data['text'], data['lang'])
        return jsonify({"translatedText": translated_text}) 
    else:
        return jsonify({"error": "Missing 'text' or 'lang' field in request"})
    
@translate_bp.route('/parse-ocr', methods=['POST'])
def parse_ocr():
    data = request.get_json()
    if 'text' in data:
        parsed_text = parse_text(data['text'])
        print(parsed_text)
        return jsonify({"parsedText": parsed_text }) 
    else:
        return jsonify({"error": "Missing 'text' field in request"})