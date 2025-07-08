import { TicTacToe } from "./TicTacToe";
import { Node, MCTS } from "./MCTS";

const board = new TicTacToe();
const root = new Node(board);
const [move, child] = MCTS(root, 1000);
console.log(
    `Best move: ${move}, ` + 
    `visits: ${child.visits}, ` + 
    `win_rate: ${(child.wins / child.visits).toFixed(2)}`
);