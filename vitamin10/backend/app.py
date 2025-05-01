from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return 'Welcome to the Flask App!'


@app.route('/quote', methods=['GET'])
def get_quote():
    quotes = [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Life is what happens when you're busy making other plans.",
        "You only live once, but if you do it right, once is enough."
    ]
    return jsonify({'quote': random.choice(quotes)})

#if __name__ == '__main__':
#   app.run(debug=True, port=5001)
