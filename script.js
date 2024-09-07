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
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.content = 'width=device-width, initial-scale=1';
      setTimeout(function() {
        viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
      }, 300);
    }
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

// Add event listeners for plus and minus buttons
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.querySelector('.minus').addEventListener('touchend', debounce(function(e) {
  e.preventDefault();
  this.parentNode.querySelector('input[type=number]').stepDown();
}, 100));

document.querySelector('.plus').addEventListener('touchend', debounce(function(e) {
  e.preventDefault();
  this.parentNode.querySelector('input[type=number]').stepUp();
}, 100));
