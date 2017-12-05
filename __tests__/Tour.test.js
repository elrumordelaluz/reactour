import React from 'react';
import { shallow,configure } from 'enzyme';
import Tour from '../src/Tour.js';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const dummySteps = [
  {
    selector: '.dummy-class',
    content: 'dummy',
  }
]

const dummyTourProps = [
  {
    isOpen: true,
    onRequestClose: jest.fn(),
  }
]

test('It must create a tour component', () => {
  const component = shallow(
    <div>
      <Tour
        steps={dummySteps}
        isOpen={dummyTourProps.isOpen}
      />
    </div>
  );
  component.render();
  component.update();
  console.log(component.html());
  //expect(component).toEqual('Off');

  //expect(tree).toMatchSnapshot();

})