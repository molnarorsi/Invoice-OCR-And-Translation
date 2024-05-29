from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4


db = SQLAlchemy()


def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)

class PDFSource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source_id = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False) 
    

class Invoice(db.Model):
    __tablename__ = "invoices"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    invoice_number = db.Column(db.String(100))
    cif = db.Column(db.String(100))
    date_of_issue = db.Column(db.String(100))
    due_date = db.Column(db.String(100))
    total_price = db.Column(db.String(100))
    IBAN = db.Column(db.String(100))
    bank = db.Column(db.String(100))
    buyer_CIF = db.Column(db.String(100))
    supplier_CIF = db.Column(db.String(100))
    