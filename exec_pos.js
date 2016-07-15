var pos = require('pos');
//var $ = require('jquery');
ptags = [];
var prevWord = '';
$(function(){
    $('p').each(function(){
        var word = $(this).html();
        ptags.push(word)
        //console.log(word);
        //htmlのタグを消す正規表現
        word = word.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
        //console.log(word);
        var words = new pos.Lexer().lex(word);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        var replacedSentence = '';
        for (i in taggedWords) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            //console.log(prevWord);
            //console.log(word + " /" + tag);

            if(!(word === "'" || word === "," || word === "." || prevWord === "'")){
                replacedSentence += " ";
            }

            //品詞ごとに色を付ける
            //主語
            if(tag === "NN" || tag === "DT" || tag === "NNP" || tag === "NNPS" || tag === "NNS" || tag === "PRP"){
                replacedSentence += '<font color="#8B0000">'+word+'</font>';
            //形容詞
            }else if(tag === "JJ" || tag === "JJR" || tag === "JJS"){
                replacedSentence += '<font color="#1E90FF">'+word+'</font>';
            //動詞
            }else if(tag === "VB" || tag === "VBD" ||  tag === "VBG" || tag === "VBN" || tag === "VBP" ||
                     tag === "VBZ"){
                replacedSentence += '<font color="#FFA500">'+word+'</font>';
            }//助動詞
            else if(tag === "MD", tag === "RB"){
                replacedSentence += '<font color="#008000">'+word+'</font>';
            //準動詞
            }else if(tag === "DT"){
                replacedSentence += '<font color="#4169E1">'+word+'</font>';
            //関係詞
            }else if(tag === "WDT" || tag === "WP" || tag === "WP$" || tag === "WRB"){
                replacedSentence += '<font color="#7B68EE">'+word+'</font>';
            //接続詞
            }else if(tag === "IN" || tag === "CC"){
                replacedSentence += '<font color="#DC143C">'+word+'</font>';
            //その他
            }else{
                replacedSentence += word;
            }
            prevWord = word;
            //console.log(taggedWord[0]);

        }
        $(this).replaceWith("<p>"+replacedSentence+"</p>");
    });
    console.log(ptags);

    //ページの書き換えフラグと要素を送る
    chrome.runtime.sendMessage(ptags, function(response) {
        console.log(response);
    });
});