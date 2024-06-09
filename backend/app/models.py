from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from enum import Enum
import string
import random
import secrets


db = SQLAlchemy()

def generate_code(length):
    code = string.ascii_lowercase + string.digits
    while True:
        code = ''.join(random.choices(code, k=length))
        if not Groups.query.filter_by(code=code).first():
            return code

def get_uuid():
    return uuid4().hex

class UserRoles(Enum):
    ADMIN = "admin"
    OWNER = "owner"
    USER = "user"

user_groups = db.Table('user_groups', db.metadata,
                       db.Column('user_id', db.String(32), db.ForeignKey('users.id')),
                          db.Column('group_id', db.String(32), db.ForeignKey('groups.id'))
                      )

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    invoices = db.relationship("Invoice", backref="user")
    role = db.Column(db.Enum(UserRoles), nullable=False, default=UserRoles.USER)
    groups = db.relationship("Groups", secondary=user_groups, backref=db.backref('users', lazy='dynamic'))

class PDFSource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source_id = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False) 
    

class Invoice(db.Model):
    __tablename__ = "invoices"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    invoice_number = db.Column(db.String(100))
    invoice_CIF = db.Column(db.String(100))
    date_of_issue = db.Column(db.String(100))
    due_date = db.Column(db.String(100))
    total_price = db.Column(db.String(100))
    IBAN = db.Column(db.String(100))
    bank = db.Column(db.String(100))
    buyer_CIF = db.Column(db.String(100))
    supplier_CIF = db.Column(db.String(100))

class Groups(db.Model):
    __tablename__ = "groups"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    info = db.Column(db.String(600))
    code = db.Column(db.String(6), default=lambda: generate_code(5), unique=True)