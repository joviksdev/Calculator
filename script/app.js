const elementDOM = identifier => document.querySelector(`${identifier}`);

class Calculator {
  constructor() {
    this.computedNum = elementDOM('.display-large');
    this.total = elementDOM('.display-small');
  }

  addNumber = () => {
    console.log('Sum');
  };

  displayNumber = number => {
    this.computedNum.textContent = this.getNumber(number);
  };

  getNumber = num => {
    if (num !== null) {
      const result = num
        .map(value => {
          return value;
        })
        .join('');
      return result;
    }
  };

  sliceNum = num => num.substr(0, num.length - 1);

  clearAll = () => {
    let stringNum = this.computedNum.textContent;
    let isArray = [...stringNum];
    let result = isArray.slice(isArray.length);
    this.displayNumber(result);
  };

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
    let value = set.join('');
    const result = parseFloat(eval(value));
    this.total.textContent = value;
    const convertToString = result.toString();
    const displayAnswer = convertToString.slice(0, 4);
    this.computedNum.textContent = parseFloat(displayAnswer);
  };
}

const calculator = new Calculator();

let set = [];
const numbers = document.querySelectorAll('.btn-key');
numbers.forEach(number => {
  number.addEventListener('click', () => {
    set.push(number.value);
    calculator.getNumber(set);
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
  calculator.clearAll();
  set = [];
  elementDOM('.display-small').textContent = '';
});

elementDOM('.total').addEventListener('click', () => {
  calculator.performCalulation(set);
  set = [elementDOM('.display-large').textContent];
});
