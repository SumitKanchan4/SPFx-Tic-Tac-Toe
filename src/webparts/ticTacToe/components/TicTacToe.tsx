import * as React from 'react';
import styles from './TicTacToe.module.scss';
import { ITicTacToeProps, ITicTacToeState } from './ITicTacToeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Link } from 'office-ui-fabric-react/lib/Link';

export default class TicTacToe extends React.Component<ITicTacToeProps, ITicTacToeState> {

  constructor(props: ITicTacToeProps) {
    super(props);
    this.state = {
      board: [],
      playerSymbol: undefined,
      computerSymbol: undefined,
      startGame: false,
      compWonCount: 0,
      playerWonCount: 0
    };
  }

  public render(): React.ReactElement<ITicTacToeProps> {
    return (
      <div className={styles.ticTacToe}>
        <div className={styles.container}>
          <div className={`ms-Grid`}>
            <div className={`ms-Grid-row`}>
              <div className={`ms-Grid-col ms-sm12`}>
                <h1>Tic Tac Toe</h1>
              </div>
            </div>
            <div className={`ms-Grid-row`}>
              <div className={`ms-Grid-col ms-md3 ms-sm12`}>
                <strong>Total</strong>
                <i className={`ms-Icon ms-Icon--Trophy2Solid ${styles.colorGold} ${styles.rewardPad}`} aria-hidden="true"></i> : 0
              </div>
              <div className={`ms-Grid-col ms-md3 ms-sm12`}>
                <strong>You</strong>
                <i className={`ms-Icon ms-Icon--Trophy2Solid ${styles.colorRed} ${styles.rewardPad}`} aria-hidden="true"></i> : 0
              </div>
              <div className={`ms-Grid-col ms-md3 ms-sm12`}>
                <strong>Comp</strong>
                <i className={`ms-Icon ms-Icon--Trophy2Solid ${styles.colorBlue} ${styles.rewardPad}`} aria-hidden="true"></i> : 0
              </div>
            </div>
            <div className={`ms-Grid-row`}>
              {
                !this.state.startGame ?
                  <div className={`ms-Grid-col ms-sm12`}>
                    <h3>
                      <Link onClick={() => this.startGame()}>Click here to start the game</Link>
                    </h3>
                  </div>
                  :
                  <div className={`ms-Grid-col ms-sm12`}>
                  </div>
              }
            </div>
            {
              this.state.startGame ?
                <div className={`ms-Grid-row ${styles.padGrid}`}>
                  <div className={`ms-Grid`}>
                    <div className={`ms-Grid-col ms-sm12`}>
                      <div className={`ms-Grid-row`}>
                        <div className={`ms-Grid-col ms-sm1 ms-smPush10`}>
                          <Link>
                            <i className={`ms-Icon ms-Icon--Refresh`} aria-hidden="true"></i>
                          </Link>
                        </div>
                      </div>
                      <div className={`ms-Grid-row`}>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorBlue} ${styles.borderBottom} ${styles.borderRight} ms-sm4`}>
                          1
                        </div>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorRed} ${styles.borderBottom} ${styles.borderRight} ms-sm4`}>
                          2
                        </div>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorBlue} ${styles.borderBottom} ms-sm4`}>
                          3
                        </div>
                      </div>
                      <div className={`ms-Grid-row`}>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorRed} ${styles.borderBottom} ${styles.borderRight} ms-sm4`}>
                          4
                        </div>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorBlue} ${styles.borderBottom} ${styles.borderRight} ms-sm4`}>
                          5
                        </div>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorRed} ${styles.borderBottom} ms-sm4`}>
                          6
                        </div>
                      </div>
                      <div className={`ms-Grid-row`}>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorBlue} ${styles.borderRight} ms-sm4`}>
                          7
                        </div>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorRed} ${styles.borderRight} ms-sm4`}>
                          8
                        </div>
                        <div className={`ms-Grid-col ${styles.textCenter} ${styles.colorBlue} ms-sm4`}>
                          9
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

  private startGame(): void {
    this.setState({ startGame: true });
  }

  /**
   * Creates the board
   */
  private createBoard(): void {

    let board: string[] = [];
    for (let i = 0; i <= 9; i++) {
      board[i] = undefined;
    }
  }

  private refreshGame(): void {

    //1. Increase the total game count
    //2. Increase the user lose count
    //3. Increase the computer win count
    //4. Reset the board
  }

}

