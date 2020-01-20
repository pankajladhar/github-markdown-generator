'use strict';

/**
 * html-to-markdown
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

var headingRegex = /<h(\d*)>([\s\S]*?)<\/h\d*>/gim
var pRegex = /<p>([\s\S]*?)<\/p>/gim
var ulRegex = /<ul>([\s\S]*?)<\/ul>/gim
var olRegex = /<ol>([\s\S]*?)<\/ol>/gim
var liRegex = /<li>([\s\S]*?)<\/li>/gim
var preRegex = /<pre>([\s\S]*?)<\/pre>/gim
var blockQuoteRegex = /<blockquote>([\s\S]*?)<\/blockquote>/gim
var boldRegex = /<(?:b|strong)>([\s\S]*?)<\/\w*>/gim
var italicRegex = /<(?:i|em)>([\s\S]*?)<\/\w*>/gim
var hrRegex = /<hr[\s\S]*?>/gim

function makeRegex(regex, doc, before, after, replaceFn, addNewLine=true) {
  var matches = [];
  var newDoc = doc;
  var replaceString;
  while (matches = regex.exec(doc)) {
    if (matches && matches[1]) {
      replaceString = before || '';
      var replaceText = matches[1].trim()
      if (replaceFn && typeof (replaceFn) === 'function') {
        replaceText = replaceFn(matches)
      }
      replaceString +=  addNewLine ? replaceText + "\n" : replaceText;
      replaceString += after || '';
      newDoc = newDoc.replace(matches[0], replaceString);
    }
    else {
      newDoc = newDoc.replace(matches[0], before)
    }
  }
  return newDoc
}


function replaceHR(doc) {
  return makeRegex(hrRegex, doc, '***', null);
}

function replaceHeading(doc) {
  return makeRegex(headingRegex, doc, null, null, function (match) {
    return addHashes(match[1]) + match[2]
  });
}

function replaceUl(doc) {
  return makeRegex(ulRegex, doc, null, null, function (match) {
    return replaceLi(match[1], 'ul')
  });
}

function replaceOl(doc) {
  return makeRegex(olRegex, doc, null, null, function (match) {
    return replaceLi(match[1], 'ol')
  });
}

function replaceParagraph(doc) {
  return makeRegex(pRegex, doc);
}

function replacePre(doc) {
  return makeRegex(preRegex, doc, '`', '`');
}

function replaceBlockQuote(doc) {
  return makeRegex(blockQuoteRegex, doc, '> ');
}


function replaceBold(doc) {
  return makeRegex(boldRegex, doc, '**', '**', null, false);
}

function replaceItalic(doc) {
  return makeRegex(italicRegex, doc, '_', '_', null, false);
}

function replaceLi(doc, tag) {
  var matches = [];
  var newDoc = doc;
  var replaceIndex = 0;
  var replaceTag = '';
  while (matches = liRegex.exec(doc)) {
    if (matches && matches[1]) {
      if (tag !== 'ul') {
        // replaceIndex++;
        // replaceTag = replaceIndex + '. ';
        replaceTag = '1. ';
      } else {
        replaceTag = '* ';
      }
      newDoc = newDoc.replace(matches[0], replaceTag + matches[1].trim() + "\n");
    }
  }
  return newDoc
}

function addHashes(count) {
  count = Number(count);
  var string = '';
  for (var x = 0; x < count; x++) {
    string += '#'
  }
  return string;
}

module.exports = [
  replaceHR,
  replaceHeading,
  replaceParagraph,
  replacePre,
  replaceUl,
  replaceOl,
  replaceBold,
  replaceItalic,
  replaceBlockQuote
]
