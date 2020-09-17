import React from 'react';
import './Players.css';
export class Players extends React.Component {
  constructor(props) {
    super(props);
    this.addPlayerOne = this.addPlayerOne.bind(this);
    this.addPlayerTwo = this.addPlayerTwo.bind(this);
    this.addPlayerOneName = this.addPlayerOneName.bind(this);
    this.addPlayerTwoName = this.addPlayerTwoName.bind(this);
  }

  addPlayerOne() {
    this.setState({
      playerOneScore: this.state.playerOneScore + 1
    });
  }

  addPlayerTwo() {
    this.setState({
      playerTwoScore: this.state.playerTwoScore + 1
    });
  }

  addPlayerOneName(name) {
    this.setState({
      playerOneName: name
    });
  }

  addPlayerTwoName(name) {
    this.setState({
      playerTwoName: name
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div className="player-container-top">
              <div className="player-name-container-top">
                <div>{this.props.data.playerOneName}</div>
              </div>
              <div className="player-score-container-top">
                <div>{this.props.data.playerOneScore}</div>
              </div>
            </div>
            <div className="player-container-bottom">
              <div className="player-name-container-bottom">
                <div>{this.props.data.playerTwoName}</div>
              </div>
              <div className="player-score-container-bottom">
                <div>{this.props.data.playerTwoScore}</div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Players;