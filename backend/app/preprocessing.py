from flask import Blueprint, request, jsonify
from PIL import Image
import io
import numpy as np
import base64
import cv2

preprocessing_bp = Blueprint('preprocessing', __name__)
# Load the image from the request
def load_image_from_request():
    file_content = request.files['file'].read()
    np_img = np.fromstring(file_content, np.uint8)
    decoded_img = cv2.imdecode(np_img,cv2.IMREAD_COLOR)
    rgb_img = cv2.cvtColor(decoded_img , cv2.COLOR_BGR2RGB)

    return rgb_img

# Convert the image to base64
def convert_to_base64(image):
    img = Image.fromarray(image.astype("uint8"))
    raw_bytes = io.BytesIO()
    img.save(raw_bytes, "JPEG")
    raw_bytes.seek(0)
    img_base64 = base64.b64encode(raw_bytes.read())
    return str(img_base64)

# Grayscale the image
@preprocessing_bp.route('/grayscale', methods=['POST'])
def grayscale():
    img = load_image_from_request()
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    return jsonify({'image': convert_to_base64(gray), 'filename': request.files['file'].filename})


# Binarize the image
@preprocessing_bp.route('/binarization', methods=['POST'])
def binarization():
    img = load_image_from_request()
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    thresh = cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
    return jsonify({'image': convert_to_base64(thresh), 'filename': request.files['file'].filename})

# Noise reduction
@preprocessing_bp.route('/noise_reduction', methods=['POST'])
def noise_reduction():
    img = load_image_from_request()
    img = cv2.bilateralFilter(img,9,75,75)
    return jsonify({'image': convert_to_base64(img), 'filename': request.files['file'].filename})
    
# Skew correction
@preprocessing_bp.route('/skew_correction', methods=['POST'])
def correct_image_skew():
    image = load_image_from_request()
    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    binary_image = cv2.threshold(grayscale_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    non_zero_pixels = np.column_stack(np.where(binary_image > 0))
    rotation_angle = cv2.minAreaRect(non_zero_pixels)[-1]
    rotation_angle = -(90 + rotation_angle) if rotation_angle < -45 else -rotation_angle
    image_height, image_width = image.shape[:2]
    image_center = (image_width // 2, image_height // 2)
    rotation_matrix = cv2.getRotationMatrix2D(image_center, rotation_angle, 1.0)
    corrected_image = cv2.warpAffine(image, rotation_matrix, (image_width, image_height), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

    return jsonify({'image': convert_to_base64(corrected_image), 'filename': request.files['file'].filename})