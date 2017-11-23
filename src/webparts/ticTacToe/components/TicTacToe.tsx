import * as React from 'react';
import styles from './TicTacToe.module.scss';
import { ITicTacToeProps, ITicTacToeState } from './ITicTacToeProps';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class TicTacToe extends React.Component<ITicTacToeProps, ITicTacToeState> {

  private storageKey: string = this.props.userName;

  private winConditions: any[] = [[0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
  private playerSymbol: string = 'X';
  private computerSymbol: string = 'O';

  constructor(props: ITicTacToeProps) {
    super(props);
    this.state = {
      board: [],
      startGame: false,
      compWonCount: 0,
      playerWonCount: 0,
      totalCount: 0,
      gameFinish: false
    };
  }

  public render(): React.ReactElement<ITicTacToeProps> {
    return (
      <div className={styles.ticTacToe}>
        <div className={styles.container}>
          <div className={`ms-Grid`}>

            {/* Header */}
            <div className={`ms-Grid-row`}>
              <div className={`ms-Grid-col ms-sm12 ms-md10`}>
                <h1>Tic Tac Toe</h1>
              </div>
              <div className={`ms-Grid-col ms-md2 ms-hiddenSm`}>
                <h3>
                  <Link onClick={() => this.clearUserContext()} className={`${styles.floatRt}`}>
                    <i className={`ms-Icon ms-Icon--EraseTool ${styles.colorPink} ${styles.rewardPad}`} aria-hidden="true"></i>
                  </Link>
                </h3>
              </div>
            </div>

            {/* Game Stats Row */}
            <div className={`ms-Grid-row`}>
              <div className={`ms-Grid-col ms-md4 ms-sm12`}>
                <strong>Total</strong>
                <i className={`ms-Icon ms-Icon--Trophy2Solid ${styles.colorGold} ${styles.rewardPad}`} aria-hidden="true"></i> : {this.state.totalCount}
              </div>
              <div className={`ms-Grid-col ms-md3 ms-sm12`}>
                <strong>You</strong>
                <i className={`ms-Icon ms-Icon--Trophy2Solid ${styles.colorRed} ${styles.rewardPad}`} aria-hidden="true"></i> : {this.state.playerWonCount}
              </div>
              <div className={`ms-Grid-col ms-md5 ms-sm12`}>
                <strong>Comp</strong>
                <i className={`ms-Icon ms-Icon--Trophy2Solid ${styles.colorBlue} ${styles.rewardPad}`} aria-hidden="true"></i> : {this.state.compWonCount}
              </div>
            </div>

            {/* Start Game */}
            <div className={`ms-Grid-row`}>
              {
                !this.state.startGame ?
                  <div className={`ms-Grid-col ms-smPush4 ms-sm4`}>
                    <h3>
                      <PrimaryButton onClick={() => this.startGame()}>Play Game</PrimaryButton>
                    </h3>
                  </div>
                  :
                  <div className={`ms-Grid-col ms-sm12`}>
                  </div>
              }
            </div>

            {/* Game End / Continue Playing */}
            {
              this.state.gameFinish ?
                <div className={`ms-Grid-row`}>
                  <div className={`ms-Grid-col ms-sm4`}>
                    <h3>
                      <PrimaryButton onClick={() => this.playAgain()}>Play Again</PrimaryButton>
                    </h3>
                  </div>
                  <div className={`ms-Grid-col ms-sm4`}>
                    <h3>
                      <PrimaryButton onClick={() => this.cancelPlay()}>Cancel</PrimaryButton>
                    </h3>
                  </div>
                </div>
                :
                <div className={`ms-Grid-row`}>
                  <div className={`ms-Grid-col ms-sm12`}>
                  </div>
                </div>
            }


            {
              this.state.startGame ?
                <div className={`ms-Grid-row ${styles.padGrid}`}>
                  <div className={`ms-Grid`}>
                    <div className={`ms-Grid-row`}>
                      <div className={`ms-Grid-col ms-sm12`}>
                        <div className={`ms-Grid-row`}>
                          <div className={`ms-Grid-col ms-sm12`}>
                            <Link onClick={() => this.refreshGame()} className={styles.floatRt}>
                              <strong><i className={`ms-Icon ms-Icon--Refresh ${styles.colorGreen} ${styles.txtBold}`} aria-hidden="true"></i></strong>
                            </Link>
                          </div>
                        </div>
                        <div className={`ms-Grid-row`}>
                          {this.cellTemplate(0)}
                          {this.cellTemplate(1)}
                          {this.cellTemplate(2)}
                        </div>
                        <div className={`ms-Grid-row`}>
                          {this.cellTemplate(3)}
                          {this.cellTemplate(4)}
                          {this.cellTemplate(5)}
                        </div>
                        <div className={`ms-Grid-row`}>
                          {this.cellTemplate(6)}
                          {this.cellTemplate(7)}
                          {this.cellTemplate(8)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div></div>
            }
          </div>
        </div>
      </div>
    );
  }

  private cellTemplate(cellID: number): any {
    return (
      <div className={`ms-Grid-col ${styles.colorBlue} ${cellID <= 5 ? styles.borderBottom : ``} ${cellID % 3 != 0 ? styles.borderLeft : ``} ms-sm4`}>
        {
          this.state.board[cellID] == undefined ?
            <Link className={`${styles.emptyCell}`} onClick={() => this.cellClicked(cellID)}></Link>
            :
            <Label className={`${styles.filledCell} ${this.state.board[cellID] == 'X' ? styles.colorRed : styles.colorBlue}`}>{this.state.board[cellID]}</Label>
        }
      </div>
    );
  }

  public componentDidMount(): void {

    this.getUserContext();
    this.createBoard();
  }

  private startGame(): void {
    this.createBoard();
    this.setState({ startGame: true, gameFinish: false });
  }

  /**
   * Creates the board
   */
  private createBoard(): void {

    let tempBoard: string[] = [];
    for (let i = 0; i < 9; i++) {
      tempBoard[i] = undefined;
    }
    this.setState({ board: tempBoard });
  }

  /**
   * Refreshes the game
   * if there is any input then user will loose
   */
  private refreshGame(): void {

    //1. Check if there is any cell with filled value
    this.state.board.forEach(element => {

      if (element != undefined) {
        //2. Increase the total game count
        //3. Increase the computer win count
        this.setState({ compWonCount: this.state.compWonCount + 1, totalCount: this.state.totalCount + 1 });

        //4. Reset the board
        this.createBoard();
      }
    });
  }

  private cellClicked(id: number): void {
    let tempBoard: string[] = this.state.board;
    tempBoard[id] = this.playerSymbol;
    this.setState({ board: tempBoard }, () => {
      this.getComputerMove();
    });
  }

  /**
   * Checks if there are any more spaces to move
   */
  private possibleMoves(): number[] {

    let count: number = 0;
    let canMove: number[] = [];

    while (count <= 8) {
      if (this.state.board[count] == undefined) {
        canMove.push(count);
      }
      count += 1;
    }

    return canMove;

  }

  /**
   * Checks if the game is won by the letter
   * @param letter 
   */
  private isWin(letter: string): boolean {

    let won: boolean = false;
    let index: number = 0;

    while (!won && index < this.winConditions.length) {

      let winCondItem: number[] = this.winConditions[index];
      let bor: string[] = this.state.board;

      // Check if won
      if (bor[winCondItem[0]] == letter && bor[winCondItem[1]] == letter && bor[winCondItem[2]] == letter) {
        won = true;
      }
      index++;
    }

    return won;
  }


  private getNextMove(letter: string): number {

    let nextWinMove: number = undefined;
    let winCondLength: number = this.winConditions.length;
    let index: number = 0;
    let possibleMoves: number[] = this.possibleMoves();
    let opposite: string = letter == this.playerSymbol ? this.computerSymbol : this.playerSymbol;

    while (nextWinMove == undefined && index < winCondLength) {

      let winCondItem: number[] = this.winConditions[index];
      let bor: string[] = this.state.board;

      // check for next move win
      if (bor[winCondItem[0]] == letter && bor[winCondItem[1]] == letter && bor[winCondItem[2]] != opposite) {
        nextWinMove = winCondItem[2];
      }
      else if (bor[winCondItem[1]] == letter && bor[winCondItem[2]] == letter && bor[winCondItem[0]] != opposite) {
        nextWinMove = winCondItem[0];
      }
      else if (bor[winCondItem[0]] == letter && bor[winCondItem[2]] == letter && bor[winCondItem[1]] != opposite) {
        nextWinMove = winCondItem[1];
      }
      index++;
    }

    return possibleMoves.indexOf(nextWinMove) >= 0 ? nextWinMove : undefined;

  }


  private getComputerMove(): void {

    // Check if user won
    let userWon: any = this.isWin(this.playerSymbol);
    console.log(`User Won:${userWon}`);

    if (userWon) {
      this.setState({ gameFinish: true, playerWonCount: this.state.playerWonCount + 1, totalCount: this.state.totalCount + 1 });
      this.setUserContext({ total: this.state.totalCount, player: this.state.playerWonCount, computer: this.state.compWonCount });
      alert('user won');

    }
    else {
      let nextMove: number = undefined;

      // Check if comp can win in next move
      nextMove = this.getNextMove(this.computerSymbol);
      console.log(`Next Move for comuter to win: ${nextMove}`);

      // Check if the player can move in the next win , block it
      if (nextMove == undefined) {
        nextMove = this.getNextMove(this.playerSymbol);
        console.log(`Next Move for user to win: ${nextMove}`);
      }

      // Try to get any corner or the center
      if (nextMove == undefined) {
        let moves: number[] = [0, 2, 4, 6, 8];

        // loop over all moves and get the random move
        while (nextMove == undefined && moves.length > 0) {
          // get the random number
          let randomIndex: number = Math.round(Math.random() * 10);

          // get the random index within the array range
          randomIndex = randomIndex % moves.length;

          // check if the move is valid
          nextMove = this.state.board[moves[randomIndex]] == undefined ? moves[randomIndex] : undefined;

          // remove the element from the moves array 
          moves.splice(randomIndex, 1);
        }
        console.log(`Moving to corner: ${nextMove}`);
      }

      // make one of the possible moves
      if (nextMove == undefined) {
        let possibleMoves: number[] = this.possibleMoves();
        while (nextMove == undefined && possibleMoves.length > 0) {
          let move = Math.round(Math.random() * 10) % possibleMoves.length;
          nextMove = possibleMoves[move];          
        }        
        console.log(`Final Possible move: ${nextMove}`);
      }

      if (nextMove != undefined) {
        let boardTemp = this.state.board;
        boardTemp[nextMove] = this.computerSymbol;
        this.setState({ board: boardTemp }, () => {

          // Check if the computer wins with the next move
          if (this.isWin(this.computerSymbol)) {
            this.setState({ gameFinish: true, totalCount: this.state.totalCount + 1, compWonCount: this.state.compWonCount + 1 });
            this.setUserContext({ total: this.state.totalCount, player: this.state.playerWonCount, computer: this.state.compWonCount });
            alert('computer won');
          }
        });
      }
      else {
        // Draw the game
        this.setState({ gameFinish: true, totalCount: this.state.totalCount + 1 });
        this.setUserContext({ total: this.state.totalCount, player: this.state.playerWonCount, computer: this.state.compWonCount });
      }
    }
  }

  /**
   * Clears the user context from local storage
   */
  private clearUserContext(): void {

    if (this.getStorage) {
      this.getStorage.removeItem(this.storageKey);
    }
  }

  /**
   * Sets the user context in the local storage
   * @param object Object that contains the user context
   */
  private setUserContext(object: any): void {

    if (this.getStorage) {
      this.getStorage.setItem(this.storageKey, JSON.stringify(object));
    }
  }

  /**
   * Returns the user context from the local storage
   * */
  private getUserContext(): void {

    if (this.getStorage) {
      let savedValues: any = JSON.parse(this.getStorage.getItem(this.storageKey));

      if (savedValues != undefined) {
        this.setState({ totalCount: savedValues.total, playerWonCount: savedValues.player, compWonCount: savedValues.computer });
      }
    }
  }

  private get getStorage(): Storage {

    if (typeof (Storage) != undefined) {
      return localStorage;
    }
    else {
      return undefined;
    }
  }

  private playAgain(): void {
    this.createBoard();
    this.setState({ gameFinish: false });

  }

  private cancelPlay(): void {
    this.setState({ startGame: false, gameFinish: false });
  }
}

