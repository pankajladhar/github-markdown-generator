import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { ActionData } from './../../../utils/ActionData'
import ActionBar from './../index';
import Button from './../../Button';

describe('ActionBar', ()=>{
    it('renders correctly', ()=>{
        let tree = renderer.create(
            <ActionBar actions={ActionData} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render button equal to ActionData', ()=>{
        const actionBar = mount(
            <ActionBar actions={ActionData} />
        );
        expect(actionBar.find(Button).length).toEqual(ActionData.length);
    })
});
