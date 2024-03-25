import re

def get_invoice_number(lines):
    invoice_number =''
    for line in lines:
        if 'factură' in line.lower() or 'nr' in line.lower() or 'ordine' in line.lower():
            words = line.split()
            for word in words:
                if word in words:
                    if word.isdigit():
                        invoice_number = word
                        break
                    if invoice_number:
                        break
    return invoice_number

def get_variable_symbol(lines):
    var_symbol =''
    for line in lines:
        if 'simbol' in line.lower() and 'variabil' in line.lower():
            words = line.split()
            for word in words:
                if word.isdigit():
                    var_symbol = word
                    break
                if var_symbol:
                    break
    return var_symbol

def get_invoice_id(lines):
    invoice_id = ''
    for line in lines:
        if 'ID' in line.lower() and  'factură' in line.lower():
            words = line.split()
            for word in words:
                if word.isdigit():
                    invoice_id = word
                    break
                if invoice_id:
                    break
    return invoice_id

def get_date_of_issue(lines):
    date_of_issue = ''
    date_pattern = re.compile(r"\d{2}\.\d{2}\.\d{4}")
    for line in lines:
        if 'data' in line.lower() and 'emiterii' in line.lower():
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    date_of_issue = word
                    break
            if date_of_issue:
                break
    return date_of_issue

def get_due_date(lines):
    due_date = ''
    date_pattern = re.compile(r"\d{2}\.\d{2}\.\d{4}")
    for line in lines:
        if 'termen' in line.lower() and 'de' in line.lower() and 'plată' in line.lower():
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    due_date = word
                    break
            if due_date:
                break
    return due_date

def get_delivery_date(lines):
    delivery_date = ''
    date_pattern = re.compile(r"\d{2}\.\d{2}\.\d{4}")
    for line in lines:
        if 'data' in line.lower() and 'facturii' in line.lower():
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    delivery_date = word
                    break
            if delivery_date:
                break
    return delivery_date

def get_payment_method(lines):
    payment_method = ''
    for line in lines:
        if 'metoda' in line.lower() and 'plății:' in line.lower():
            words = line.split()
            for i, word in enumerate(words):
                if word.lower() == 'plății:':
                    payment_method = words[i + 1]
                    break
                if payment_method:
                    break
    return payment_method

def get_total_price(lines):
    total_price = ''
    pattern = re.compile(r"\b\d+(?:[,\s]\d+)*\b")
    for line in lines:
        if 'total' in line.lower() or 'suma' in line.lower():
            words = line.split()
            for word in words:
                if pattern.match(word):
                    total_price = word
                    break
            if total_price:
                break
    return total_price

def get_bank(lines):
    bank = ''
    for line in lines:
        if 'banca' in line.lower():
            words = line.split()
            for i, word in enumerate(words):
                if word.lower() == 'banca:':
                    bank = words[i + 1]
                    break
            if bank:
                break
    return bank

def get_swift(lines):
    swift = ''
    for line in lines:
        if 'swift' in line.lower():
            words = line.split()
            for i, word in enumerate(words):
                if word.lower() == 'swift:':
                    swift = words[i + 1]
                    break
            if swift:
                break
    return swift

def get_iban(lines):
    iban = ''
    for line in lines:
        if 'iban' in line.lower():
            words = line.split()
            for i, word in enumerate(words):
                if word.lower() == 'iban:':
                    iban = words[i + 1]
                    break
            if iban:
                break
    return iban

def get_buyer_cif(lines):
    cif = ''
    for i, line in enumerate(lines):
        if 'cif' in line.lower() and 'cumpărător' in line.lower():
            words = line.split()
            for j, word in enumerate(words):
                if word.lower() =='cif:':
                    cif = words[j + 1]
                    del words[j + 1]
                    del words[j]
                    lines[i] = ' '.join(words) 
                    break
            if cif:
                break
    return cif

def get_supplier_cif(lines):
    cif = ''
    for i, line in enumerate(lines):
        if 'cif' in line.lower() and 'vânzător' in line.lower():
            words = line.split()
            for j, word in enumerate(words):
                if word.lower() =='cif:':
                    cif = words[j + 1]
                    del words[j + 1]
                    del words[j]
                    lines[i] = ' '.join(words) 
                    break
            if cif:
                break
    return cif

def parse_text(text):
    lines = text.split('\n')

    data = {
        'invoice_number': get_invoice_number(lines),
        'var_symbol': get_variable_symbol(lines),
        'invoice_id': get_invoice_id(lines),
        'date_of_issue': get_date_of_issue(lines),
        'due_date': get_due_date(lines),
        'delivery_date': get_delivery_date(lines),
        'payment_method': get_payment_method(lines),
        'total_price': get_total_price(lines),
        'bank': get_bank(lines),
        'swift': get_swift(lines),
        'iban': get_iban(lines),
        'buyer_cif': get_buyer_cif(lines),
        'supplier_cif': get_supplier_cif(lines)
    }

    return data