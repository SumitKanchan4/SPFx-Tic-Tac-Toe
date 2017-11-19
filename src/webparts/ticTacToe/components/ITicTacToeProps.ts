export interface ITicTacToeProps {
  description: string;
}

export interface ITicTacToeState {
  board?: string[];
  playerSymbol?: string;
  computerSymbol?: string;
  startGame?: boolean;
  playerWonCount?: number;
  compWonCount?: number;
}