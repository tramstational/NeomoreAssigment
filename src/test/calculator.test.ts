import { shallowMount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue';

describe('Calculator', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Calculator);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the initial value', () => {
    const wrapper = shallowMount(Calculator);
    const display = wrapper.find('.calculator__display');
    expect(display.text()).toBe('0');
  });
});