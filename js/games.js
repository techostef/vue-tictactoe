import { PLAYER_TURN } from "./enums/dataEnums.js"
import { trim } from "./helpers/stringHelper.js"
import { messagesGame } from "./messages/messageData.js"

var app = new Vue({
    el: '#app',
    data: {
        valueInput: 3,
        scale: 3,
        minScale: 3,
        winnerX: 0,
        winnerO: 0,
        arrScale: [],
        sizeItem: 0,
        hasWinner: false,
        turn: PLAYER_TURN.X
    },
    methods: {
        setScale() {
            if (!this.checkEmptySlot()) {
                if(!confirm(messagesGame.RESET_SCALE_CONFIRM)) {
                    return false
                }
            }
            this.setScaleWithoutConfirm()
        },
        setScaleWithoutConfirm () {
            if (this.scale < this.minScale) {
                alert(`${messagesGame.MINIMUN_SCALE} ${this.minScale}`)
                return false
            }
            this.valueInput = this.scale
            this.arrScale = []
            for(var i = 0;i < (this.scale); i++) {
                this.arrScale[i] = []
                for(var j = 0;j < (this.scale); j++) {
                    this.arrScale[i][j] = {
                        Own: null
                    }
                }
            }
            this.sizeItem = trim(parseFloat(98/ (this.scale)), 2)
        },
        setTurn (item) {
            if (item.Own) return false
            item.Own = this.turn
            if (this.turn === PLAYER_TURN.X) this.turn = PLAYER_TURN.O
            else this.turn = PLAYER_TURN.X
            this.checkWinnerPlayer()
        },
        isWinnerO () {
            this.winnerO++
            this.setEmptySlot()
            this.hasWinner = true
        },
        isWinnerX () {
            this.winnerX++
            this.setEmptySlot()
            this.hasWinner = true
        },
        checkEqualWinner (checkX, checkO) {
            if (checkX === parseInt(this.scale)) {
                return this.dispayWinner(PLAYER_TURN.X)
            } else if (checkO === parseInt(this.scale)) {
                return this.dispayWinner(PLAYER_TURN.O)
            }
        },
        checkWinnerPlayer () {
            const checkWhoWinner = (a) => {
                console.log('whowinner', a)
                if (a === PLAYER_TURN.O) {
                    this.isWinnerO()
                } else if (winner === PLAYER_TURN.X) {
                    this.isWinnerX()
                }
            }
            var winner = this.checkWinnerCol()
            checkWhoWinner(winner)
            winner = this.checkWinnerRow()
            checkWhoWinner(winner)
            winner = this.checkWinnerRightDiagonal()
            checkWhoWinner(winner)
            winner = this.checkWinnerLeftDiagonal()
            checkWhoWinner(winner)
            if (this.checkEmptySlot() && !this.hasWinner) {
                alert(messagesGame.DRAW)
                this.setEmptySlot()
            }
        },
        checkWinnerCol () {
            var checkX = 0
            var checkO = 0
            for (var i = 0; i < this.arrScale.length; i++) {
                checkX = 0
                checkO = 0
                for (var j = 0;j < this.arrScale[i].length; j++) {
                    if (this.arrScale[i][j].Own === PLAYER_TURN.X) {
                        checkX++
                    } else if (this.arrScale[i][j].Own === PLAYER_TURN.O) {
                        checkO++
                    }
                    console.log("checkO", checkO, checkX, this.arrScale, this.arrScale[i][j].Own)
                }
                if (this.checkEqualWinner(checkX, checkO))
                return this.checkEqualWinner(checkX, checkO)
            }
            return false
        },
        checkWinnerRow () {
            var checkX = 0
            var checkO = 0
            for (var i = 0; i < this.arrScale.length; i++) {
                checkX = 0
                checkO = 0
                for (var j = 0;j < this.arrScale[i].length; j++) {
                    if (this.arrScale[j][i].Own === PLAYER_TURN.X) {
                        checkX++
                    } else if (this.arrScale[j][i].Own === PLAYER_TURN.O) {
                        checkO++
                    }
                }
                if (this.checkEqualWinner(checkX, checkO))
                return this.checkEqualWinner(checkX, checkO)
            }
            return false
        },
        checkWinnerRightDiagonal () {
            var checkX = 0
            var checkO = 0
            for (var i = 0; i < this.arrScale.length; i++) {
                if(this.arrScale[i][this.scale-1-i].Own === PLAYER_TURN.X){
                    checkX++;
                } else if (this.arrScale[i][this.scale-1-i].Own === PLAYER_TURN.O) {
                    checkO++;
                }

            }
            if (this.checkEqualWinner(checkX, checkO))
            return this.checkEqualWinner(checkX, checkO)
        },
        dispayWinner(winner) {
            alert(`${winner} ${messagesGame.WINNING}`)
            return winner
        },
        checkWinnerLeftDiagonal () {
            var checkX = 0
            var checkO = 0
            for (var i = 0; i < this.arrScale.length; i++) {
                if(this.arrScale[i][i].Own === PLAYER_TURN.X){
                    checkX++;
                } else if (this.arrScale[i][i].Own === PLAYER_TURN.O) {
                    checkO++;
                }

            }
            if (this.checkEqualWinner(checkX, checkO))
            return this.checkEqualWinner(checkX, checkO)
        },
        setEmptySlot () {
            this.hasWinner = false
            for (var i = 0; i < this.arrScale.length; i++) {
                for (var j = 0;j < this.arrScale[i].length; j++) {
                    this.arrScale[i][j].Own = null
                }
            }
        },
        checkEmptySlot () {
            var check = 0
            for (var i = 0; i < this.arrScale.length; i++) {
                for (var j = 0;j < this.arrScale[i].length; j++) {
                    if (!this.arrScale[i][j].Own) check ++
                }
            }
            if ((this.arrScale.length * this.arrScale.length) === check) {
                return true
            } else if (check > 0) {
                return false
            }
            return true
        },
        restatGame () {
            if (confirm(messagesGame.RESTART_GAME)) {
                this.winnerO = 0
                this.winnerX = 0
                this.setScaleWithoutConfirm()
            }
        }
    }
})