import App from './App';
import { shallow } from 'enzyme';
import React from "react";

describe('<App />', () => {

  it('it includes five img element', () => {
    const wrapper = shallow(<App />);
    expect(
        wrapper.find('img').length === 5
    )
  });

  it('it includes a Reject element', () => {
    const wrapper = shallow(<App />);
    expect(
        wrapper.find('Reject').length === 1
    )
  });

  it('it includes a Accept element', () => {
    const wrapper = shallow(<App />);
    expect(
        wrapper.find('Accept').length === 1
    )
  });

  it('it includes an element which classname is header', () => {
    const wrapper = shallow(<App />);
    expect(
        wrapper.find('.header').length === 1
    )
  });

  it('it includes an element which classname is outLayer', () => {
    const wrapper = shallow(<App />);
    expect(
        wrapper.find('.outLayer').length === 1
    )
  });

  it('it includes an element which classname is innerLayer', () => {
    const wrapper = shallow(<App />);
    expect(
        wrapper.find('.innerLayer').length === 1
    )
  });

  it('check tag name', () => {
    const content = 'Distance';
    const wrapper = shallow(<div className='distanceTitle'>Distance</div>);
    expect(wrapper.text()).toBe(content);
  });

  it('check tag name', () => {
    const content = 'Hourly Rate';
    const wrapper = shallow(<div className='hourlyRateTitle'>Hourly Rate</div>);
    expect(wrapper.text()).toBe(content);
  });

});