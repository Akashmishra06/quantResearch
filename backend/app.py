from flask import Flask, send_file, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/csv-data/chart', methods=['GET'])
def get_call_put_chart():
    csv_path = '/root/quantResearch/datad/callputChart.csv'
    if os.path.exists(csv_path):
        return send_file(csv_path, mimetype='text/csv')
    else:
        return jsonify({"error": "Chart CSV file not found."}), 404

@app.route('/api/csv-data/historical', methods=['GET'])
def get_historical_csv():
    date_str = request.args.get('date')
    symbol = request.args.get('symbol')

    if not date_str or not symbol:
        return jsonify({"error": "Missing date or symbol"}), 400

    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        csv_path = f'/root/quantResearch/data/{symbol}/{date_str}.csv'
        if os.path.exists(csv_path):
            return send_file(csv_path, mimetype='text/csv')
        else:
            return jsonify({"error": f"CSV file not found for {symbol} on {date_str}"}), 404
    except ValueError:
        return jsonify({"error": "Invalid date format"}), 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
