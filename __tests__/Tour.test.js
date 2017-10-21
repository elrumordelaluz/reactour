import React from 'react';
import Tour from '../src/Tour';
import renderer from 'react-test-renderer';

const steps = [
  {
    selector: '[data-tour="my-first-step"]',
    content: ({ goTo, inDOM }) => (
      <div>
        Lorem ipsum <button onClick={() => goTo(4)}>Got to Step 5</button>
        <br />{ inDOM && '🎉 Look at your step!'}
      </div>
    ),
    position: 'top',
    action: node => {
      node.focus()
      console.log('yup, the target element is also focused!')
    },
    style: {
      backgroundColor: '#bada55',
    },
  }
];

const dummyClose = jest.fn();

test('Tour component', () => {
  const component = renderer.create(
    <div>
    <Tour
      steps={steps}
      isOpen={false}
    />
    </div>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
