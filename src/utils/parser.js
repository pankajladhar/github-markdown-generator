module.exports = /*
* Generated by PEG.js 0.10.0.
*
* http://pegjs.org/
*/
(function() {
 "use strict";

 function peg$subclass(child, parent) {
   function ctor() { this.constructor = child; }
   ctor.prototype = parent.prototype;
   child.prototype = new ctor();
 }

 function peg$SyntaxError(message, expected, found, location) {
   this.message  = message;
   this.expected = expected;
   this.found    = found;
   this.location = location;
   this.name     = "SyntaxError";

   if (typeof Error.captureStackTrace === "function") {
     Error.captureStackTrace(this, peg$SyntaxError);
   }
 }

 peg$subclass(peg$SyntaxError, Error);

 peg$SyntaxError.buildMessage = function(expected, found) {
   var DESCRIBE_EXPECTATION_FNS = {
         literal: function(expectation) {
           return "\"" + literalEscape(expectation.text) + "\"";
         },

         "class": function(expectation) {
           var escapedParts = "",
               i;

           for (i = 0; i < expectation.parts.length; i++) {
             escapedParts += expectation.parts[i] instanceof Array
               ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
               : classEscape(expectation.parts[i]);
           }

           return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
         },

         any: function(expectation) {
           return "any character";
         },

         end: function(expectation) {
           return "end of input";
         },

         other: function(expectation) {
           return expectation.description;
         }
       };

   function hex(ch) {
     return ch.charCodeAt(0).toString(16).toUpperCase();
   }

   function literalEscape(s) {
     return s
       .replace(/\\/g, '\\\\')
       .replace(/"/g,  '\\"')
       .replace(/\0/g, '\\0')
       .replace(/\t/g, '\\t')
       .replace(/\n/g, '\\n')
       .replace(/\r/g, '\\r')
       .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
       .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
   }

   function classEscape(s) {
     return s
       .replace(/\\/g, '\\\\')
       .replace(/\]/g, '\\]')
       .replace(/\^/g, '\\^')
       .replace(/-/g,  '\\-')
       .replace(/\0/g, '\\0')
       .replace(/\t/g, '\\t')
       .replace(/\n/g, '\\n')
       .replace(/\r/g, '\\r')
       .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
       .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
   }

   function describeExpectation(expectation) {
     return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
   }

   function describeExpected(expected) {
     var descriptions = new Array(expected.length),
         i, j;

     for (i = 0; i < expected.length; i++) {
       descriptions[i] = describeExpectation(expected[i]);
     }

     descriptions.sort();

     if (descriptions.length > 0) {
       for (i = 1, j = 1; i < descriptions.length; i++) {
         if (descriptions[i - 1] !== descriptions[i]) {
           descriptions[j] = descriptions[i];
           j++;
         }
       }
       descriptions.length = j;
     }

     switch (descriptions.length) {
       case 1:
         return descriptions[0];

       case 2:
         return descriptions[0] + " or " + descriptions[1];

       default:
         return descriptions.slice(0, -1).join(", ")
           + ", or "
           + descriptions[descriptions.length - 1];
     }
   }

   function describeFound(found) {
     return found ? "\"" + literalEscape(found) + "\"" : "end of input";
   }

   return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
 };

 function peg$parse(input, options) {
   options = options !== void 0 ? options : {};

   var peg$FAILED = {},

       peg$startRuleFunctions = { start: peg$parsestart },
       peg$startRuleFunction  = peg$parsestart,

       peg$c0 = function(tagALL) {return tagALL.join("\n")},
       peg$c1 = function(tagExpr) {
             return mdify(tagExpr)
           },
       peg$c2 = peg$otherExpectation("tagExpr"),
       peg$c3 = "<",
       peg$c4 = peg$literalExpectation("<", false),
       peg$c5 = ">",
       peg$c6 = peg$literalExpectation(">", false),
       peg$c7 = "</",
       peg$c8 = peg$literalExpectation("</", false),
       peg$c9 = function(fullTag, startName, attribute, tagContents, endName) {
             if(startName!==endName){
                 throw new Error("tag!!!! is not matching")
             }
               return {
                 startTag:startName,
                   attribute:attribute || null,
                   content:tagContents.map(mdify).join('')
               };
           },
       peg$c10 = function(content) {return { startTag: "NOTAG", content:content.join("") } },
       peg$c11 = function(content) {return { startTag: "TEXT", content:content.join("") } },
       peg$c12 = peg$otherExpectation("attribute"),
       peg$c13 = "=",
       peg$c14 = peg$literalExpectation("=", false),
       peg$c15 = function(attributes, attrContent) { return attrContent.join('').replace(/"/g, '')},
       peg$c16 = peg$otherExpectation("attributesType"),
       peg$c17 = /^[ href|alt ]/,
       peg$c18 = peg$classExpectation([" ", "h", "r", "e", "f", "|", "a", "l", "t", " "], false, false),
       peg$c19 = function(attributesType) { return attributesType },
       peg$c20 = peg$otherExpectation("tagName"),
       peg$c21 = /^[a-z0-9]/,
       peg$c22 = peg$classExpectation([["a", "z"], ["0", "9"]], false, false),
       peg$c23 = function(text) {return text.join("")},
       peg$c24 = peg$otherExpectation("content"),
       peg$c25 = /^[a-zA-Z0-9{}()=?_\/\\:!\-;$%#&*@|\\.\\,\n\\'\\" ]/,
       peg$c26 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "{", "}", "(", ")", "=", "?", "_", "/", "\\", ":", "!", "-", ";", "$", "%", "#", "&", "*", "@", "|", "\\", ".", "\\", ",", "\n", "\\", "'", "\\", "\"", " "], false, false),
       peg$c27 = peg$otherExpectation("whitespace"),
       peg$c28 = /^[ \t\n\r]/,
       peg$c29 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
       peg$c30 = function() {return ""},

       peg$currPos          = 0,
       peg$savedPos         = 0,
       peg$posDetailsCache  = [{ line: 1, column: 1 }],
       peg$maxFailPos       = 0,
       peg$maxFailExpected  = [],
       peg$silentFails      = 0,

       peg$result;

   if ("startRule" in options) {
     if (!(options.startRule in peg$startRuleFunctions)) {
       throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
     }

     peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
   }

   function text() {
     return input.substring(peg$savedPos, peg$currPos);
   }

   function location() {
     return peg$computeLocation(peg$savedPos, peg$currPos);
   }

   function expected(description, location) {
     location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

     throw peg$buildStructuredError(
       [peg$otherExpectation(description)],
       input.substring(peg$savedPos, peg$currPos),
       location
     );
   }

   function error(message, location) {
     location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

     throw peg$buildSimpleError(message, location);
   }

   function peg$literalExpectation(text, ignoreCase) {
     return { type: "literal", text: text, ignoreCase: ignoreCase };
   }

   function peg$classExpectation(parts, inverted, ignoreCase) {
     return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
   }

   function peg$anyExpectation() {
     return { type: "any" };
   }

   function peg$endExpectation() {
     return { type: "end" };
   }

   function peg$otherExpectation(description) {
     return { type: "other", description: description };
   }

   function peg$computePosDetails(pos) {
     var details = peg$posDetailsCache[pos], p;

     if (details) {
       return details;
     } else {
       p = pos - 1;
       while (!peg$posDetailsCache[p]) {
         p--;
       }

       details = peg$posDetailsCache[p];
       details = {
         line:   details.line,
         column: details.column
       };

       while (p < pos) {
         if (input.charCodeAt(p) === 10) {
           details.line++;
           details.column = 1;
         } else {
           details.column++;
         }

         p++;
       }

       peg$posDetailsCache[pos] = details;
       return details;
     }
   }

   function peg$computeLocation(startPos, endPos) {
     var startPosDetails = peg$computePosDetails(startPos),
         endPosDetails   = peg$computePosDetails(endPos);

     return {
       start: {
         offset: startPos,
         line:   startPosDetails.line,
         column: startPosDetails.column
       },
       end: {
         offset: endPos,
         line:   endPosDetails.line,
         column: endPosDetails.column
       }
     };
   }

   function peg$fail(expected) {
     if (peg$currPos < peg$maxFailPos) { return; }

     if (peg$currPos > peg$maxFailPos) {
       peg$maxFailPos = peg$currPos;
       peg$maxFailExpected = [];
     }

     peg$maxFailExpected.push(expected);
   }

   function peg$buildSimpleError(message, location) {
     return new peg$SyntaxError(message, null, null, location);
   }

   function peg$buildStructuredError(expected, found, location) {
     return new peg$SyntaxError(
       peg$SyntaxError.buildMessage(expected, found),
       expected,
       found,
       location
     );
   }

   function peg$parsestart() {
     var s0, s1, s2;

     s0 = peg$currPos;
     s1 = [];
     s2 = peg$parsetags();
     while (s2 !== peg$FAILED) {
       s1.push(s2);
       s2 = peg$parsetags();
     }
     if (s1 !== peg$FAILED) {
       peg$savedPos = s0;
       s1 = peg$c0(s1);
     }
     s0 = s1;

     return s0;
   }

   function peg$parsetags() {
     var s0, s1, s2, s3;

     s0 = peg$currPos;
     s1 = peg$parse_();
     if (s1 !== peg$FAILED) {
       s2 = peg$parsetagExpr();
       if (s2 !== peg$FAILED) {
         s3 = peg$parse_();
         if (s3 !== peg$FAILED) {
           peg$savedPos = s0;
           s1 = peg$c1(s2);
           s0 = s1;
         } else {
           peg$currPos = s0;
           s0 = peg$FAILED;
         }
       } else {
         peg$currPos = s0;
         s0 = peg$FAILED;
       }
     } else {
       peg$currPos = s0;
       s0 = peg$FAILED;
     }

     return s0;
   }

   function peg$parsetagExpr() {
     var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

     peg$silentFails++;
     s0 = peg$currPos;
     if (input.charCodeAt(peg$currPos) === 60) {
       s1 = peg$c3;
       peg$currPos++;
     } else {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c4); }
     }
     if (s1 !== peg$FAILED) {
       s2 = peg$parsetagName();
       if (s2 !== peg$FAILED) {
         s3 = [];
         s4 = peg$parseattribute();
         while (s4 !== peg$FAILED) {
           s3.push(s4);
           s4 = peg$parseattribute();
         }
         if (s3 !== peg$FAILED) {
           if (input.charCodeAt(peg$currPos) === 62) {
             s4 = peg$c5;
             peg$currPos++;
           } else {
             s4 = peg$FAILED;
             if (peg$silentFails === 0) { peg$fail(peg$c6); }
           }
           if (s4 !== peg$FAILED) {
             s5 = peg$parse_();
             if (s5 !== peg$FAILED) {
               s6 = [];
               s7 = peg$parsetagContent();
               while (s7 !== peg$FAILED) {
                 s6.push(s7);
                 s7 = peg$parsetagContent();
               }
               if (s6 !== peg$FAILED) {
                 s7 = peg$parse_();
                 if (s7 !== peg$FAILED) {
                   if (input.substr(peg$currPos, 2) === peg$c7) {
                     s8 = peg$c7;
                     peg$currPos += 2;
                   } else {
                     s8 = peg$FAILED;
                     if (peg$silentFails === 0) { peg$fail(peg$c8); }
                   }
                   if (s8 !== peg$FAILED) {
                     s9 = peg$parsetagName();
                     if (s9 !== peg$FAILED) {
                       if (input.charCodeAt(peg$currPos) === 62) {
                         s10 = peg$c5;
                         peg$currPos++;
                       } else {
                         s10 = peg$FAILED;
                         if (peg$silentFails === 0) { peg$fail(peg$c6); }
                       }
                       if (s10 !== peg$FAILED) {
                         peg$savedPos = s0;
                         s1 = peg$c9(s1, s2, s3, s6, s9);
                         s0 = s1;
                       } else {
                         peg$currPos = s0;
                         s0 = peg$FAILED;
                       }
                     } else {
                       peg$currPos = s0;
                       s0 = peg$FAILED;
                     }
                   } else {
                     peg$currPos = s0;
                     s0 = peg$FAILED;
                   }
                 } else {
                   peg$currPos = s0;
                   s0 = peg$FAILED;
                 }
               } else {
                 peg$currPos = s0;
                 s0 = peg$FAILED;
               }
             } else {
               peg$currPos = s0;
               s0 = peg$FAILED;
             }
           } else {
             peg$currPos = s0;
             s0 = peg$FAILED;
           }
         } else {
           peg$currPos = s0;
           s0 = peg$FAILED;
         }
       } else {
         peg$currPos = s0;
         s0 = peg$FAILED;
       }
     } else {
       peg$currPos = s0;
       s0 = peg$FAILED;
     }
     if (s0 === peg$FAILED) {
       s0 = peg$parsenoTag();
     }
     peg$silentFails--;
     if (s0 === peg$FAILED) {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c2); }
     }

     return s0;
   }

   function peg$parsenoTag() {
     var s0, s1;

     s0 = peg$currPos;
     s1 = peg$parsecontent();
     if (s1 !== peg$FAILED) {
       peg$savedPos = s0;
       s1 = peg$c10(s1);
     }
     s0 = s1;

     return s0;
   }

   function peg$parsetagContent() {
     var s0, s1;

     s0 = peg$currPos;
     s1 = peg$parsecontent();
     if (s1 !== peg$FAILED) {
       peg$savedPos = s0;
       s1 = peg$c11(s1);
     }
     s0 = s1;
     if (s0 === peg$FAILED) {
       s0 = peg$parsetagExpr();
     }

     return s0;
   }

   function peg$parseattribute() {
     var s0, s1, s2, s3;

     peg$silentFails++;
     s0 = peg$currPos;
     s1 = peg$parseattributesType();
     if (s1 !== peg$FAILED) {
       if (input.charCodeAt(peg$currPos) === 61) {
         s2 = peg$c13;
         peg$currPos++;
       } else {
         s2 = peg$FAILED;
         if (peg$silentFails === 0) { peg$fail(peg$c14); }
       }
       if (s2 !== peg$FAILED) {
         s3 = peg$parsecontent();
         if (s3 !== peg$FAILED) {
           peg$savedPos = s0;
           s1 = peg$c15(s1, s3);
           s0 = s1;
         } else {
           peg$currPos = s0;
           s0 = peg$FAILED;
         }
       } else {
         peg$currPos = s0;
         s0 = peg$FAILED;
       }
     } else {
       peg$currPos = s0;
       s0 = peg$FAILED;
     }
     peg$silentFails--;
     if (s0 === peg$FAILED) {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c12); }
     }

     return s0;
   }

   function peg$parseattributesType() {
     var s0, s1, s2;

     peg$silentFails++;
     s0 = peg$currPos;
     s1 = [];
     if (peg$c17.test(input.charAt(peg$currPos))) {
       s2 = input.charAt(peg$currPos);
       peg$currPos++;
     } else {
       s2 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c18); }
     }
     while (s2 !== peg$FAILED) {
       s1.push(s2);
       if (peg$c17.test(input.charAt(peg$currPos))) {
         s2 = input.charAt(peg$currPos);
         peg$currPos++;
       } else {
         s2 = peg$FAILED;
         if (peg$silentFails === 0) { peg$fail(peg$c18); }
       }
     }
     if (s1 !== peg$FAILED) {
       peg$savedPos = s0;
       s1 = peg$c19(s1);
     }
     s0 = s1;
     peg$silentFails--;
     if (s0 === peg$FAILED) {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c16); }
     }

     return s0;
   }

   function peg$parsetagName() {
     var s0, s1, s2;

     peg$silentFails++;
     s0 = peg$currPos;
     s1 = [];
     if (peg$c21.test(input.charAt(peg$currPos))) {
       s2 = input.charAt(peg$currPos);
       peg$currPos++;
     } else {
       s2 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c22); }
     }
     if (s2 !== peg$FAILED) {
       while (s2 !== peg$FAILED) {
         s1.push(s2);
         if (peg$c21.test(input.charAt(peg$currPos))) {
           s2 = input.charAt(peg$currPos);
           peg$currPos++;
         } else {
           s2 = peg$FAILED;
           if (peg$silentFails === 0) { peg$fail(peg$c22); }
         }
       }
     } else {
       s1 = peg$FAILED;
     }
     if (s1 !== peg$FAILED) {
       peg$savedPos = s0;
       s1 = peg$c23(s1);
     }
     s0 = s1;
     peg$silentFails--;
     if (s0 === peg$FAILED) {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c20); }
     }

     return s0;
   }

   function peg$parsecontent() {
     var s0, s1;

     peg$silentFails++;
     s0 = [];
     if (peg$c25.test(input.charAt(peg$currPos))) {
       s1 = input.charAt(peg$currPos);
       peg$currPos++;
     } else {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c26); }
     }
     if (s1 !== peg$FAILED) {
       while (s1 !== peg$FAILED) {
         s0.push(s1);
         if (peg$c25.test(input.charAt(peg$currPos))) {
           s1 = input.charAt(peg$currPos);
           peg$currPos++;
         } else {
           s1 = peg$FAILED;
           if (peg$silentFails === 0) { peg$fail(peg$c26); }
         }
       }
     } else {
       s0 = peg$FAILED;
     }
     peg$silentFails--;
     if (s0 === peg$FAILED) {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c24); }
     }

     return s0;
   }

   function peg$parse_() {
     var s0, s1, s2;

     peg$silentFails++;
     s0 = peg$currPos;
     s1 = [];
     if (peg$c28.test(input.charAt(peg$currPos))) {
       s2 = input.charAt(peg$currPos);
       peg$currPos++;
     } else {
       s2 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c29); }
     }
     while (s2 !== peg$FAILED) {
       s1.push(s2);
       if (peg$c28.test(input.charAt(peg$currPos))) {
         s2 = input.charAt(peg$currPos);
         peg$currPos++;
       } else {
         s2 = peg$FAILED;
         if (peg$silentFails === 0) { peg$fail(peg$c29); }
       }
     }
     if (s1 !== peg$FAILED) {
       peg$savedPos = s0;
       s1 = peg$c30();
     }
     s0 = s1;
     peg$silentFails--;
     if (s0 === peg$FAILED) {
       s1 = peg$FAILED;
       if (peg$silentFails === 0) { peg$fail(peg$c27); }
     }

     return s0;
   }


     var tagFunctions = {}
       tagFunctions.h1= function(cons){
         return '# ' + cons
       }
       tagFunctions.h2= function(cons){
         return '## ' + cons
       }
       tagFunctions.h3= function(cons){
         return '### ' + cons
       }
       tagFunctions.b= function(cons){
         return '**'+cons+'**'
       }
       tagFunctions.i= function(cons){
         return '_'+cons+'_'
       }
       tagFunctions.a= function(cons,attr){
         return '['+cons+']('+attr+')'
       }
       tagFunctions.img= function(cons,attr){
         return '!['+cons+']('+attr+')'
       }
       tagFunctions.div= function(cons){
         return '\n'+ cons
       }
       tagFunctions.ul= function(cons){
         return cons.replace(/\$/gi, "*")
       }
       tagFunctions.ol= function(cons){
         return cons.replace(/\$/gi, "1.")
       }
       tagFunctions.li= function(cons){
         return '$ '+ cons + '\n'
       }
       tagFunctions.pre= function(cons){
         return '```javascript ' + cons +'```'
       }
       tagFunctions.TEXT = function(x){ return x;}
       tagFunctions.NOTAG = function(cons){
         return '\n'+ cons
       }
       var mdify = function(param){
         return param.content.length > 0 ? 
             tagFunctions[param.startTag](param.content, param.attribute) : ""
       }


   peg$result = peg$startRuleFunction();

   if (peg$result !== peg$FAILED && peg$currPos === input.length) {
     return peg$result;
   } else {
     if (peg$result !== peg$FAILED && peg$currPos < input.length) {
       peg$fail(peg$endExpectation());
     }

     throw peg$buildStructuredError(
       peg$maxFailExpected,
       peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
       peg$maxFailPos < input.length
         ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
         : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
     );
   }
 }

 return {
   SyntaxError: peg$SyntaxError,
   parse:       peg$parse
 };
})();
