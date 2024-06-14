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

@groups_bp.route('/join-group', methods=['POST'])
def join_group():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    code = request.json.get('code')
    print(code)
    group = Groups.query.filter_by(code=code).first()
    if group:
        user = User.query.get(user_id)
        user.groups.append(group)
        db.session.commit()
        return jsonify({'message': 'Group joined successfully'}), 200
    else:
        return jsonify({'error': 'Group not found'}), 404
    
@groups_bp.route('/current-group', methods=['POST'])
def current_group():
    user_id = session.get("user_id")
    group_id = request.json['group_id']

    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.get(user_id)
    user.current_group = group_id

    return jsonify({'message': 'Current group set successfully'}), 200

@groups_bp.route('/deactivate-current-group', methods=['POST'])
def deactivate_current_group():
    user_id = session.get("user_id")
    group_id = request.json['group_id']

    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.get(user_id)
    user.current_group = None

    return jsonify({'message': 'Current group deactivated successfully'}), 200