//Test

var expect = chai.expect  // import chai.expect method


describe('Dealer', function(){  //Mocha describe method with description and callback function
    describe('playTurn()', function(){ // nested describe method to establish hierarchy
        it('should update the player score based on which player played the higher card', function(){ //Mocha it method with description and callback function
            const dealer = new Dealer();  // instantiating new Dealer class for our test; sourced from our main .js file that was loaded with our test.html scripts
            dealer.players[0].cards = [{value: 8}];  //setting the value of Player 1 card
            dealer.players[1].cards = [{value: 1}];  //setting the value of player 2 card

            dealer.playTurn();  //invoking the playTurn method within our dealer object

            expect(dealer.players[0].score).to.equal(1);  //expecting player 1 score to equal 1 since their card has a higher value
            expect(dealer.players[1].score).to.equal(0);  //expecting player 2 score to equal 0 since their card had a lower value
        });

        it('should throw an error if value is not a number', function(){  //new it method for when a card value is not a number
            const dealer = new Dealer();  // new dealer instance
            expect(dealer.playTurn).to.throw(Error);  // expecting an error since there are no players
        });

    });
});