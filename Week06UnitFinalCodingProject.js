// Week 6 Unit Final Coding Project: War Game

// Card Class

class Card { //Card class with 3 arguements using "this." to reference current instance of the arguements when new class object is created.
    constructor(rank, suit, value) {
        this.rank = rank
        this.suit = suit
        this.value = value
    }
}

//Deck Class

class Deck { // Deck class
    constructor() {
        this.cards = []  //Constructor with an empty array to store our cards after they have been populated and shuffed.
    }

    _populate() {  //_populate() method as suggest by instructor Frank to populate our deck.
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];  //define ranks with Ace as lowest
        const suits = ['Diamonds', 'Hearts', 'Clubs', 'Spades']; //Define suits as strings since I couldn't get the unicode shapes to work
        
        for (const suit of suits) {  //for loop to iterate through our suits.
            for (let i = 0; i < ranks.length; i++) { //second for loop nested in the suits loop to create ranks and values for each suit.
                const rank = ranks[i]; // assigning value to rank variable based on the loop counter "i".               
                const value = i + 1; // assigning numerical value by adding 1 to ranks counter since Ace is at 0 index
                this.cards.push(new Card(rank, suit, value)); //add card object to the this.cards array each loop.
            }
        }
    }

    _shuffle() { //shuffle method as suggest by Frank (Honestly not sure if these need to be _private since I used them in the dealer class below).
        for(let i = this.cards.length - 1; i > 0; i--) {  //for loop to subtract through our cards accessing the end of our array with length -1.
            const j = Math.floor(Math.random() * (i + 1));  //  Fisher-Yates shuffle.  Math.random to generate random number, math.floor to round it to nearest integer. i+1 to enture # is inclusive of i(for more unbias suffle).
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // achieve true random with flipping with fish-yates method ref https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
        }
    }

    buildDeck() {  //Method to build the deck using our populate and shuffle methods.
        this._populate();  //populate the deck
        this._shuffle();  //shuffle the deck
        return this.cards;  //returning the populated and shuffed cards array
    }

}


//Player Class

class Player {  //Player class
    constructor(name) {  // One argument of name
        this.name = name  // this.name to refer to current instance of name
        this.cards = [];  // empty array to hold delt cards. Initially I tried to pass card and score as arguments, but since they are the same in every instance of player class, they can just be defined within the class.
        this.score = 0    // value to hold player score starting at 0.
    }
}

//Dealer Class

class Dealer {  // dealer class
    constructor() {  // constructor method that creates new deck and two players when dealer class is instantiated. 
        this.deck = new Deck();  // new deck object created using the deck class
        this.players = [new Player('Player 1'), new Player('Player 2')];  // two new player objects created using player class
    }

    dealCards() {  // deal cards method to populate our player's hands with cards
        this.deck.buildDeck();  // invoke build deck method to populate our new deck object. 
        this.deck._shuffle();  // invoke the _shuffle method to shuffle our populated new deck object.
        for (let i = 0; i < 26; i++) {  // for loop to cycle through only 26 times since we are dealing two cards at a time to the players.  Initally I tried using two loops, one for each player or a loop that went 52 times but found this method to be simpler.
            this.players[0].cards.push(this.deck.cards.pop()); // pushing top card from the deck to player 1 hand while at the same time removing card from the deck
            this.players[1].cards.push(this.deck.cards.pop());  // pushing top card from the deck to player 2 hand.
        }
    }

    playTurn() {  // playturn method to compare cards between players 1 and 2.
        const card1 = this.players[0].cards.pop();  // create new variable to hold the removed card from the players cards array.
        const card2 = this.players[1].cards.pop();

        console.log("Player 1 Card:", card1);
        console.log("Player 2 Card:", card2);

        if (card1.value > card2.value) {  // if/else statement to compare the values of each player's played card.
            this.players[0].score += 1;  // adding 1 to player 1 score if their card is higher
        } else if (card1.value < card2.value) {  // else statement incase player 1 card value is less than player two card value
            this.players[1].score += 1;  // adding 1 to player 2 score if player 1 card is lower value than player two card
        }

        console.log("Player 1 Score:", this.players[0].score);
        console.log("Player 2 Score:", this.players[1].score);
        
    }

    playGame() {  // Play game method to iterate through multiple turns after cards are dealt and declare a winner.
        this.dealCards(); // deal cards to players 1 and 2 from 52 card deck
        let numOfRounds = 26 // new variable to hold number of rounds to be played
        for (let i = 0; i < numOfRounds; i++) {  // for loop iterate through play turn 26 times
            this.playTurn();
        }

        if (this.players[0].score > this.players[1].score) {  // if statement to console log Player 1 as the winner with their score if player 1 score was higher
            console.log(`Player 1 is the winner with a score of ${this.players[0].score}`)  // Template literal to console log the winner with dynamic score
        } else if (this.players[0].score < this.players[1].score) {  // else if statement to console log Player 2 as the winner with their score.
            console.log(`Player 2 is the winner with a score of ${this.players[1].score}`)
        } else {  // else statement to log no winner in case of a tie with the tie score displayed
            console.log(`There is no winner due to a tie score of ${this.players[0].score}`)
        }
    }

}

let dealer = new Dealer();  // instantiate new dealer object from the dealer class
dealer.playGame();  // call the play game method from the dealer class to run the game






