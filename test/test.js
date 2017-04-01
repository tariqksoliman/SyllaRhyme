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
        it( 'should return two pronounciations', function() {
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
            assert.deepEqual( -1, syllarhyme.rhymes( 'test' ).indexOf( 'test' ) );
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

    //pronounciation
    describe( '#pronounciation( "test" )[0]', function() {
        it( 'should return "T EH1 S T"', function() {
            assert.equal( 'T EH1 S T', syllarhyme.pronounciation( 'test' )[0] );
        });
    });
    describe( '#pronounciation( "evaluation" )', function() {
        it( 'should return two pronounciations', function() {
            assert.equal( 2, syllarhyme.pronounciation( 'evaluation' ).length );
        });
    });
    describe( '#pronounciation( "testnonsense" )', function() {
        it( 'should return []', function() {
            assert.deepEqual( [], syllarhyme.pronounciation( 'testnonsense' ) );
        });
    });
});