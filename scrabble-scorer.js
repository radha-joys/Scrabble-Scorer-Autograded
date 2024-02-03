// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelArray = ['a', 'e', 'i', 'o', 'u'];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function transform(oldPointStructure) {
   let newStructure = {};
   for(item in oldPointStructure){
      for(let i = 0; i < oldPointStructure[item].length; i++){
         newStructure[oldPointStructure[item][i].toLowerCase()] = Number(item);
      }
   }
   return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   //let wordEntered = input.question('Enter a word: ');
   //console.log(oldScrabbleScorer(wordEntered));
};

let simpleScorer = (word) => word.length;

//TODO: need to review about some, every functions
let vowelBonusScorer = (word) => {
   let score = word.toLowerCase().split("").reduce((acc, letter) => vowelArray.includes(letter) ? acc + 3 : acc + 1 , 0);
   return score;
};

let scrabbleScorer = (word) => {
   let wordArray = word.toLowerCase().split("");
   let letterScore = 0;
   wordArray.forEach(element => {
      letterScore += newPointStructure[element];
   });
   return letterScore;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer,
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer,
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer,
   }
];

function scorerPrompt() {
   //console.log("Enter a word to score: ");
   let inputWord = input.question('Enter a word: ');
   if(!inputWord.toLowerCase().split("").every(element => Object.keys(newPointStructure).includes(element)) || inputWord === "" || inputWord === undefined){
      console.log('Please include only alphabets, no special characters or numbers allowed');
   }
   else{
      console.log("Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n");
      let scoringAlgoNo = input.question("Enter 0, 1, or 2: ");
      const validInputs = ["0", "1", "2"];
      if(!validInputs.includes(scoringAlgoNo)){
         console.log("You must select 0,1 or 2. Please try again")
      }
      else{
         console.log(`Score for '${inputWord}': ${scoringAlgorithms[scoringAlgoNo].scorerFunction(inputWord)}`);
      }
   }
}

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};