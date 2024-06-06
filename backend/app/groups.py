from flask import Blueprint, request, jsonify, session
from app.models import db, User, Groups

groups_bp = Blueprint('groups', __name__)

@groups_bp.route('/create-groups', methods=['POST'])
def create_groups():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    name = request.json.get('name')
    info = request.json.get('info')
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'error': 'This user does not exist'}), 404
    group = Groups(name=name, info=info)
    group.users.append(user)

    db.session.add(group)
    db.session.commit()

    return jsonify({'message': 'Group created successfully'}), 201