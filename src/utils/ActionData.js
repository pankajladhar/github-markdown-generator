import { execute, ensureHTTP } from './Helpers';

const ActionData = [
    {
        value: 'H1',
        title: 'Heading 1',
        handleClick: () => execute('formatBlock', '<H1>')
    },
    {
        value: 'H2',
        title: 'Heading 2',
        handleClick: () => execute('formatBlock', '<H2>')
    },
    {
        value: 'H3',
        title: 'Heading 3',
        handleClick: () => execute('formatBlock', '<H3>')
    },
    {
        value: 'B',
        title: 'Bold',
        handleClick: () => execute('bold')
    },
    {
        value: 'I',
        title: 'Italic',
        handleClick: () => execute('italic')
    },
    {
        value: 'UL',
        title: 'Unordered List',
        handleClick: () => execute('insertUnorderedList')
    },
    {

        value: 'OL',
        title: 'Ordered List',
        handleClick: () => execute('insertOrderedList')
    }
    // {
    //     value: 'P',
    //     title: 'Paragraph',
    //     handleClick: () => execute('formatBlock', '<P>')
    // }
]

export { ActionData }