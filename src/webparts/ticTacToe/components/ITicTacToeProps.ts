export interface ITicTacToeProps {
  userName:string;
}

export interface ITicTacToeState {
  board?: string[];
  playerSymbol?: string;
  computerSymbol?: string;
  startGame?: boolean;
  playerWonCount?: number;
  compWonCount?: number;
  totalCount?:number;
  openDialog?:boolean;
}