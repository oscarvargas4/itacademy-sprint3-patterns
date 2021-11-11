const Scoreboard = require('./scoreboard')

class Player {
    constructor(name) {
        this.name = name;
        Scoreboard.makeScore(this.name);
    }
}

module.exports = Player;