const router = require('express').Router();
const {createGame, updateGame, checkWinner} = require('../controller/gameController');

router.post('/', createGame);
router.put("/:id", updateGame);
router.get('/:id/check-winner', checkWinner);

module.exports = router;