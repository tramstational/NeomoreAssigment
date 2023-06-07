import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Calculator from "@/components/Calculator.vue";

describe("Calculator", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Calculator);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the initial value", () => {
    const wrapper = shallowMount(Calculator);
    const display = wrapper.find(".calculator__display");
    expect(display.text()).toBe("0");
  });

  it("should calculate the result correctly", () => {
    const wrapper = mount(Calculator);

    // Set the initial values for calculation
    wrapper.setData({
      display: "10",
      calculatorData: {
        firstValue: "23",
        operator: "add",
        modValue: "",
        previousKeyType: "operator",
      },
    });

    // Call the calculate method
    const result = wrapper.vm.calculate(
      wrapper.vm.calculatorData.firstValue,
      wrapper.vm.calculatorData.operator,
      wrapper.vm.display
    );

    // Assert the result
    expect(result).toBe("33");

    // Set the initial values for calculation
    wrapper.setData({
      display: "1",
      calculatorData: {
        firstValue: "10",
        operator: "multiply",
        modValue: "1",
        previousKeyType: "calculate",
      },
    });

    // Call the calculate method
    const result2 = wrapper.vm.calculate(
      wrapper.vm.calculatorData.firstValue,
      wrapper.vm.calculatorData.operator,
      wrapper.vm.display
    );

    // Assert the result
    expect(result2).toBe("10");
  });

  it("should create the result string correctly for calculate key", () => {
    const wrapper = mount(Calculator);

    // Set the initial values
    wrapper.setData({
      display: "10",
      calculatorData: {
        firstValue: "5",
        operator: "add",
        modValue: "",
        previousKeyType: "operator",
      },
    });

    // Get the calculate key button element
    const calculateKey = wrapper.find('button[data-action="calculate"]');
    calculateKey.trigger("click");

    // Call the createResultString method
    const result = wrapper.vm.createResultString(
      calculateKey.element,
      wrapper.vm.display,
      wrapper.vm.calculatorData
    );

    // Assert the result
    expect(result).toBe("25");
  });

  it("should create the result string correctly for clear key", () => {
    const wrapper = mount(Calculator);

    // Set the initial values
    wrapper.setData({
      display: "10",
      calculatorData: {
        firstValue: "5",
        operator: "add",
        modValue: "",
        previousKeyType: "operator",
      },
    });

    // Get the clear key button element
    const clearKey = wrapper.find('button[data-action="clear"]');
    clearKey.trigger("click");

    // Call the createResultString method
    const result = wrapper.vm.createResultString(
      clearKey.element,
      wrapper.vm.display,
      wrapper.vm.calculatorData
    );

    // Assert the result
    expect(result).toBe("0");
  });
});
