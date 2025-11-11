from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory data storage (for simplicity)
expenses = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add', methods=['POST'])
def add_expense():
    data = request.get_json()
    description = data.get('description')
    amount = float(data.get('amount'))
    category = data.get('category')

    expenses.append({'description': description, 'amount': amount, 'category': category})
    return jsonify({'status': 'success', 'expenses': expenses, 'total': sum(e['amount'] for e in expenses)})

@app.route('/delete', methods=['POST'])
def delete_expense():
    data = request.get_json()
    description = data.get('description')

    global expenses
    expenses = [e for e in expenses if e['description'] != description]
    return jsonify({'status': 'deleted', 'expenses': expenses, 'total': sum(e['amount'] for e in expenses)})

@app.route('/clear', methods=['POST'])
def clear_expenses():
    global expenses
    expenses = []
    return jsonify({'status': 'cleared', 'expenses': [], 'total': 0})

if __name__ == '__main__':
    app.run(debug=True)
