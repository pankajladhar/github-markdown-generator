import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
const Helpers  = require('./../../../utils/Helpers');
const parser = require('./../../../utils/parser');
import App from './../index';

function createNodeMock(element) {
    if (element.type === 'div') {
      // This is your fake DOM node for <p>.
      // Feel free to add any stub methods, e.g. focus() or any
      // other methods necessary to prevent crashes in your components.
      return {
          focus: jest.fn(),
          addEventListener: jest.fn()
      };
    }
    // You can return any object from this method for any type of DOM component.
    // React will use it as a ref instead of a DOM node when snapshot testing.
    return null;
  }
  

describe('App', ()=>{
    it('renders correctly', ()=>{
        const options = {createNodeMock};
        let tree = renderer.create(
            <App  />, options
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('convertIntoMarkdown returns empty string', ()=>{
        let mocksanitizeHTMLString = jest.fn(()=>{
            return ""
        })
        const wrapper = mount(<App />);
        Helpers.sanitizeHTMLString = mocksanitizeHTMLString
        wrapper.instance().convertIntoMarkdown();
        expect(mocksanitizeHTMLString).toHaveBeenCalled();
        expect(wrapper.instance().state.btnDisabled).toEqual(true);
    });

    it('convertIntoMarkdown returns string', ()=>{
        let mocksanitizeHTMLString = jest.fn(()=>{
            return "Pankaj"
        })
        const wrapper = mount(<App />);
        Helpers.sanitizeHTMLString = mocksanitizeHTMLString
        wrapper.instance().convertIntoMarkdown();
        expect(mocksanitizeHTMLString).toHaveBeenCalled();
        expect(wrapper.instance().state.btnDisabled).toEqual(false);
    });

    it('convertIntoMarkdown throws error', ()=>{
        let mocksanitizeHTMLString = jest.fn(()=>{
            return "<h1>122</h2>";
        });
        let mockParse = jest.fn(()=>{throw 'ee'})
        const wrapper = mount(<App />);
        Helpers.sanitizeHTMLString = mocksanitizeHTMLString
        wrapper.instance().convertIntoMarkdown();
        expect(mocksanitizeHTMLString).toHaveBeenCalled();
        expect(wrapper.instance().state.showMessageBox).toEqual(true);
        expect(wrapper.instance().state.type).toEqual("error");
        expect(wrapper.instance().state.title).toContain("You have entered some text which is not supported");
    })

    it('onCopyClick returns false', ()=>{
        const wrapper = mount(<App />);
        document['execCommand'] = jest.fn(() => false);
        wrapper.instance().onCopyClick();
        expect(wrapper.instance().state.showMessageBox).toEqual(true);
        expect(wrapper.instance().state.type).toEqual("error");
        expect(wrapper.instance().state.title).toEqual("Oops, unable to copy");
        
    });

    it('onCopyClick returns true', ()=>{
        const wrapper = mount(<App />);
        document['execCommand'] = jest.fn(() => true);
        wrapper.instance().onCopyClick();
        expect(wrapper.instance().state.showMessageBox).toEqual(true);
        expect(wrapper.instance().state.type).toEqual("success");
        expect(wrapper.instance().state.title).toEqual("Copied Successfully");
    });

    it('onCopyClick throws exception', ()=>{
        const wrapper = mount(<App />);
        document['execCommand'] = jest.fn(() => {throw 'An error'});
        wrapper.instance().onCopyClick();
        expect(wrapper.instance().state.showMessageBox).toEqual(true);
        expect(wrapper.instance().state.type).toEqual("error");
        expect(wrapper.instance().state.title).toEqual("Oops, unable to copy");
    });

    it('handleMessageBoxClose', ()=>{
        const wrapper = mount(<App />);
        wrapper.instance().handleMessageBoxClose();
        expect(wrapper.instance().state.showMessageBox).toEqual(false);
    })

    it('onDownloadFileClick', ()=>{
        let mockDownloadAsFile = jest.fn()
        const wrapper = mount(<App />);
        Helpers.downloadAsFile = mockDownloadAsFile
        wrapper.instance().onDownloadFileClick();
        expect(mockDownloadAsFile).toHaveBeenCalled();
        
    })
});
