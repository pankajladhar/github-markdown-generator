import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import App from './../index';

describe('Button', ()=>{
    xit('renders correctly', ()=>{
        let tree = renderer.create(
            <App  />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
