import re

def get_invoice_number(lines):
    invoice_number = ''
    for i, line in enumerate(lines):
        if 'numărul facturii' in line.lower() or 'nr factură' in line.lower():
            words = lines[i].split()
            for word in words:
                if word.isdigit():
                    invoice_number = word
                    break
            if invoice_number:
                break
            if i < len(lines) - 1:
                words = lines[i + 1].split()
                for word in words:
                    if word.isdigit():
                        invoice_number = word
                        break
            if invoice_number:
                break
    return invoice_number


def get_invoice_CIF(lines):
    CIF = ''
    for i, line in enumerate(lines):
        if 'CIF' in line.lower():
            words = lines[i].split()
            for word in words:
                if word.isdigit():
                    CIF = word
                    break
            if CIF:
                break
            if i < len(lines) - 1:
                words = lines[i + 1].split()
                for word in words:
                    if word.isdigit():
                        CIF = word
                        break
            if CIF:
                break
    return CIF

def get_date_pattern():
    return re.compile(r"\d{2}\.\d{2}\.\d{4}")

def get_date_of_issue(lines):
    date_pattern = get_date_pattern()
    for line in lines:
        if 'data facturii' in line.lower() or 'data emiterii' in line.lower():
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    return word
    return ''

def get_due_date(lines):
    date_pattern = get_date_pattern()
    for line in lines:
        if 'data scadenței' in line.lower() or 'termen de plată' in line.lower():
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    return word
    return ''

def get_total_price(lines):
    pattern = re.compile(r"\b\d+(?:[,\s]\d+)*\b")  
    for i, line in enumerate(lines):
        if 'total' in line.lower(): 
            words = lines[i].split()
            for word in words:
                if pattern.match(word):
                    return word 
            # Check the next line if needed
            if i < len(lines) - 1: 
                words = lines[i + 1].split()
                for word in words:
                    if pattern.match(word):
                        return word 
    return '' 

def get_bank(lines):
    bank = ''
    for i, line in enumerate(lines):
        if 'banca' in line.lower() or 'bancă' in line.lower():
            words = lines[i].split()
            for word in words:
                if word.isdigit():
                    bank = word
                    break
            if bank:
                break
            if i < len(lines) - 1:
                words = lines[i + 1].split()
                for word in words:
                    if word.isdigit():
                        bank = word
                        break
            if bank:
                break
    return bank

def get_IBAN(lines):
    IBAN = ''
    for i, line in enumerate(lines):
        if 'IBAN' in line.lower():
            words = lines[i].split()
            for word in words:
                if word.isdigit():
                    IBAN = word
                    break
            if IBAN:
                break
            if i < len(lines) - 1:
                words = lines[i + 1].split()
                for word in words:
                    if word.isdigit():
                        IBAN = word
                        break
            if IBAN:
                break
    return IBAN

def extract_data_from_section(lines, section_title, key_phrase):
    data = ''
    for i, line in enumerate(lines):
        if section_title in line.lower():  
            for j in range(i, len(lines)):
                if key_phrase in lines[j].lower():  
                    words = lines[j].split()
                    for k in range(len(words)):
                        if words[k].lower() == key_phrase:
                            data = words[k + 1]
                            break
                    if data:
                        break
            if data:
                break
    return data

def get_buyer_CIF(lines):
    return extract_data_from_section(lines, 'cumparator', 'cif cumparator')

def get_supplier_CIF(lines):
    return extract_data_from_section(lines, 'furznior', 'cif furnizor')


def parse_text(text):
    lines = text.split('\n')
    invoice_data = {}

    parsing_data = [
        get_invoice_number,
        get_invoice_CIF,
        get_date_of_issue,
        get_due_date,
        get_total_price,
        get_IBAN,
        get_bank,
        get_buyer_CIF,
        get_supplier_CIF
    ]

    for func in parsing_data:
        field_name = func.__name__.replace('get_', '')
        invoice_data[field_name] = func(lines)

    return invoice_data
    
