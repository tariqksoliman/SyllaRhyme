# SyllaRhyme
An npm package (not yet) for counting syllables and rhyming words.


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
    console.log( sr.rhymesWith( 'rhymes', 'with' ) );
    console.log( sr.pronunciation( 'pronunciation' ) );
    console.log( sr.pronunciation( 'pronunciation', 'ipa' ) );
    console.log( sr.syllables( 'syllables' ) );
} );
```
## Functions

### rhymes( word )
* Returns a string array of all matching rhymes word (excluding itself).
### rhymesWith( word1, word2 )
* Returns a boolean of whether the words rhyme (true if words are the same).
### pronunciation( word, type *optional* )
* Returns a string array of possible pronunciations with space separated phonemes. By default it returns [Arpabet](https://en.wikipedia.org/wiki/Arpabet) transcriptions. If ```type``` is set to ```'ipa'```, it'll return [IPA](https://en.wikipedia.org/wiki/Help:IPA_for_English) transcriptions instead.
### syllables( word )
* Return an int indicating the number of syllables in word.