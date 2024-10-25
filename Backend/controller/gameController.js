const Game = require("../models/gameModel");
const isUniqueGrid = (grid) =>{
    const allNumber = grid.flat();
    const uniqueNumbers = new Set(allNumber);
    return uniqueNumbers.size === 9 && allNumber.every(num => num>= 1 && num<= 9);
};

const createGame = async (req, res)=>{
    const {user1Grid, user2Grid} = req.body;

    if(!isUniqueGrid(user1Grid) ||!isUniqueGrid(user2Grid)){
        return res.status(400).json({message:"Grids must contain unique numbers between 1 and 9"});
    }

    const newGame = new Game({user1Grid, user2Grid});
    await newGame.save();

    res.status(201).json(newGame);
};

const updateGame = async (req, res)=>{
    const {id} = req.params;
    const {user, number} = req.body;
    const game = await Game.findById(id);

    if(!game){
        return res.status(404).json({message:"Game not found"});
    }

    const grid = user === "user1" ? game.user1Grid : game.user2Grid;
    const cuts = user === "user1" ? game.user1cuts : game.user2Cuts;

    grid.forEach((row, rowIndex)=>{
        row.forEach((cell, cellIndex) => {
            if(cell===number) {
                cuts[rowIndex][cellIndex] = true;
            }
        })
    })

    game[user === 'user1' ? 'user1Cuts' : 'user2Cuts'] = cuts;
    await game.save();

    res.status(200).json(game);
};

const checkWinner = async (req, res) => {
    const {id} = req.params;
    const game = await Game.findById(id);

    if(!game){
        return res.status(404).json({message:"Game not found"});
    }

    const checkRowOrColumns = (cuts) =>{
        for(let i=0; i<3; i++) {
            if(cuts[i].every(Boolean) || cuts.map(row => row[i])) {
                return true;
            }
        }

        return false;
    };

    if(checkRowOrColumns(game.user1Cuts)) {
        game.winner = 'User 1'
    } else if(checkRowOrColumns(game.user2Cuts)) {
        game.winner = 'User 2'
    }

    if (game.winner) {
        await game.save();
    }

    res.status(200).json(game);
};


module.exports = {createGame, updateGame, checkWinner};