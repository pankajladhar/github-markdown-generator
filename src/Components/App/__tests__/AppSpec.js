import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import Button from './../index';

describe('Button', ()=>{
    xit('renders correctly', ()=>{
        let tree = renderer.create(
            <Button  />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
