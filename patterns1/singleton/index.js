const Scoreboard = require("./scoreboard");
const Player = require("./players");

// Round 1
console.log("Round 1 Init");
let playerOneRound1 = new Player("Oscar");
let playerTwoRound1 = new Player("Mario");
let playerThreeRound1 = new Player("Cristina");

// Round 2
console.log("Round 2 Init");
let playerOneRound2 = new Player("Oscar");
let playerTwoRound2 = new Player("Mario");
let playerThreeRound2 = new Player("Cristina");

// Round 3
console.log("Round 3 Init");
let playerOneRound3 = new Player("Oscar");
let playerTwoRound3 = new Player("Mario");
let playerThreeRound3 = new Player("Cristina");

// Provide a global access point to that instance
console.log("Total Scores along the 3 rounds:", Scoreboard.scores);
console.log("Scores count:", Scoreboard.count);

// With this code, we confirm that the class "Scoreboard" cannot be instancied multiple times
// const newScoreboard = new Scoreboard();

// Summarizing game results along the 3 rounds
const obj = Scoreboard.scores;

const holder = {};

obj.forEach(function (player) {
  if (holder.hasOwnProperty(player.name)) {
    holder[player.name] = holder[player.name] + player.score;
  } else {
    holder[player.name] = player.score;
  }
});

const obj2 = [];

for (const property in holder) {
  obj2.push({ name: property, score: holder[property] });
}

console.log("Final score:", obj2);

// Deciding the winner
const winner = { name: "", score: -100 };

obj2.forEach(function (player) {
  if (winner.score < player.score) {
    winner.name = player.name;
    winner.score = player.score;
  }
});

console.log("Game Winner: ", winner);
