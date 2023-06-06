
<script lang="ts">
export default {
  data() {
    return {
      display: ''
    }
  },
  methods: {
    appendToDisplay(value: string) {
      this.display += value
    },

    clearDisplay() {
      this.display = ''
    },

    calculateResult() {
      try {
        this.display = eval(this.display);
      } catch (error) {
        this.display = 'Error';
      }
    }


  }
}
</script>

<template>
  <html>

  <head>
    <title>Vue Calculator</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>

  <body>
    <div class="container">
      <div class="calculator">
        <div class="calculator__display">{{ display }}</div>

        <div class="calculator__keys">
          <button @click="appendToDisplay('+')" class=" key--operator" data-action="add">+</button>
          <button @click="appendToDisplay('-')" class=" key--operator" data-action="subtract">-</button>
          <button @click="appendToDisplay('*')" class=" key--operator" data-action="multiply">&times;</button>
          <button @click="appendToDisplay('/')" class=" key--operator" data-action="divide">÷</button>
          <button @click="appendToDisplay('7')">7</button>
          <button @click="appendToDisplay('8')">8</button>
          <button @click="appendToDisplay('9')">9</button>
          <button @click="appendToDisplay('4')">4</button>
          <button @click="appendToDisplay('5')">5</button>
          <button @click="appendToDisplay('6')">6</button>
          <button @click="appendToDisplay('1')">1</button>
          <button @click="appendToDisplay('2')">2</button>
          <button @click="appendToDisplay('3')">3</button>
          <button @click="appendToDisplay('0')">0</button>
          <button data-action="decimal">.</button>
          <button @click="clearDisplay" data-action="clear">AC</button>
          <button @click="calculateResult()" class="key--equal" data-action="calculate">=</button>
        </div>
      </div>
    </div>
  </body>

  </html>
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

