import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MessageBox from './../index';

describe('MessageBox', ()=>{

    let messageBoxProps = {};

    beforeEach(()=>{
        messageBoxProps = {
            title: "This is message Box",
            type: "success",
            showMessageBox: true,
            autoClosingTimeInterval:1000,
            closeBtnProps: {
                title: "close",
                value: "x",
                handleClick: () =>{}
            }
        }
    })

    it('should not render when value of showMessageBox is not provided or false ', ()=>{
        messageBoxProps.showMessageBox = false;
        let tree = renderer.create(
            <MessageBox {...messageBoxProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when value of showMessageBox is true', ()=>{
        let tree = renderer.create(
            <MessageBox {...messageBoxProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.props.className.indexOf("success")).toBeGreaterThan(0)
    });

    it('should have class error when type props is error', ()=>{
        messageBoxProps.type = "error";
        let tree = renderer.create(
            <MessageBox {...messageBoxProps} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.props.className.indexOf("error")).toBeGreaterThan(0)
    });

    it("should gets close automatically", ()=>{
        jest.useFakeTimers();
        let mockHandleClick = jest.fn();

        messageBoxProps.closeBtnProps.handleClick = mockHandleClick;
        
        expect(mockHandleClick).not.toBeCalled();
        
        const spy = jest.spyOn(MessageBox.prototype, 'componentDidMount');
        const wrapper = mount(<MessageBox {...messageBoxProps} />);
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
        expect(setTimeout.mock.calls[0][1]).toBe(1000);
        
        jest.runAllTimers();
        expect(mockHandleClick).toBeCalled();
    })
});
