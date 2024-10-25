const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    user1Grid: {
        type: [[Number]],
        required: true,
        validate : {
            validator: function (grid) {
                const allNumbers = grid.flat();
                const uniqueNumbers = new Set(allNumbers);
                return uniqueNumbers.size === 9 && allNumbers.every(num => num>= 1 && num<= 9);
            },
            message: "Grids must contain unique numbers between 1 and 9"
        }
    },
    user2Grid: {
        type: [[Number]],
        required: true,
        validate : {
            validator: function (grid) {
                const allNumbers = grid.flat();
                const uniqueNumbers = new Set(allNumbers);
                return uniqueNumbers.size === 9 && allNumbers.every(num => num>= 1 && num<= 9);
            },
            message: "Grids must contain unique numbers between 1 and 9"
        }
    },

    user1Cuts: {
        type: [[Boolean]],
        default: Array(3).fill(Array(3).fill(false))
    },
    user2Cuts: {
        type: [[Boolean]],
        default: Array(3).fill(Array(3).fill(false))
    },

    winner: {
        type: String,
        default: null
    }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;