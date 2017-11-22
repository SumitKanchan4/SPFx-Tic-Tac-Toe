export interface ITicTacToeProps {
  userName: string;
}

export interface ITicTacToeState {
  board?: string[];
  startGame?: boolean;
  playerWonCount?: number;
  compWonCount?: number;
  totalCount?: number;
  gameFinish?: boolean;
}