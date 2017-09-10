import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextField from './../index';

describe('TextField', ()=>{
    let textFieldProps ={}

    beforeEach(()=>{
        textFieldProps = {
            type: "text",
            handleChange: ()=>{}
        }
    });

    it('renders correctly when only required props are provided', ()=>{
        let tree = renderer.create(
            <TextField  {...textFieldProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when all props are provided', ()=>{
        textFieldProps.name = "textfield";
        textFieldProps.placeholder = "This is placeholder text";
        textFieldProps.className = "sample";

        let tree = renderer.create(
            <TextField  {...textFieldProps}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call the provided change handler', ()=>{
        
        let mockHandleChange = jest.fn();
        
        textFieldProps.handleChange = mockHandleChange;
        
        const textField = shallow(
            <TextField {...textFieldProps}/>
        );

        textField.simulate('change');
        expect(mockHandleChange).toHaveBeenCalled();
    })

});
