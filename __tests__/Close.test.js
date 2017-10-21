import React from 'react';
import Close from '../src/components/Close.js';
import renderer from 'react-test-renderer';

const onClickDummie= jest.fn();
test('Close component must have base methods', () => {
  const component = renderer.create(
    <Close className="test-close" onClick={onClickDummie} ></Close>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.props.onClick).toBe(onClickDummie);  
  expect(tree.props.className).toContain("test-close");
  
});
