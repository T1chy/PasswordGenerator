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
  var copyButton = document.getElementById('copy-btn');
  
  passwordInput.select();
  document.execCommand('copy');
  
  // Add visual feedback
  copyButton.textContent = 'Copied!';
  copyButton.classList.add('active');
  
  // Reset button after 2 seconds
  setTimeout(function() {
    copyButton.textContent = 'Copy Password';
    copyButton.classList.remove('active');
  }, 2000);
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

// Function to handle increment/decrement
function handleStepChange(input, step) {
  const currentValue = parseInt(input.value, 10);
  const newValue = currentValue + step;
  input.value = Math.max(4, Math.min(20, newValue)); // Ensure value is between 4 and 20
  input.dispatchEvent(new Event('change')); // Trigger change event
}

// Add event listeners for plus and minus buttons
const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const lengthInput = document.getElementById('length');

// For desktop (click events)
minusButton.addEventListener('click', function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, -1);
});

plusButton.addEventListener('click', function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, 1);
});

// For mobile (touch events with debounce)
minusButton.addEventListener('touchend', debounce(function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, -1);
}, 100));

plusButton.addEventListener('touchend', debounce(function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, 1);
}, 100));
