//Utility function

const elementDOM = identifier => document.querySelector(`${identifier}`);

//Calculator class

class Calculator {
  constructor() {
    this.computedNum = elementDOM('.display-large');
    this.total = elementDOM('.display-small');
  }

  displayNumber = number => {
    this.computedNum.textContent = this.getNumber(number);
  };

  getNumber = num => {
    if (num !== null) {
      const result = num.join('');
      return result;
    }
  };

  sliceNum = num => num.substr(0, num.length - 1);

  backSpace = () => {
    let stringNum = this.computedNum.textContent;
    let isArray = [...stringNum];
    if (isArray.length !== 0) {
      isArray.pop();
      this.displayNumber(isArray);
    } else {
      this.computedNum.textContent = '';
    }
  };

  performCalulation = set => {
    try {
      let number = checkMath(set);

      const result = parseFloat(eval(number)).toString();
      const displayAnswer = result.slice(0, 13);
      this.total.textContent = set.join('');
      this.computedNum.textContent = displayAnswer;
    } catch (err) {
      console.error('Syntax Error', err);
    }
  };
}

const calculator = new Calculator();

let set = [];
const numbers = document.querySelectorAll('.btn-key');
numbers.forEach(number => {
  number.addEventListener('click', () => {
    set.push(number.value);
    calculator.displayNumber(set);
  });
});

/* BACKSPACE */

elementDOM('.back-space').addEventListener('click', () => {
  calculator.backSpace();
  set.pop();
  elementDOM('.display-small').textContent = '';
});

/* CLEAR DISPLAY */

elementDOM('.clear').addEventListener('click', () => {
  set = [];
  elementDOM('.display-small').textContent = '';
  elementDOM('.display-large').textContent = '';
});

/* PErform Mathematical Calculation */

elementDOM('.total').addEventListener('click', () => {
  calculator.performCalulation(set);
  set = [elementDOM('.display-large').textContent];
});

elementDOM('.slide-btn-out').addEventListener('click', () => {
  elementDOM('.slide-panel').classList.add('slide-in');
  elementDOM('.slide-btn-in').classList.add('show');
  elementDOM('.slide-btn-out').classList.add('hide');
});

elementDOM('.slide-btn-in').addEventListener('click', () => {
  elementDOM('.slide-panel').classList.remove('slide-in');
  elementDOM('.slide-btn-in').classList.remove('show');
  elementDOM('.slide-btn-out').classList.remove('hide');
});

//Check for Special Mathematical function
function checkMath(set) {
  let number;

  let value = set.join('');

  if (
    value.includes('sin') ||
    value.includes('cos(') ||
    value.includes('tan(') ||
    value.includes('asin(') ||
    value.includes('acos(') ||
    value.includes('asin(') ||
    value.includes('exp(') ||
    value.includes('log(') ||
    value.includes('sqrt(') ||
    value.includes('PI')
  ) {
    number = 'Math.'.concat(value);
    return number;
  } else {
    number = value;
  }

  return number;
}
