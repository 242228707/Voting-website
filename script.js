
const users = [];

// Register Form Submission
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;
    const age = new Date().getFullYear() - new Date(dob).getFullYear();

    if (age >= 18) {
        users.push({ name, email, password });
        alert("Registration successful! Please log in.");
        document.getElementById("registration").style.display = 'none';
        document.getElementById("loginSection").style.display = 'block';
    } else {
        alert("You must be 18 or older to vote.");
    }
});

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful! Proceed to vote.");
        document.getElementById("loginSection").style.display = 'none';
        document.getElementById("votingSection").style.display = 'block';
    } else {
        alert("Invalid email or password.");
    }
});

// Voting Form Submission
document.getElementById("votingForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const candidate = document.getElementById("candidate").value;
    alert(`Your vote for ${candidate} has been recorded.`);
});
