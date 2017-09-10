const execute = (command, value = null) => {
    document.execCommand(command, false, value)
};

const ensureHTTP = (str) =>{
    return  /^https?:\/\//.test(str) && str || `http://${str}`;
}

const sanitizeHTMLString = (htmlString) =>{
    return htmlString
            .replace(/<div><br><\/div>/g, ' ')
            .replace(/<br>/gi, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/<img src="(.*?)" alt="(.*?)">/, function(str){
                let alttext = /alt="(.*?)"/.exec(str)[1];

                return str.replace(/src/g, 'href')
                          .replace(/>/, '>'+alttext+'</img>')
                          .replace(/ alt="(.*?)"/, '')
            })
}

export { execute, ensureHTTP, sanitizeHTMLString }
