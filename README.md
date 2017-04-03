# SyllaRhyme
An npm package for counting syllables and rhyming words.

## Installation

```npm install syllarhyme```

### Nodeless
If you want it working straight in a browser:  

* Copy the contents of the ```nodeless/SyllaRhyme``` folder.  
* Make sure the file paths at the top of ```SyllaRhyme.js``` point correctly.  
* Then just include the script with UTF-8 encoding:  

  ```<script src="SyllaRhyme/SyllaRhyme.js" charset="utf-8"></script>```

## Usage

```javascript  
var SyllaRhyme = require( 'syllarhyme' ); //if using Node  

SyllaRhyme( function( sr ) {
    console.log( sr.rhymes( 'rhymes' ) );
    //["chimes", "dime's", "dimes", "heims", "himes", "hymes", "imes", "kimes", "climbs", "climes", "limes", "grimes", "crime's", "crimes", "crymes", "prime's", "primes", "rimes", "simes", "symes", "sometimes", "time's", "times", "times'"]
    console.log( sr.rhymesWith( 'rhymes', 'with' ) );
    //false
    console.log( sr.pronunciation( 'pronunciation' ) );
    //["P R OW0 N AH2 N S IY0 EY1 SH AH0 N", "P R AH0 N AH2 N S IY0 EY1 SH AH0 N"]
    console.log( sr.pronunciation( 'pronunciation', 'ipa' ) );
    //["p r oʊ n ʌ n s i eɪ ʃ ə n", "p r ə n ʌ n s i eɪ ʃ ə n"]
    console.log( sr.syllables( 'syllables' ) );
    //3
} );
```
## Functions

### rhymes( word )  
* Returns a string array of all matching rhyming words (excluding itself).  

### rhymesWith( word1, word2 )  
* Returns a boolean of whether the words rhyme (true if words are the same).  

### pronunciation( word, type *optional* )  
* Returns a string array of possible pronunciations with space separated phonemes. By default it returns [Arpabet](https://en.wikipedia.org/wiki/Arpabet) transcriptions. If ```type``` is set to ```'ipa'```, it'll return [IPA](https://en.wikipedia.org/wiki/Help:IPA_for_English) transcriptions instead.  

### syllables( str )  
* Return an int indicating the number of syllables in word/sentence/string.