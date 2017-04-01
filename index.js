var fs = require( 'fs' );

module.exports = function( callback ) {
      
    syllarhyme = {
        dict: null,
        flipdict: null,
        _wordToPhonemes: function( word ) {
            word = word.toUpperCase();
            var phoneArr = [];
            var num = 0;
            var id = '';
            for( var i = 0; i < this.dict.length; i++ ) {

                if( this.dict[i][0] == word + id ) {
                    phoneArr.push( this.dict[i].slice(2) );
                    num++;
                    id = '(' + num + ')';
                }
                else if( id > 0 ) {
                    break;
                }
            }

            return phoneArr;
        },
        rhymes: function( word ) {
            word = word.toLowerCase();
            var phonemesList = this._wordToPhonemes( word );
            var match = phonesToMatch( phonemesList[0] );
            var rhymeArr = [];
            var matchesBegun = false;

            for( var i = 0; i < this.flipdict.length; i++ ) {
                for( var m = 0; m < match.length; m++ ) {
                    if( this.flipdict[i][m] != match[m] ) {
                        if( matchesBegun ) return rhymeArr;
                        break;
                    }
                    if( m == match.length - 1 ) {
                        var rhyme = this.flipdict[i].slice( this.flipdict[i].lastIndexOf( ' ' ) )[0].replace(/[\n\r]+/g, '').toLowerCase();
                        if( rhyme != word ) {
                            rhymeArr.push( rhyme );
                            matchesBegun = true;
                        }
                    }
                }
            }

            return rhymeArr;

            //match max( 2 phones, first vowel phone )
            function phonesToMatch( phonemes ) {
                var match = [];
                var hasVowel = false;
                for( var i = phonemes.length - 1; i > 0; i-- ) {
                    match.push( phonemes[i] );
                    if( (/^[aeiou]/i).test( phonemes[i] ) ) {
                        hasVowel = true;
                    }
                    if( match.length >= 2 && hasVowel ) break;
                }
                return match;
            }
        },
        rhymesWith: function( word1, word2 ) {
            return this.rhymes( word1 ).indexOf( word2.toLowerCase() ) > -1 || word1.toLowerCase() == word2.toLowerCase();
        },
        syllables: function( str ) {

        },
        //optional: type ('arpabet'(default) or 'ipa')
        //  https://en.wikipedia.org/wiki/Arpabet
        //  https://en.wikipedia.org/wiki/Help:IPA_for_English
        pronounciation: function( word, type ) {
            var phonemes = this._wordToPhonemes( word );
            for( var i = 0; i < phonemes.length; i++ ) {
                phonemes[i] = phonemes[i].join( ' ' );
            }
            return phonemes;
        }
    };

    //init
    var dict = 'dictionaries/cmudict-0.7b.txt';
    var flipdict = 'dictionaries/flipdict.txt';

    var dictsLoaded = 0;
    function dictLoaded() {
        dictsLoaded++;
        if( dictsLoaded >= 2 ) {
            if( typeof callback === 'function' ) callback();
        }
    }

    readDictFile( dict, function( lines ) {
        syllarhyme.dict = lines;
    } );
    readDictFile( flipdict, function( lines ) {
        syllarhyme.flipdict = lines;
    } );

    return syllarhyme;

    function readDictFile( url, cb ) {
        var lines;
        fs.readFile( url, function( err, data ) {
            if( err ) {
                return console.error( err );
            }
            lines = data.toString().split( '\n' );
            for( var i = 0; i < lines.length; i++ ) {
                lines[i] = lines[i].split( ' ' );
            }
            dictLoaded();
             return typeof cb === "function" ? cb( lines ) : void 0;
        });
    }
}