class Scoreboard {
    constructor() {
        this.scores = [];
    }

    get count() {
        return this.scores.length;
    }

    makeScore(name) {
        const score = Math.random() * (100+100) - 100;
        this.scores.push({ "name": name, "score": score })
    }
}

// Ensure that a class has just a single instance
// Provide a global access point to that instance
module.exports = new Scoreboard()