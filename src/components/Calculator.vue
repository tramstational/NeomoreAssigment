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

<script lang="ts">
import { defineComponent } from 'vue';

enum KeyType {
  Add = 'add',
  Subtract = 'subtract',
  Multiply = 'multiply',
  Divide = 'divide',
  Decimal = 'decimal',
  Clear = 'clear',
  Calculate = 'calculate',
  Number = 'number',
  Operator = 'operator'
}

export default defineComponent({
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
        { content: '+', action: KeyType.Add },
        { content: '-', action: KeyType.Subtract },
        { content: '×', action: KeyType.Multiply },
        { content: '÷', action: KeyType.Divide },
        { content: '7', action: KeyType.Number },
        { content: '8', action: KeyType.Number },
        { content: '9', action: KeyType.Number },
        { content: '4', action: KeyType.Number },
        { content: '5', action: KeyType.Number },
        { content: '6', action: KeyType.Number },
        { content: '1', action: KeyType.Number },
        { content: '2', action: KeyType.Number },
        { content: '3', action: KeyType.Number },
        { content: '0', action: KeyType.Number },
        { content: '.', action: KeyType.Decimal },
        { content: 'C', action: KeyType.Clear },
        { content: '=', action: KeyType.Calculate },
      ],
    };
  },
  methods: {
    handleClick(event: MouseEvent) {
      const key = event.target as HTMLButtonElement;
      if (!key) {
        return;
      } else {
        const displayedNum = this.display;
        const resultString = this.createResultString(key, displayedNum, this.calculatorData);

        this.display = resultString;
        this.updateCalculatorState(key, resultString, displayedNum);
      }
    },

    calculate(n1: string, operator: string, n2: string) {
      const firstNum = parseFloat(n1);
      const secondNum = parseFloat(n2);
      if (operator === KeyType.Add) return firstNum + secondNum;
      if (operator === KeyType.Subtract) return firstNum - secondNum;
      if (operator === KeyType.Multiply) return firstNum * secondNum;
      if (operator === KeyType.Divide) return firstNum / secondNum;
    },

    getKeyType(key: HTMLElement) {
      const action = key.dataset.action;
      if (!action) return KeyType.Number;
      if (
        action === KeyType.Add ||
        action === KeyType.Subtract ||
        action === KeyType.Multiply ||
        action === KeyType.Divide
      ) return KeyType.Operator;
      // For everything else, return the action
      return action;
    },

    createResultString(
      key: HTMLElement,
      displayedNum: string,
      state: {
        firstValue: string;
        operator: string;
        modValue: string;
        previousKeyType: string;
      }
    ) {
      const keyContent = key.textContent as string;
      const keyType = this.getKeyType(key);
      const {
        firstValue,
        operator,
        modValue,
        previousKeyType,
      } = state;

      if (keyType === KeyType.Number) {
        return displayedNum === '0' ||
          previousKeyType === KeyType.Operator ||
          previousKeyType === KeyType.Calculate
          ? keyContent
          : displayedNum + keyContent;
      }

      if (keyType === KeyType.Decimal) {
        if (!displayedNum.includes('.')) return displayedNum + '.';
        if (previousKeyType === KeyType.Operator || previousKeyType === KeyType.Calculate) return '0.';
        return displayedNum;
      }

      if (keyType === KeyType.Operator) {
        return firstValue &&
          operator &&
          previousKeyType !== KeyType.Operator &&
          previousKeyType !== KeyType.Calculate
          ? this.calculate(firstValue, operator, displayedNum)
          : displayedNum;
      }

      if (keyType === KeyType.Clear) return '0';

      if (keyType === KeyType.Calculate) {
        return firstValue
          ? previousKeyType === KeyType.Calculate
            ? this.calculate(displayedNum, operator, modValue)
            : this.calculate(firstValue, operator, displayedNum)
          : displayedNum;
      }
    },

    updateCalculatorState(
      key: { dataset: { action: string }; textContent: string },
      calculatedValue: string,
      displayedNum: string
    ) {
      const keyType = this.getKeyType(key);
      const {
        firstValue,
        operator,
        modValue,
        previousKeyType,
      } = this.calculatorData;

      this.calculatorData.previousKeyType = keyType;

      if (keyType === KeyType.Operator) {
        this.calculatorData.operator = key.dataset.action;
        this.calculatorData.firstValue =
          firstValue &&
            operator &&
            previousKeyType !== KeyType.Operator &&
            previousKeyType !== KeyType.Calculate
            ? calculatedValue
            : displayedNum;
      }

      if (keyType === KeyType.Calculate) {
        this.calculatorData.modValue =
          firstValue && previousKeyType === KeyType.Calculate ? modValue : displayedNum;
      }

      if (keyType === KeyType.Clear && key.textContent === 'C') {
        this.calculatorData.firstValue = '';
        this.calculatorData.modValue = '';
        this.calculatorData.operator = '';
        this.calculatorData.previousKeyType = '';
      }
    }
  },
});
</script>

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
