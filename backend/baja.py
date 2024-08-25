from flask import Flask, request, jsonify, Response
from collections import OrderedDict
import json
from urllib.parse import quote as url_quote
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
# Replace with your details
FULL_NAME = "Bharat P"
DOB = "09012004"
EMAIL = "Bharatpandiyan007@gmail.com"
ROLL_NUMBER = "21BCE1802"

@app.route('/bfhl', methods=['POST'])
def bfhl_post():
    try:
        data = request.json.get("data", [])
        
        if not isinstance(data, list):
            return jsonify({"is_success": False, "message": "Invalid input format"}), 400

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lowercase_alphabets = [char for char in alphabets if char.islower()]

        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else ""

        response_json = f'''{{
            "is_success": true,
            "user_id": "{FULL_NAME}_{DOB}",
            "email": "{EMAIL}",
            "roll_number": "{ROLL_NUMBER}",
            "numbers": {json.dumps(numbers)},
            "alphabets": {json.dumps(alphabets)},
            "highest_lowercase_alphabet": {json.dumps([highest_lowercase_alphabet] if highest_lowercase_alphabet else [])}
        }}'''

        return Response(response_json, status=200, mimetype='application/json')

    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

@app.route('/bfhl', methods=['GET'])
def bfhl_get():
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
