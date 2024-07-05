# Invoice-OCR-And-Translation

## Demo video: https://screenrec.com/share/zr31iZeMyn

## About the application
Invoice OCR And Translation it's a web app that let's you extract data from invoices in 5 different languages(romanian, hungarian, english, deutsch and french) to structured data and also translate the extracted text in order to understand better what the invoice contains. It's mainly made for accountants that work with more businesesses. 

## Technologies:
1. React + Javascript for frontend
2. Flask + Python for backend
3. OpenCV for image preproccesing
4. Tesseract + DocTR for data recognition
5. PostgreSQL for storing data about invoices, users etc.
6. DeepL API for translating extracted text
7. ChatPDF API for chatting with bot about uploaded documents
8. Rechart + Chart.js for visualising data
9. Docker for running the app in containers
10. SQLAlchemy for ORM
11. Material UI for design
12. Axios for managing requests

## Main features
1. Login and Register
2. Upload a file in image or PDF format
3. Choose the preprocessing method(grayscale, binarization, noise reduction, skew correction)
4. Choose the OCR method (Tesseract, DocTR)
5. Translate extracted text for more accuracy
6. Edit, delete invoices
7. Search for invoices and filter data
8. Chat with a bot for more accuracy
9. View performance of OCR's
10. View some visualised data based on stored infromation in database
11. Join Businesses for better invoice organizing
