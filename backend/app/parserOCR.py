import re

keywords = {
    'due_date': {
        'ro': ['data scadenței', 'termen de plată', 'scadență',],
        'en': ['due date', 'payment term', 'payment deadline'],
        'fr': ['date d\'échéance', 'délai de paiement', 'échéance'],
        'de': ['fälligkeitsdatum', 'zahlungsbedingungen'],
        'hu': ['esedékesség dátuma', 'fizetési határidő', 'esedékesség']
    },

    'invoice_number': {
        'ro': ['numărul facturii', 'nr factură', 'număr factură', 'nr. factură', 'nr. facturii', 'nr. facturii:'],
        'en': ['invoice number', 'invoice no', 'invoice nr', 'invoice nr.', 'invoice no.'],
        'fr': ['numéro de facture', 'facture no', 'facture nr', 'facture nr.', 'facture no.'],
        'de': ['rechnungsnummer', 'rechnung nr', 'rechnung nr.', 'rechnung no.'],
        'hu': ['számla száma', 'számla szám', 'számla szám:', 'számla szám:']
    },

    'total_price': {
        'ro': ['total', 'suma totală', 'total de plată'],
        'en': ['total', 'total amount', 'total to pay', 'total price'],
        'fr': ['total', 'montant total', 'total à payer'],
        'de': ['gesamt', 'gesamtbetrag', 'gesamtpreis'],
        'hu': ['teljes', 'teljes összeg', 'teljes fizetendő összeg']
    },

    'date_of_issue': {
        'ro': ['data facturii', 'data emiterii', 'data emiterii facturii'],
        'en': ['date of issue', 'date of invoice', 'invoice date'],
        'fr': ['date d\'émission', 'date de facturation', 'date de facture'],
        'de': ['ausstellungsdatum', 'rechnungsdatum'],
        'hu': ['kiállítás dátuma', 'számla dátuma']
    },

    'bank': {
        'ro': ['banca', 'bancă', 'banca beneficiarului', 'bancă beneficiarului', 'banca furnizorului', 'bancă furnizorului'],
        'en': ['bank', 'bank of the beneficiary', 'bank of the supplier'],
        'fr': ['banque', 'banque du bénéficiaire', 'banque du fournisseur'],
        'de': ['bank', 'bank des begünstigten', 'bank des lieferanten'],
        'hu': ['bank', 'a kedvezményezett bankja', 'a szállító bankja']
    },

    'IBAN': {
        'ro': ['IBAN', 'iban beneficiarului', 'iban furnizorului'],
        'en': ['IBAN', 'iban of the beneficiary', 'iban of the supplier'],
        'fr': ['IBAN', 'iban du bénéficiaire', 'iban du fournisseur'],
        'de': ['IBAN', 'iban des begünstigten', 'iban des lieferanten'],
        'hu': ['IBAN', 'a kedvezményezett IBAN-ja', 'a szállító IBAN-ja']
    },

    'buyer_CIF': {
        'ro': ['cif cumparator', 'cif cumpărător', 'cif client', 'cif client:'],
        'en': ['buyer cif', 'buyer tax code', 'buyer tax code:'],
        'fr': ['cif acheteur', 'cif acheteur:', 'cif client', 'cif client:'],
        'de': ['käufer cif', 'käufer cif:', 'käufer steuernummer', 'käufer steuernummer:'],
        'hu': ['vásárló cif', 'vásárló cif:', 'vásárló adószám', 'vásárló adószám:']
    },

    'supplier_CIF': {
        'ro': ['cif furnizor', 'cif furnizorului', 'cif furnizorului:', 'cif furnizor:'],
        'en': ['supplier cif', 'supplier tax code', 'supplier tax code:'],
        'fr': ['cif fournisseur', 'cif fournisseur:', 'cif fournisseur:', 'cif fournisseur:'],
        'de': ['lieferant cif', 'lieferant cif:', 'lieferant steuernummer', 'lieferant steuernummer:'],
        'hu': ['szállító cif', 'szállító cif:', 'szállító adószám', 'szállító adószám:']
    },

    'CIF': {
        'ro': ['cif', 'cod fiscal', 'cod fiscal:'],
        'en': ['cif', 'tax code', 'tax code:'],
        'fr': ['cif', 'code fiscal', 'code fiscal:'],
        'de': ['cif', 'steuernummer', 'steuernummer:'],
        'hu': ['cif', 'adószám', 'adószám:']
    },

    'Buyer': {
        'ro': ['cumparator', 'cumpărător', 'client', 'client:'],
        'en': ['buyer', 'buyer:', 'client', 'client:'],
        'fr': ['acheteur', 'acheteur:', 'client', 'client:'],
        'de': ['käufer', 'käufer:', 'kunde', 'kunde:'],
        'hu': ['vásárló', 'vásárló:', 'ügyfél', 'ügyfél:']
    },

    'Supplier': {
        'ro': ['furnizor', 'furnizor:', 'vanzator', 'vânzător', 'vanzator:', 'vânzător:'],
        'en': ['supplier', 'supplier:', 'seller', 'seller:'],
        'fr': ['fournisseur', 'fournisseur:', 'vendeur', 'vendeur:'],
        'de': ['lieferant', 'lieferant:', 'verkäufer', 'verkäufer:'],
        'hu': ['szállító', 'szállító:', 'eladó', 'eladó:']
    }
}

