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

    it('should not render text if icon props is provided', ()=>{
        buttonProps.icon = "fa-bold"
        let tree = renderer.create(
            <Button  {...buttonProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.props.value).toBeUndefined();
    })

    it('should call the provided click handler', ()=>{
        
        let mockHandleClick = jest.fn();
        
        buttonProps.className="sample";
        buttonProps.name="name";
        buttonProps.handleClick = mockHandleClick;
        
        let button = shallow(
            <Button {...buttonProps}/>
        );

        button.simulate('click');
        expect(mockHandleClick).toHaveBeenCalled();
    });

    it('should have disabled property if value disabled props is true ', ()=>{

        buttonProps.disabled=true;
        let tree = renderer.create(
            <Button  {...buttonProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.props.disabled).toBeTruthy();
    })
});
