document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('Simulating successful login...');
  // Redirect to the home page (index.html) after successful login
  window.location.href = 'index.html';
});
// You would add signup form handling here as well
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
console.log('Simulating signup...');
});