def get_invoice_number(lines):
    invoice_number = ''
    for i, line in enumerate(lines):
        if any(keyword in line.lower() for keyword in keywords['invoice_number']):
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
        if any(keyword in line.lower() for keyword in keywords['CIF']):
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
        if any(keyword in line.lower() for keyword in keywords['date_of_issue']):
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    return word
    return ''

def get_due_date(lines):
    date_pattern = get_date_pattern()
    for line in lines:
        if any(keyword in line.lower() for keyword in keywords['due_date']):
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    return word
    return ''

def get_total_price(lines):
    pattern = re.compile(r"\b\d+(?:[,\s]\d+)*\b")  
    for i, line in enumerate(lines):
        if any(keyword in line.lower() for keyword in keywords['total_price']):
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
        if any(keyword in line.lower() for keyword in keywords['bank']):
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
        if any(keyword in line.lower() for keyword in keywords['IBAN']):
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

# def extract_data_from_section(lines, section_title, key_phrase):
#     data = ''
#     for i, line in enumerate(lines):
#         if section_title in line.lower():  
#             for j in range(i, len(lines)):
#                 if key_phrase in lines[j].lower():  
#                     words = lines[j].split()
#                     for k in range(len(words)):
#                         if words[k].lower() == key_phrase:
#                             data = words[k + 1]
#                             break
#                     if data:
#                         break
#             if data:
#                 break
#     return data

def get_buyer_CIF(lines):
    CIF = ''
    keywords_list = keywords['Buyer']
    key_phrase_list = keywords['buyer_CIF']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isdigit():
                            CIF = word
                            break
                    if CIF:
                        break
                if CIF:
                    break
            if CIF:
                break
        if CIF:
            break
    return CIF

def get_supplier_CIF(lines):
    CIF = ''
    keywords_list = keywords['Supplier']
    key_phrase_list = keywords['supplier_CIF']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isdigit():
                            CIF = word
                            break
                    if CIF:
                        break
                if CIF:
                    break
            if CIF:
                break
        if CIF:
            break
    return CIF

# def get_buyer_CIF(lines):
#     keywords_list = keywords['Buyer']
#     key_phrase = keywords['buyer_CIF'][0]
#     for keyword in keywords_list:
#         section_title = keyword
#         return extract_data_from_section(lines, section_title, key_phrase)

# def get_supplier_CIF(lines):
#     keywords_list = keywords['Supplier']
#     key_phrase = keywords['supplier_CIF'][0]
#     for keyword in keywords_list:
#         section_title = keyword
#         return extract_data_from_section(lines, section_title, key_phrase)


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
    