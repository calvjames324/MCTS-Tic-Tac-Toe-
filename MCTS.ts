import { TicTacToe } from "./TicTacToe";

export class Node {
    constructor(public board : TicTacToe,
                public parent : Node | null = null, 
                public children : Map<number, Node> = new Map(),
                public visits : number = 0,
                public wins : number = 0){}

    public isFullyExpanded() : boolean {
        return this.children.size === this.board.getLegalMoves().length
    }

    private uctScore(child : Node, c = 1.414) : number {
        if (child.visits === 0) {
            return Infinity;
        }
        return ((child.wins / child.visits) + c * Math.sqrt(Math.log(this.visits) / child.visits));
    }

    public bestChild() {
        const children = Array.from(this.children.values())
        if (children.length === 0) {
            throw new Error("Node has no children");
        }
        return children.reduce((max, child) => 
            this.uctScore(child) > this.uctScore(max) ? child : max,
            children[0]
        );
    }

    public expand() : Node {
        const tried = Array.from(this.children.keys())
        const legalMoves = this.board.getLegalMoves()

        for (const move of legalMoves){
            if (!tried.includes(move)){
                const newBoard = this.board.clone()
                newBoard.play(move)
                const child = new Node(newBoard, this)
                this.children.set(move, child)
                return child 
            }
        }
        throw new Error("No legal moves to expand")
    }

    public simulate() : number {
        const sim = this.board.clone()
        while (sim.isResult() === false){
            const moves = sim.getLegalMoves()
            const randomMove = moves[Math.floor(Math.random() * moves.length)]
            sim.play(randomMove)
        }
        return sim.isResult() as (-1 | 1 | 0)
    }

    public backpropagate(result : number) : void {
        this.visits += 1
        this.wins += result
        if (this.parent){
            this.parent.backpropagate(result)
        }
    }
}

export function MCTS (root : Node, iterations : number) : [number, Node] {
    for (let i = 0; i < iterations; i++){
        let node = root

        while (node.isFullyExpanded() && node.children.size > 0){
            node = node.bestChild()
        }

        if (node.board.isResult() === false){
            node = node.expand()
        }
        const result = node.simulate()
        node.backpropagate(result)
    }

    let bestMove = -1
    let bestChild : Node | null = null
    let maxVisits = -1

    for (const [move, child] of root.children.entries()){
        if (child.visits > maxVisits){
            maxVisits = child.visits
            bestMove = move
            bestChild = child
        }
    }
    if (bestMove === -1 || !bestChild){
        throw new Error("No best moves found")
    }
    return [bestMove, bestChild]
}