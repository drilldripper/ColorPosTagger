var pos = require('pos');
first = true;
changed = false;
htmlpage = '';
module.exports = function colorChange(flag) {
    console.log('init');
    let i = 0;
    //save original web page
    if (first === true) {
        htmlpage = $('body').html();
        first = false;
    }
    $(function () {
        if (changed == true) {
            console.log("recovery");
            //a bit dirty..
            $('body').empty().append(htmlpage);
            changed = false;
        } else {
            var keys = [
                'noun',
                'adjective',
                'verb',
                'adverb',
                'auxiliaryVerb',
                'relative',
                'conjunction',
                'determiner'
            ];
            chrome.storage.sync.get(keys, function (items) {
                //console.log(items);
                changeHTML(items,'p');
                // changeHTML(items, 'list');
            });
            changed = true;
            console.log("change");
        }
    });
};


function changeHTML(fontColors, focusTag) {
    var prevWord = '';
    $(focusTag).each(function () {
        var word = $(this).html();
        //delete unneccesary html tags
        word = word.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
        var words = new pos.Lexer().lex(word);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        var replacedSentence = '';
        for (i in taggedWords) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            //console.log(word + ' / ' + tag);

            if (!(word === "'" || word === "," || word === "." || prevWord === "'")) {
                replacedSentence += " ";
            }
            //parse
            //noun
            if (tag === "NN" || tag === "NNP" || tag === "NNPS"
                || tag === "NNS" || tag === "PRP" || tag == "PRP$" || tag === "EX") {
                replacedSentence += fontColors.noun + word + '</font>';
                //adjective
            } else if (tag === "JJ" || tag === "JJR" || tag === "JJS") {
                replacedSentence += fontColors.adjective + word + '</font>';
                //adverb
            } else if (tag === "RB" || tag === "RBR" || tag === "RBS") {
                replacedSentence += fontColors.adverb + word + '</font>';
            }   //verb
            else if (tag === "VB" || tag === "VBD" || tag === "VBG" || tag === "VBN"
                || tag === "VBP" || tag === "VBZ") {
                replacedSentence += fontColors.verb + word + '</font>';
            }   //auxiliaryVerb
            else if (tag === "MD") {
                replacedSentence += fontColors.auxiliaryVerb + word + '</font>';
                //relative
            } else if (tag === "WDT" || tag === "WP" || tag === "WP$" || tag === "WRB") {
                replacedSentence += fontColors.relative + word + '</font>';
                //conjunction
            } else if (tag === "IN" || tag === "CC") {
                replacedSentence += fontColors.conjunction + word + '</font>';
                //determiner
            } else if (tag === "DT") {
                replacedSentence += fontColors.determiner + word + '</font>';
                //others
            } else {
                replacedSentence += word;
            }
            prevWord = word;
        }
        $(this).replaceWith('<' + focusTag + '>' + replacedSentence + '</' + focusTag + '>');
    });
}


