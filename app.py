from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Mock database
users = {}
votes = {}
admin = {'username': 'admin', 'password': generate_password_hash('adminpass')}
candidates = ['Candidate 1', 'Candidate 2', 'Candidate 3', 'Candidate 4', 'Candidate 5']

# Register route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        eligibility = request.form['eligibility']  # Assume this is checked externally
        if eligibility.lower() == 'yes':
            users[username] = {
                'password': generate_password_hash(password),
                'has_voted': False
            }
            flash('Registration successful!')
            return redirect(url_for('login'))
        else:
            flash('You are not eligible to vote.')
            return redirect(url_for('register'))
    return render_template('register.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and check_password_hash(users[username]['password'], password):
            session['username'] = username
            if users[username]['has_voted']:
                flash('You have already voted.')
                return redirect(url_for('login'))
            return redirect(url_for('vote'))
        elif username == admin['username'] and check_password_hash(admin['password'], password):
            session['admin'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials.')
            return redirect(url_for('login'))
    return render_template('login.html')

# Voting route
@app.route('/vote', methods=['GET', 'POST'])
def vote():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        candidate = request.form['candidate']
        if session['username'] in votes:
            flash('You have already voted.')
            return redirect(url_for('vote'))
        votes[session['username']] = candidate
        users[session['username']]['has_voted'] = True
        flash('Vote successfully submitted!')
        return redirect(url_for('logout'))
    return render_template('vote.html', candidates=candidates)

# Admin Dashboard
@app.route('/admin_dashboard')
def admin_dashboard():
    if 'admin' not in session:
        return redirect(url_for('login'))
    return render_template('admin_dashboard.html', votes=votes, users=users)

# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
