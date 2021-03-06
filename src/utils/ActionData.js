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
        value: 'hr',
        title: 'Horizontal Line',
        handleClick: () => execute('insertHorizontalRule')
    },
    {
        value: 'B',
        title: 'Bold',
        icon:'fa-bold',
        handleClick: () => execute('bold')
    },
    {
        value: 'I',
        title: 'Italic',
        icon:'fa-italic',
        handleClick: () => execute('italic')
    },
    {
        value: 'UL',
        title: 'Unordered List',
        icon:'fa-list-ul',
        handleClick: () => execute('insertUnorderedList')
    },
    {

        value: 'OL',
        title: 'Ordered List',
        icon:'fa-list-ol',
        handleClick: () => execute('insertOrderedList')
    },
    {
        value: 'T',
        title: 'Paragraph',
        handleClick: () => execute('insertHTML', '<table><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>')
    }
]

export { ActionData }