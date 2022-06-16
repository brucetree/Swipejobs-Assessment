import acceptButton from "../Button/acceptButton";
import { shallow } from 'enzyme';
import React from "react";


describe('<acceptButton />', () => {

    it('it includes one button element', () => {
        const wrapper = shallow(<acceptButton />);
        expect(
            wrapper.find('button').length === 1
        )
    });

    it('it includes an button which can be clicked', () => {
        const onClick = jest.fn();
        shallow(<button className='accept' onClick={onClick}>I'll Take it</button>).simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('check tag name', () => {
        const content = 'I\'ll Take it';
        const wrapper = shallow(<button className='accept' >I'll Take it</button>);
        expect(wrapper.text()).toBe(content);
    });
});