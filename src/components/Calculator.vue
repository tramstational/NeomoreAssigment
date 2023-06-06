<script>
export default {
  data() {
    return {
      display: '0',
      calculatorData: {
        firstValue: '',
        operator: '',
        modValue: '',
        previousKeyType: '',
      },
      keys: [
        { content: '+', action: 'add' },
        { content: '-', action: 'subtract' },
        { content: '×', action: 'multiply' },
        { content: '÷', action: 'divide' },
        { content: '7', action: 'number' },
        { content: '8', action: 'number' },
        { content: '9', action: 'number' },
        { content: '4', action: 'number' },
        { content: '5', action: 'number' },
        { content: '6', action: 'number' },
        { content: '1', action: 'number' },
        { content: '2', action: 'number' },
        { content: '3', action: 'number' },
        { content: '0', action: 'number' },
        { content: '.', action: 'decimal' },
        { content: 'C', action: 'clear' },
        { content: '=', action: 'calculate' },
      ],
    };
  },
  methods: {
    handleClick(event) {
      const key = event.target;
      const displayedNum = this.display;
      const resultString = this.createResultString(key, displayedNum, this.calculatorData);

      this.display = resultString;
      this.updateCalculatorState(key, resultString, displayedNum);
      this.updateVisualState(key);
    },

    calculate(n1, operator, n2) {
      const firstNum = parseFloat(n1);
      const secondNum = parseFloat(n2);
      if (operator === 'add') return firstNum + secondNum;
      if (operator === 'subtract') return firstNum - secondNum;
      if (operator === 'multiply') return firstNum * secondNum;
      if (operator === 'divide') return firstNum / secondNum;
    },

    getKeyType(key) {
      const { action } = key.dataset;
      if (!action) return 'number';
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) return 'operator';
      // For everything else, return the action
      return action;
    },

    createResultString(key, displayedNum, state) {
      const keyContent = key.textContent;
      const keyType = this.getKeyType(key);
      const {
        firstValue,
        operator,
        modValue,
        previousKeyType,
      } = state;

      if (keyType === 'number') {
        return displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
          ? keyContent
          : displayedNum + keyContent;
      }

      if (keyType === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.';
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
        return displayedNum;
      }

      if (keyType === 'operator') {
        return firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? this.calculate(firstValue, operator, displayedNum)
          : displayedNum;
      }

      if (keyType === 'clear') return '0';

      if (keyType === 'calculate') {
        return firstValue
          ? previousKeyType === 'calculate'
            ? this.calculate(displayedNum, operator, modValue)
            : this.calculate(firstValue, operator, displayedNum)
          : displayedNum;
      }
    },

    updateCalculatorState(key, calculatedValue, displayedNum) {
      const keyType = this.getKeyType(key);
      const {
        firstValue,
        operator,
        modValue,
        previousKeyType,
      } = this.calculatorData;

      this.calculatorData.previousKeyType = keyType;

      if (keyType === 'operator') {
        this.calculatorData.operator = key.dataset.action;
        this.calculatorData.firstValue = firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
          ? calculatedValue
          : displayedNum;
      }

      if (keyType === 'calculate') {
        this.calculatorData.modValue = firstValue && previousKeyType === 'calculate'
          ? modValue
          : displayedNum;
      }

      if (keyType === 'clear' && key.textContent === 'AC') {
        this.calculatorData.firstValue = '';
        this.calculatorData.modValue = '';
        this.calculatorData.operator = '';
        this.calculatorData.previousKeyType = '';
      }
    },

    updateVisualState(key) {
      const keyType = this.getKeyType(key);
      const keys = Array.from(key.parentNode.children);
      keys.forEach(k => k.classList.remove('is-depressed'));

      if (keyType === 'operator') key.classList.add('is-depressed');
      if (keyType === 'clear' && key.textContent !== 'C') key.textContent = 'C';
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="calculator">
      <div class="calculator__display">{{ display }}</div>
      <div class="calculator__keys" @click="handleClick">
        <button v-for="key in keys" :key="key.content" :data-action="key.action"
          :class="{ 'key--equal': key.action === 'calculate' }">{{ key.content }} </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
input,
textarea,
button {
  border: 0;
  border-radius: 0;
  background-color: transparent;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  outline: none;
  appearance: none;
  text-align: left;
}

.calculator {
  border-radius: 12px;
  box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.15);
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
  max-width: 15em;
  overflow: hidden;
}

.calculator__display {
  background-color: #222222;
  color: #fff;
  padding: 0.5em 0.75em;
  text-align: right;
}

.calculator__keys {
  background-color: #999;
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(4, 1fr);
}

.calculator__keys>* {
  background-color: #fff;
  padding: 0.5em 1.25em;
  position: relative;
  text-align: center;
}

.calculator__keys>*:active::before,
.calculator__keys>.is-depressed::before {
  background-color: rgba(0, 0, 0, 0.2);
  bottom: 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5) inset;
  content: "";
  left: 0;
  opacity: 0.3;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.key--operator {
  background-color: #eee;
}

.key--equal {
  background-image: linear-gradient(to bottom, #fe886a, #ff7033);
  grid-column: -2;
  grid-row: 2 / span 4;
}
</style>
