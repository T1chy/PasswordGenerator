function generatePronounceablePassword(syllables = 4) {
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";
  let password = "";

  for (let i = 0; i < syllables; i++) {
    let c1 = consonants[Math.floor(Math.random() * consonants.length)];
    let v = vowels[Math.floor(Math.random() * vowels.length)];
    let c2 = consonants[Math.floor(Math.random() * consonants.length)];
    password += c1 + v + c2 + " ";
  }

  return password.trim();
}

function generatePassword() {
  var useSpecialCharacters = document.getElementById('special-characters').checked;
  var useNumbers = document.getElementById('numbers').checked;
  var passwordLength = parseInt(document.getElementById('length').value);
  var usePronounceable = document.getElementById('pronounceable').checked;

  if (usePronounceable) {
    var syllables = Math.floor(passwordLength / 3);
    var pronPassword = generatePronounceablePassword(syllables);
    document.getElementById('password').value = pronPassword;
    return;
  }

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

function copyPassword() {
  var passwordInput = document.getElementById('password');
  var copyButton = document.getElementById('copy-btn');

  passwordInput.select();
  document.execCommand('copy');

  copyButton.textContent = 'Copied!';
  copyButton.classList.add('active');

  setTimeout(function() {
    copyButton.textContent = 'Copy Password';
    copyButton.classList.remove('active');
  }, 2000);
}

document.getElementById('generate-btn').addEventListener('click', generatePassword);

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

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('blur', resetViewport);
});

function handleLengthChange(event) {
  const input = event.target;
  const value = parseInt(input.value);
  if (value < 4) input.value = 4;
  if (value > 20) input.value = 20;
}

document.getElementById('length').addEventListener('change', handleLengthChange);

function handleStepChange(input, step) {
  const currentValue = parseInt(input.value, 10);
  const newValue = currentValue + step;
  input.value = Math.max(4, Math.min(20, newValue));
  input.dispatchEvent(new Event('change'));
}

const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const lengthInput = document.getElementById('length');

minusButton.addEventListener('click', function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, -1);
});

plusButton.addEventListener('click', function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, 1);
});

minusButton.addEventListener('touchend', debounce(function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, -1);
}, 100));

plusButton.addEventListener('touchend', debounce(function(e) {
  e.preventDefault();
  handleStepChange(lengthInput, 1);
}, 100));

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Disable other options when pronounceable is checked
document.getElementById('pronounceable').addEventListener('change', function() {
  const disabled = this.checked;
  document.getElementById('special-characters').disabled = disabled;
  document.getElementById('numbers').disabled = disabled;
});
