import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './../index';

describe('Button', ()=>{
    let buttonProps = {}
    beforeEach(()=>{
        buttonProps = {
            handleClick : ()=>{},
            title: "Button",
            value: "Button"
        }
    });
    
    it('renders correctly when only required props are provided', ()=>{
        let tree = renderer.create(
            <Button  {...buttonProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when only all props are provided', ()=>{
        buttonProps.className="sample";
        buttonProps.name="name";

        let tree = renderer.create(
            <Button  {...buttonProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call the provided click handler', ()=>{
        
        let mockHandleClick = jest.fn();
        
        buttonProps.className="sample";
        buttonProps.name="name";
        buttonProps.handleClick = mockHandleClick;
        
        const button = shallow(
            <Button {...buttonProps}/>
        );

        button.simulate('click');
        expect(mockHandleClick).toHaveBeenCalled();
    })
});
