from datetime import datetime
from flask import Flask, jsonify, request
from pathlib import Path
import json

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / 'data.json'

app = Flask(__name__, static_folder='.', static_url_path='')

if not DATA_FILE.exists():
    DATA_FILE.write_text(json.dumps({'lastResponse': None, 'updated': None}, ensure_ascii=False, indent=2), encoding='utf-8')


def load_data():
    try:
        return json.loads(DATA_FILE.read_text(encoding='utf-8'))
    except (json.JSONDecodeError, FileNotFoundError):
        return {'lastResponse': None, 'updated': None}


def save_data(payload):
    content = {'lastResponse': payload, 'updated': datetime.utcnow().isoformat() + 'Z'}
    DATA_FILE.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding='utf-8')
    return content


@app.route('/')
@app.route('/index.html')
def index():
    return app.send_static_file('index.html')


@app.route('/admin.html')
def admin():
    return app.send_static_file('admin.html')


@app.route('/submit', methods=['POST'])
def submit():
    payload = request.get_json(silent=True)
    if not payload:
        return jsonify({'ok': False, 'error': 'JSON invalide'}), 400

    name = payload.get('name', '').strip()
    place = payload.get('place', '').strip()
    time = payload.get('time', '').strip()
    message = payload.get('message', '').strip()

    if not name or not place or not time:
        return jsonify({'ok': False, 'error': 'Données manquantes'}), 400

    save_data({'name': name, 'place': place, 'time': time, 'message': message})
    return jsonify({'ok': True})


@app.route('/response', methods=['GET'])
def response():
    return jsonify(load_data())


@app.route('/<path:path>')
def static_files(path):
    return app.send_static_file(path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
