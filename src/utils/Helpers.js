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

const downloadAsFile = (data, filename) =>{
    let blob = new Blob([data], {type: 'application/octet-stream'});
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement('a');
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

}

export { execute, ensureHTTP, sanitizeHTMLString, downloadAsFile }
