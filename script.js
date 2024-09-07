// Function to generate password
function generatePassword() {
  var useSpecialCharacters = document.getElementById('special-characters').checked;
  var useNumbers = document.getElementById('numbers').checked;
  var passwordLength = document.getElementById('length').value;

  var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var specialChars = '!@#$%^&*()_+{}[]|:;<>,.?';
  var numbers = '0123456789';

  var passwordOptions = characters;
  if (useSpecialCharacters) passwordOptions += specialChars;
  if (useNumbers) passwordOptions += numbers;

  var password = '';
  for (var i = 0; i < passwordLength; i++) {
    var randomIndex = Math.floor(Math.random() * passwordOptions.length);
    password += passwordOptions[randomIndex];
  }

  document.getElementById('password').value = password;
}

// Function to copy password to clipboard
function copyPassword() {
  var passwordInput = document.getElementById('password');
  passwordInput.select();
  document.execCommand('copy');
}

// Event listener for generate button
document.getElementById('generate-btn').addEventListener('click', generatePassword);

// Function to reset viewport
function resetViewport() {
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    window.scrollTo(0, 0);
  }
}

// Add event listeners to input fields
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('blur', resetViewport);
});

// Function to handle password length change
function handleLengthChange(event) {
  const input = event.target;
  const value = parseInt(input.value);
  if (value < 4) input.value = 4;
  if (value > 20) input.value = 20;
}

// Add event listener to password length input
document.getElementById('length').addEventListener('change', handleLengthChange);
