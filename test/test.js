var assert = require( 'assert' );
var SyllaRhyme = require( '../index.js' );

var syllarhyme;

before( function( done ) {
    this.enableTimeouts( false );
    syllarhyme = SyllaRhyme( function( sr ) {
        done();
    } );
});

describe( 'SyllaRhyme', function() {

    //_wordToPhonemes
    describe( '#_wordToPhonemes( "test" )[0]', function() {
        it( 'should return [T, EH1, S, T]', function() {
            assert.deepEqual( [ 'T', 'EH1', 'S', 'T' ], syllarhyme._wordToPhonemes( 'test' )[0] );
        });
    });
    describe( '#_wordToPhonemes( "evaluation" )', function() {
        it( 'should return two pronunciations', function() {
            assert.equal( 2, syllarhyme._wordToPhonemes( 'evaluation' ).length );
        });
    });
    describe( '#_wordToPhonemes( "testnonsense" )', function() {
        it( 'should return []', function() {
            assert.deepEqual( [], syllarhyme._wordToPhonemes( 'testnonsense' ) );
        });
    });

    //rhymes
    describe( '#rhymes( "test" )[0]', function() {
        it( 'should return first rhyme "best"', function() {
            assert.equal( 'best', syllarhyme.rhymes( 'test' )[0] );
        });
    });
    describe( '#rhymes( "test" )', function() {
        it( 'should not return itself', function() {
            assert.equal( -1, syllarhyme.rhymes( 'test' ).indexOf( 'test' ) );
        });
    });
    describe( '#rhymes( "bulb" )', function() {
        it( 'should return []', function() {
            assert.deepEqual( [], syllarhyme.rhymes( 'bulb' ) );
        });
    });
    describe( '#rhymes( "trunk" )', function() {
        it( 'should contain "shunk"', function() {
            assert.equal( true, syllarhyme.rhymes( 'trunk' ).indexOf( 'shunk' ) > -1 );
        });
    });

    //rhymesWith
    describe( '#rhymesWith( "test", "best" )', function() {
        it( 'should return true', function() {
            assert.equal( true, syllarhyme.rhymesWith( 'test', 'best' ) );
        });
    });
    describe( '#rhymesWith( "best", "test" )', function() {
        it( 'should return true', function() {
            assert.equal( true, syllarhyme.rhymesWith( 'best', 'test' ) );
        });
    });
    describe( '#rhymesWith( "test", "failed" )', function() {
        it( 'should return false', function() {
            assert.equal( false, syllarhyme.rhymesWith( 'test', 'failed' ) );
        });
    });
    describe( '#rhymesWith( "test", "" )', function() {
        it( 'should return false', function() {
            assert.equal( false, syllarhyme.rhymesWith( 'test', '' ) );
        });
    });

    //syllables
    describe( '#syllables( "test" )', function() {
        it( 'should return 1', function() {
            assert.equal( 1, syllarhyme.syllables( 'test' ) );
        });
    });
    describe( '#syllables( "resplendent" )', function() {
        it( 'should return 3', function() {
            assert.equal( 3, syllarhyme.syllables( 'resplendent' ) );
        });
    });
    describe( '#syllables( "" )', function() {
        it( 'should return 0', function() {
            assert.equal( 0, syllarhyme.syllables( '' ) );
        });
    });

    //pronunciation
    describe( '#pronunciation( "test" )[0]', function() {
        it( 'should return "T EH1 S T"', function() {
            assert.equal( 'T EH1 S T', syllarhyme.pronunciation( 'test' )[0] );
        });
    });
    describe( '#pronunciation( "evaluation" )', function() {
        it( 'should return two pronunciations', function() {
            assert.equal( 2, syllarhyme.pronunciation( 'evaluation' ).length );
        });
    });
    describe( '#pronunciation( "testnonsense" )', function() {
        it( 'should return []', function() {
            assert.deepEqual( [], syllarhyme.pronunciation( 'testnonsense' ) );
        });
    });
    describe( '#pronunciation( "curious", "ipa" )[0]', function() {
        it( 'should return "k j ʊ r i ə s"', function() {
            assert.equal( 'k j ʊ r i ə s', syllarhyme.pronunciation( 'curious', 'ipa' )[0] );
        });
    });
});