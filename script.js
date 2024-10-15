
let otpCode = "123456"; // Sample OTP for testing

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const dob = new Date(document.getElementById("dob").value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age >= 18) {
        alert("You are eligible to vote!");
        document.getElementById("otp-section").style.display = "block";
    } else {
        alert("You must be 18 or older to vote.");
    }
});

function verifyOTP() {
    const enteredOTP = document.getElementById("otp").value;
    
    if (enteredOTP === otpCode) {
        alert("OTP Verified. You can now vote.");
    } else {
        alert("Invalid OTP. Please try again.");
    }
}
    