import declineButton from "../Button/declineButton";
import { shallow } from 'enzyme';
import React from "react";


describe('<declineButton />', () => {

    it('it includes one button element', () => {
        const wrapper = shallow(<declineButton />);
        expect(
            wrapper.find('button').length === 1
        )
    });

    it('it includes an button which can be clicked', () => {
        const onClick = jest.fn();
        shallow(<button className='deny' onClick={onClick}>No Thanks</button>).simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('check tag name', () => {
        const content = 'No Thanks';
        const wrapper = shallow( <button className='deny' >No Thanks</button>);
        expect(wrapper.text()).toBe(content);
    });
});