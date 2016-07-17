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
            changed = true;
            console.log("change");
            changeHTML();
        }
    });
};


function changeHTML() {
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

            if (!(word === "'" || word === "," || word === "." || prevWord === "'")) {
                replacedSentence += " ";
            }
            //品詞ごとに色を付ける
            //主語
            if (tag === "NN" || tag === "DT" || tag === "NNP" || tag === "NNPS" || tag === "NNS" || tag === "PRP") {
                replacedSentence += '<font color="#8B0000">' + word + '</font>';
                //形容詞
            } else if (tag === "JJ" || tag === "JJR" || tag === "JJS") {
                replacedSentence += '<font color="#1E90FF">' + word + '</font>';
                //動詞
            } else if (tag === "VB" || tag === "VBD" || tag === "VBG" || tag === "VBN" || tag === "VBP" ||
                tag === "VBZ") {
                replacedSentence += '<font color="#FFA500">' + word + '</font>';
            }//助動詞
            else if (tag === "MD", tag === "RB") {
                replacedSentence += '<font color="#008000">' + word + '</font>';
                //準動詞
            } else if (tag === "DT") {
                replacedSentence += '<font color="#4169E1">' + word + '</font>';
                //関係詞
            } else if (tag === "WDT" || tag === "WP" || tag === "WP$" || tag === "WRB") {
                replacedSentence += '<font color="#7B68EE">' + word + '</font>';
                //接続詞
            } else if (tag === "IN" || tag === "CC") {
                replacedSentence += '<font color="#DC143C">' + word + '</font>';
                //その他
            } else {
                replacedSentence += word;
            }
            prevWord = word;
        }
        $(this).replaceWith("<p>" + replacedSentence + "</p>");
    });
}


