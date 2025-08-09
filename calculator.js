const display = document.getElementById('display');

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function appendToDisplay(value) {
  const current = display.innerText;
  const lastChar = current.slice(-1);

  if (current === 'Error') {
    display.innerText = '0';
    return;
  }

  // Prevent multiple operators in a row
  if (isOperator(value)) {
    if (isOperator(lastChar) || current === '0') {
      return;
    }
  }

  // Prevent multiple decimals in the same number
  if (value === '.') {
    const parts = current.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes('.')) return;
  }

  // Replace initial 0
  if (current === '0' && value !== '.') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function backspace() {
  if (display.innerText.length <= 1 || display.innerText === 'Error') {
    display.innerText = '0';
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function clearDisplay() {
  display.innerText = '0';
}

function calculateResult() {
  try {
    const result = eval(display.innerText);
    display.innerText = result;
  } catch (error) {
    display.innerText = 'Error';
  }
}
