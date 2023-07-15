from flask import Flask, request, jsonify
from flask_cors import CORS  # flask-corsをインポート
app = Flask(__name__)
CORS(app)  # CORSを許可
@app.route('/message', methods=['POST'])
def handle_message():
    message = request.get_json()
    print("Received message: ", message)
    return jsonify(message), 200
if __name__ == '__main__':
    app.run(port=5000)