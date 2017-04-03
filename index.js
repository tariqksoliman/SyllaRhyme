var fs = require( 'fs' );

module.exports = function( callback ) {
	
    var dictPath = __dirname + '/dictionaries/cmudict-0.7b.txt';
    var flipdictPath = __dirname + '/dictionaries/flipdict.txt';
      
    syllarhyme = {
        ipaMappings: {
        /*
        Stress
        Value	Description
        0	No stress
        1	Primary stress
        2	Secondary stress
        */
        /*
		Vowels - Monophthongs
		Arpabet	IPA		Word examples
		AO		ɔ		off (AO1 F); fall (F AO1 L); frost (F R AO1 S T)
		AA		ɑ		father (F AA1 DH ER), cot (K AA1 T)
		IY		i		bee (B IY1); she (SH IY1)
		UW		u		you (Y UW1); new (N UW1); food (F UW1 D)
		EH		ɛ OR e 	ed (R EH1 D); men (M EH1 N)
		IH		ɪ		big (B IH1 G); win (W IH1 N)
		UH		ʊ		should (SH UH1 D), could (K UH1 D)
		AH		ʌ		but (B AH1 T), sun (S AH1 N)
		AH(AH0) ə		sofa (S OW1 F AH0), alone (AH0 L OW1 N)
		AE		æ		at (AE1 T); fast (F AE1 S T)
		AX		ə 		discus (D IH1 S K AX0 S);
		*/
            'AO': 'ɔ',
			'AO0': 'ɔ',
			'AO1': 'ɔ',
			'AO2': 'ɔ',
			'AA': 'ɑ',
			'AA0': 'ɑ',
			'AA1': 'ɑ',
			'AA2': 'ɑ',
			'IY': 'i',
			'IY0': 'i',
			'IY1': 'i',
			'IY2': 'i',
			'UW': 'u',
			'UW0': 'u',
			'UW1': 'u',
			'UW2': 'u',
			'EH': 'e',
			'EH0': 'e',
			'EH1': 'e',
			'EH2': 'e',
			'IH': 'ɪ',
			'IH0': 'ɪ',
			'IH1': 'ɪ',
			'IH2': 'ɪ',
			'UH': 'ʊ',
			'UH0': 'ʊ',
			'UH1': 'ʊ',
			'UH2': 'ʊ',
			'AH': 'ʌ',
			'AH0': 'ə',
			'AH1': 'ʌ',
			'AH2': 'ʌ',
			'AE': 'æ',
			'AE0': 'æ',
			'AE1': 'æ',
			'AE2': 'æ',
			'AX': 'ə',
			'AX0': 'ə',
			'AX1': 'ə',
			'AX2': 'ə',
		/*
		Vowels - Diphthongs
		Arpabet	IPA	Word Examples
		EY		eɪ	say (S EY1); eight (EY1 T)
		AY		aɪ	my (M AY1); why (W AY1); ride (R AY1 D)
		OW		oʊ	show (SH OW1); coat (K OW1 T)
		AW		aʊ	how (HH AW1); now (N AW1)
		OY		ɔɪ	boy (B OY1); toy (T OY1)
		*/
			'EY': 'eɪ',
			'EY0': 'eɪ',
			'EY1': 'eɪ',
			'EY2': 'eɪ',
			'AY': 'aɪ',
			'AY0': 'aɪ',
			'AY1': 'aɪ',
			'AY2': 'aɪ',
			'OW': 'oʊ',
			'OW0': 'oʊ',
			'OW1': 'oʊ',
			'OW2': 'oʊ',
			'AW': 'aʊ',
			'AW0': 'aʊ',
			'AW1': 'aʊ',
			'AW2': 'aʊ',
			'OY': 'ɔɪ',
			'OY0': 'ɔɪ',
			'OY1': 'ɔɪ',
			'OY2': 'ɔɪ',
		/*
		Consonants - Stops
		Arpabet	IPA	Word Examples
		P		p	pay (P EY1)
		B		b	buy (B AY1)
		T		t	take (T EY1 K)
		D		d	day (D EY1)
		K		k	key (K IY1)
		G		ɡ	go (G OW1)
		*/
			'P': 'p',
			'B': 'b',
			'T': 't',
			'D': 'd',
			'K': 'k',
			'G': 'g',
		/*
		Consonants - Affricates
		Arpabet	IPA	Word Examples
		CH		tʃ	chair (CH EH1 R)
		JH		dʒ	just (JH AH1 S T); gym (JH IH1 M)
		*/
			'CH': 'tʃ',
			'JH': 'dʒ',	
		/*
		Consonants - Fricatives
		Arpabet	IPA	Word Examples
		F		f	for (F AO1 R)
		V		v	very (V EH1 R IY0)
		TH		θ	thanks (TH AE1 NG K S); Thursday (TH ER1 Z D EY2)
		DH		ð	that (DH AE1 T); the (DH AH0); them (DH EH1 M)
		S		s	say (S EY1)
		Z		z	zoo (Z UW1)
		SH		ʃ	show (SH OW1)
		ZH		ʒ	measure (M EH1 ZH ER0); pleasure (P L EH1 ZH ER)
		HH		h	house (HH AW1 S)
		*/
			'F': 'f',
			'V': 'v',
			'TH': 'θ',
			'DH': 'ð',
			'S': 's',
			'Z': 'z',
			'SH': 'ʃ',
			'ZH': 'ʒ',
			'HH': 'h',
		/*
		Consonants - Nasals
		Arpabet	IPA	Word Examples
		M		m	man (M AE1 N)
		N		n	no (N OW1)
		NG		ŋ	sing (S IH1 NG)
		*/
			'M': 'm',
			'N': 'n',
			'NG': 'ŋ',
	
		/*
		 Consonants - Liquids
		Arpabet	IPA		Word Examples
		L		ɫ OR l	late (L EY1 T)
		R		r OR ɹ	run (R AH1 N)
		*/
			'L': 'l',
			'R': 'r',
		/*
		 Vowels - R-colored vowels
		Arpabet			IPA	Word Examples
		ER				ɝ	her (HH ER0); bird (B ER1 D); hurt (HH ER1 T), nurse (N ER1 S)
		AXR				ɚ	father (F AA1 DH ER); coward (K AW1 ER D)
		The following R-colored vowels are contemplated above
		EH R			ɛr	air (EH1 R); where (W EH1 R); hair (HH EH1 R)
		UH R			ʊr	cure (K Y UH1 R); bureau (B Y UH1 R OW0), detour (D IH0 T UH1 R)
		AO R			ɔr	more (M AO1 R); bored (B AO1 R D); chord (K AO1 R D)
		AA R			ɑr	large (L AA1 R JH); hard (HH AA1 R D)
		IH R or IY R	ɪr	ear (IY1 R); near (N IH1 R)
		AW R			aʊr	This seems to be a rarely used r-controlled vowel. In some dialects flower (F L AW1 R; in other dialects F L AW1 ER0)
		*/
			'ER': 'ɜr',
			'ER0': 'ɜr',
			'ER1': 'ɜr',
			'ER2': 'ɜr',
			'AXR': 'ər',
			'AXR0': 'ər',
			'AXR1': 'ər',
			'AXR2': 'ər',
		/*
		Consonants - Semivowels
		Arpabet	IPA	Word Examples
		Y		j	yes (Y EH1 S)
		W		w	way (W EY1)
		*/
			'W': 'w',
			'Y': 'j' 
        },
        dict: null,
        flipdict: null,
        _wordToPhonemes: function( word ) {
            word = word.toUpperCase();
            var phoneArr = [];
            var num = 0;
            var id = '';
			// Scan dict linearly for the series:
			// word
			// word(1)
			// ...
			// word(n)
			// not word
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
            var rhymeArr = [];
	
            word = word.toLowerCase();

            var phonemesList = this._wordToPhonemes( word );
			if( phonemesList.length == 0 ) return rhymeArr;

            var match = phonesToMatch( phonemesList[0] );
            var matchesBegun = false;

			//Scan flipdict linearly for the series:
			// match
			// ...
			// match
			// not match
            for( var i = 0; i < this.flipdict.length; i++ ) {
                for( var m = 0; m < match.length; m++ ) {
                    if( this.flipdict[i][m] != match[m] ) {
                        if( matchesBegun ) return rhymeArr;
                        break;
                    }
                    if( m == match.length - 1 ) {
                        var rhyme = this.flipdict[i].slice( this.flipdict[i].lastIndexOf( ' ' ) )[0];
                        rhyme = rhyme.replace(/[\n\r]+/g, '').toLowerCase();
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
            return this.rhymes( word1 ).indexOf( word2.toLowerCase() ) > -1 ||
                   word1.toLowerCase() == word2.toLowerCase();
        },
        syllables: function( str ) {
            var syllablesCount = 0;
			str = str.replace(/[,.?!();]/g, "");
			var words = str.split( ' ' );
			
			for( var i = 0; i < words.length; i++ ) {
				var phonemes = this._wordToPhonemes( words[i] )[0];
				if( phonemes ) { //the word is found
					//Count how many voweled phones
					for( var j = 0; j < phonemes.length; j++ ) {
						if( (/^[aeiou]/i).test( phonemes[j] ) ) syllablesCount++;
					}
				}
			}
            return syllablesCount;
        },
        //optional: type ('arpabet'(default) or 'ipa')
        //  https://en.wikipedia.org/wiki/Arpabet
        //  https://en.wikipedia.org/wiki/Help:IPA_for_English
        pronunciation: function( word, type ) {
            var phonemes = this._wordToPhonemes( word );

            for( var i = 0; i < phonemes.length; i++ ) {
                if( type && type.toLowerCase() == 'ipa' ) {
                    for( var j = 0; j < phonemes[i].length; j++ ) {
                        if( this.ipaMappings.hasOwnProperty( phonemes[i][j] ) ) {
                            phonemes[i][j] = this.ipaMappings[ phonemes[i][j] ];
                        }
                    }
                }
                phonemes[i] = phonemes[i].join( ' ' );
            }
            return phonemes;
        }
    };

    //init
    var dictsLoaded = 0;
    function dictLoaded() {
        dictsLoaded++;
        if( dictsLoaded >= 2 ) {
            if( typeof callback === 'function' ) callback( syllarhyme );
        }
    }

    readDictFile( dictPath, function( lines ) {
        syllarhyme.dict = lines;
        dictLoaded();
    } );
    readDictFile( flipdictPath, function( lines ) {
        syllarhyme.flipdict = lines;
        dictLoaded();
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
            return typeof cb === "function" ? cb( lines ) : void 0;
        });
    }
}