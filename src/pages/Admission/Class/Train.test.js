import React from 'react';
import { shallow } from 'enzyme';
import Train from './Train';

// it('renders train props', () => {
//   // 使用包装后的组件

//   const wrapper = shallow(<Train.WrappedComponent />);
//   expect(wrapper.find('[icon="plus"]')).to.have.lengthOf(1);
// });

// it('renders two <Button /> components', () => {
//   // const wrapper = shallow(<Train />);

//   // expect(wrapper.find('Button').length).toBe(2);
// });

it('renders welcome message', () => {
  const wrapper = shallow(<Train />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});
