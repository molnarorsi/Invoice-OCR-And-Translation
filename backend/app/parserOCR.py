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
    },

    'name': {
        'ro': ['nume', 'nume:', 'denumire', 'denumire:'],
        'en': ['name', 'name:', 'company name', 'company name:'],
        'fr': ['nom', 'nom:', 'nom de la société', 'nom de la société:'],
        'de': ['name', 'name:', 'firmenname', 'firmenname:'],
        'hu': ['név', 'név:', 'cégnév', 'cégnév:']
    },

    'address': {
        'ro': ['adresa', 'adresa:', 'adresă', 'adresă:'],
        'en': ['address', 'address:', 'company address', 'company address:'],
        'fr': ['adresse', 'adresse:', 'adresse de la société', 'adresse de la société:'],
        'de': ['adresse', 'adresse:', 'firmenadresse', 'firmenadresse:'],
        'hu': ['cím', 'cím:', 'céges cím', 'céges cím:']
    },

    'city': {
        'ro': ['oras', 'oraș', 'oras:', 'oraș:'],
        'en': ['city', 'city:', 'company city', 'company city:'],
        'fr': ['ville', 'ville:', 'ville de la société', 'ville de la société:'],
        'de': ['stadt', 'stadt:', 'firmenstadt', 'firmenstadt:'],
        'hu': ['város', 'város:', 'céges város', 'céges város:']
    },

    'TVA': {
        'ro': ['tva', 'tva:', 'cod tva', 'cod tva:'],
        'en': ['vat', 'vat:', 'vat code', 'vat code:'],
        'fr': ['tva', 'tva:', 'code tva', 'code tva:'],
        'de': ['ust', 'ust:', 'ust code', 'ust code:'],
        'hu': ['áfa', 'áfa:', 'áfa kód', 'áfa kód:']
    },

    'VAT': {
        'ro': ['vat', 'vat:', 'vat code', 'vat code:'],
        'en': ['vat', 'vat:', 'vat code', 'vat code:'],
        'fr': ['vat', 'vat:', 'vat code', 'vat code:'],
        'de': ['vat', 'vat:', 'vat code', 'vat code:'],
        'hu': ['vat', 'vat:', 'vat code', 'vat code:']
    }
}


# Function to get the invoice number from the text
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

# Function to get the CIF from the text
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

# Function to get the date pattern
def get_date_pattern():
    return re.compile(r"\d{2}\.\d{2}\.\d{4}")

# Function to get the date of issue from the text
def get_date_of_issue(lines):
    date_pattern = get_date_pattern()
    for line in lines:
        if any(keyword in line.lower() for keyword in keywords['date_of_issue']):
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    return word
    return ''

# Function to get the due date from the text
def get_due_date(lines):
    date_pattern = get_date_pattern()
    for line in lines:
        if any(keyword in line.lower() for keyword in keywords['due_date']):
            words = line.split()
            for word in words:
                if date_pattern.match(word):
                    return word
    return ''

# Function to get the total price from the text
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

# Function to get the bank from the text
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

# Function to get the IBAN from the text
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

# Function to get the buyer CIF from the text
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


# Function to get the supplier CIF from the text
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

def get_buyer_name(lines):
    name = ''
    keywords_list = keywords['Buyer']
    key_phrase_list = keywords['name']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isalpha():
                            name = word
                            break
                    if name:
                        break
                if name:
                    break
            if name:
                break
        if name:
            break
    return name

def get_supplier_name(lines):
    name = ''
    keywords_list = keywords['Supplier']
    key_phrase_list = keywords['name']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isalpha():
                            name = word
                            break
                    if name:
                        break
                if name:
                    break
            if name:
                break
        if name:
            break
    return name

def get_buyer_address(lines):
    address = ''
    keywords_list = keywords['Buyer']
    key_phrase_list = keywords['address']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isalpha():
                            address = word
                            break
                    if address:
                        break
                if address:
                    break
            if address:
                break
        if address:
            break
    return address

def get_supplier_address(lines):
    address = ''
    keywords_list = keywords['Supplier']
    key_phrase_list = keywords['address']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isalpha():
                            address = word
                            break
                    if address:
                        break
                if address:
                    break
            if address:
                break
        if address:
            break
    return address

def get_buyer_city(lines):
    city = ''
    keywords_list = keywords['Buyer']
    key_phrase_list = keywords['city']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isalpha():
                            city = word
                            break
                    if city:
                        break
                if city:
                    break
            if city:
                break
        if city:
            break
    return city

def get_supplier_city(lines):
    city = ''
    keywords_list = keywords['Supplier']
    key_phrase_list = keywords['city']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isalpha():
                            city = word
                            break
                    if city:
                        break
                if city:
                    break
            if city:
                break
        if city:
            break
    return city

def get_buyer_TVA(lines):
    TVA = ''
    keywords_list = keywords['Buyer']
    key_phrase_list = keywords['TVA']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isdigit():
                            TVA = word
                            break
                    if TVA:
                        break
                if TVA:
                    break
            if TVA:
                break
        if TVA:
            break
    return TVA

def get_supplier_TVA(lines):
    TVA = ''
    keywords_list = keywords['Supplier']
    key_phrase_list = keywords['TVA']
    for keyword in keywords_list:
        for key_phrase in key_phrase_list:
            for i, line in enumerate(lines):
                if keyword in line.lower() and key_phrase in line.lower():
                    words = lines[i].split()
                    for word in words:
                        if word.isdigit():
                            TVA = word
                            break
                    if TVA:
                        break
                if TVA:
                    break
            if TVA:
                break
        if TVA:
            break
    return TVA

    


# Function to parse the text
def parse_text(text):
    lines = text.split('\n')
    invoice_data = {}

    # List of functions to parse the data
    parsing_data = [
        get_invoice_number,
        get_invoice_CIF,
        get_date_of_issue,
        get_due_date,
        get_total_price,
        get_IBAN,
        get_bank,
        get_buyer_CIF,
        get_supplier_CIF,
        get_buyer_name,
        get_supplier_name,
        get_buyer_address,
        get_supplier_address,
        get_buyer_city,
        get_supplier_city,
        get_buyer_TVA,
        get_supplier_TVA
        
    ]
    # Parse the data
    for func in parsing_data:
        field_name = func.__name__.replace('get_', '')
        invoice_data[field_name] = func(lines)

    return invoice_data
    