var pos = require('pos');
ptags = [];
first = true;
changed = false;
htmlpage = '';
module.exports = function colorChange(flag) {
    console.log('init');
    console.log(ptags.length);
    let i = 0;
    //最初だけページを保存する
    if (first === true) {
        htmlpage = $('body').html();
        first = false;
    }
    $(function () {
        if (changed == true) {
            console.log("recovery");
            //書き換え後のDOM要素はjqueryのhtmlでは取得できないので
            //diertyな方法を使う
            $('body').empty().append(htmlpage);
            changed = false;
        } else {
            var keys = [
                'subject',
                'adjective',
                'verb',
                'adverb',
                'auxiliaryVerb',
                'relative',
                'conjunction',
                'determiner'
            ];
            chrome.storage.local.get(keys, function (items) {
                console.log(items);
                changeHTML(items);
            });
            changed = true;
            console.log("change");
        }
    });
};


function changeHTML(fontColors) {
    var prevWord = '';
    $('p').each(function () {
        var word = $(this).html();
        //htmlのタグを消す正規表現
        word = word.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
        var words = new pos.Lexer().lex(word);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        var replacedSentence = '';
        for (i in taggedWords) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            console.log(word + ' / ' + tag);

            if (!(word === "'" || word === "," || word === "." || prevWord === "'")) {
                replacedSentence += " ";
            }
            //品詞分類する
            //名詞
            if (tag === "NN" || tag === "NNP" || tag === "NNPS" 
                || tag === "NNS" || tag === "PRP" || tag == "PRP$" || tag === "EX") {
                replacedSentence += fontColors.subject + word + '</font>';
                //形容詞
            } else if (tag === "JJ" || tag === "JJR" || tag === "JJS") {
                replacedSentence += fontColors.adjective + word + '</font>';
                //副詞
            } else if (tag === "RB" || tag === "RBR" || tag === "RBS") {
                replacedSentence += fontColors.adverb + word + '</font>';
            }   //動詞
            else if (tag === "VB" || tag === "VBD" || tag === "VBG" || tag === "VBN"
                || tag === "VBP" || tag === "VBZ") {
                replacedSentence += fontColors.verb + word + '</font>';
            }   //助動詞
            else if (tag === "MD") {
                replacedSentence += fontColors.auxiliaryVerb + word + '</font>';
                //準動詞
            } else if (tag === "WDT" || tag === "WP" || tag === "WP$" || tag === "WRB") {
                replacedSentence += fontColors.relative + word + '</font>';
                //接続詞
            } else if (tag === "IN" || tag === "CC") {
                replacedSentence += fontColors.conjunction + word + '</font>';
                //冠詞
            } else if (tag === "DT") {
                replacedSentence += fontColors.determiner + word + '</font>';
                //その他
            } else {
                replacedSentence += word;
            }
            prevWord = word;
        }
        $(this).replaceWith("<p>" + replacedSentence + "</p>");
    });
}


