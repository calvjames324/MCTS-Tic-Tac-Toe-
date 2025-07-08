# Monte Carlo Tree Search - Tic-Tac-Toe

This project implements the Monte Carlo Tree Search (MCTS) algorithm for playing Tic-Tac-Toe.

For more information refer to the blog below:
https://int8.io/monte-carlo-tree-search-beginners-guide/

## Project Structure

- `TicTacToe.ts` - Implementation of the Tic-Tac-Toe game logic
- `MCTS.ts` - Implementation of the Monte Carlo Tree Search algorithm
- `example.ts` - Example usage of the MCTS algorithm playing Tic-Tac-Toe

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Run the example:
```bash
npm start
```

## How It Works

The MCTS algorithm consists of four main steps:

1. **Selection**: Starting from the root node, select successive child nodes down to a leaf node using the UCT (Upper Confidence Bound for Trees) formula.

2. **Expansion**: If the leaf node is not terminal and has unvisited children, create a new child node.

3. **Simulation**: From the new node, simulate a random game until reaching a terminal state.

4. **Backpropagation**: Update the statistics (visits and wins) for all nodes in the path from the new node back to the root.

## Example Usage

```typescript
import { TicTacToe } from "./TicTacToe";
import { Node, mcts } from "./MCTS";

// Create a new game
const board = new TicTacToe();
const root = new Node(board);

// Run MCTS to find the best move
const [move, child] = mcts(root, 1000);  // 1000 iterations
console.log(`Best move: ${move}, visits: ${child.visits}, win_rate: ${child.wins/child.visits}`);
```
