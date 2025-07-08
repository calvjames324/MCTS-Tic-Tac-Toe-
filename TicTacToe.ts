export class TicTacToe {
    constructor(
        public state: Array<(-1 | 0 | 1)> = Array(9).fill(0),
        public turn: (-1 | 1) = -1
    ) {}

    public clone() : TicTacToe {
        return new TicTacToe([...this.state], this.turn);
    }

    public play(move: number) : void {
        this.state[move] = this.turn;
        this.turn = -this.turn as (-1 | 1);
    }

    public getLegalMoves() : number[] {
        return this.state
            .map((value, index) => ({ value, index }))
            .filter(({ value }) => value === 0)
            .map(({ index }) => index);
    }

    public isResult() :  (-1 | 1 | 0) | boolean{
        const wins = [
            [0, 1, 2],[3, 4, 5],[6, 7, 8],
            [0, 3, 6],[1, 4, 7],[2, 5, 8],
            [0, 4, 8],[2, 4, 6],
        ]
        for (const [a, b, c] of wins) {
            if (this.state[a] && this.state[a] === this.state[b] && this.state[b] === this.state[c]) {
                return this.state[a];
            }
        }
        return this.state.every(cell => cell !== 0) ? 0 : false;
    }

}