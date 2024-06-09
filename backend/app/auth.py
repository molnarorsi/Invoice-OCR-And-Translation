from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt
from app.models import User, db, UserRoles

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    user_already_exists = User.query.filter_by(email=email).first() is not None

    if user_already_exists:
        return jsonify({'error': 'User already exists'}), 400
    
    hash_pwd = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name, email=email, password=hash_pwd)
    db.session.add(new_user)
    db.session.commit()

    session['user_id'] = new_user.id

    #return jsonify({'message': 'User created successfully'}), 201
    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email
    })

@auth_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid password'}), 400

    session['user_id'] = user.id

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    })

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out'}), 200