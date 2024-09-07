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
