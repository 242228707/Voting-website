
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registration successful! Please log in to vote.');
    document.getElementById('registrationForm').reset();
    document.getElementById('loginSection').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login successful! You can now vote.');
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('voteSection').style.display = 'block';
});

document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const candidate = document.getElementById('candidate').value;
    if (candidate) {
        alert(`You voted for ${candidate}`);
    } else {
        alert('Please select a candidate.');
    }
});
