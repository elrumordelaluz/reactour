import React from 'react';
import Arrow from '../src/components/Arrow.js';
import renderer from 'react-test-renderer';


const arrowDummyProps = {
  className: 'dummy-class',
  onClick: jest.fn(),
  disabled: false,
  inverted: false,
  label: 'dummy label',
};

test('Arrow component must have base methods', () => {
  const component = renderer.create(
    <Arrow
      className={arrowDummyProps.className}
      onClick={arrowDummyProps.onClick}
      disabled={arrowDummyProps.disabled}
      inverted={arrowDummyProps.inverted}
      label={arrowDummyProps.label}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.props.onClick).toBe(arrowDummyProps.onClick);

});
