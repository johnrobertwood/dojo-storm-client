import * as React from 'react';
import './Timer.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typeography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isRest: false,
      workTime: 120,
      restTime: 60,
      playerOneName: 'John',
      playerTwoName: 'Ramsey',
      playerOneScore: 0,
      playerTwoScore: 0
    };
    this.pauseTimer = this.pauseTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.addWorkMinute = this.addWorkMinute.bind(this);
    this.subtractWorkMinute = this.subtractWorkMinute.bind(this);
    this.addRestThirty = this.addRestThirty.bind(this);
    this.subtractRestThirty = this.subtractRestThirty.bind(this);
    this.addPlayerOne = this.addPlayerOne.bind(this);
    this.addPlayerTwo = this.addPlayerTwo.bind(this);
    this.handleNameOneChange = this.handleNameOneChange.bind(this);
    this.handleNameTwoChange = this.handleNameTwoChange.bind(this);
  }

  componentDidMount() {
    socket.on('mobile start', (data) => {
      this.startTimer(data);
    });

    socket.on('mobile reset', () => {
      this.resetTimer();
    });

    socket.on('mobile stop', () => {
      this.pauseTimer();
    });

    socket.on('mobile add p1 point', () => {
      this.addPlayerOne();
    });

    socket.on('mobile add p2 point', () => {
      this.addPlayerTwo();
    });

    socket.on('mobile add p1 name', (playerOneName) => {
      this.addPlayerOneName(playerOneName);
    });

    socket.on('mobile add p2 name', (playerTwoName) => {
      console.log('socket on p2', playerTwoName)
      this.addPlayerTwoName(playerTwoName);
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    let time = this.state.isRest ? this.state.restTime : this.state.workTime;
    this.setState({
      count: this.state.count + 1
    });
    if (time - this.state.count === 30 && this.state.isRest === false) {
      socket.emit('timer warning');
    }

    if (time - this.state.count === 10 && this.state.isRest === true) {
      socket.emit('timer warning');
    }

    if (time - this.state.count === 0) {

      if (this.state.isRest) {
        socket.emit('timer start');
        this.setState({
          count: 0,
          workTime: this.state.workTime
        });
      } else {
        socket.emit('timer end');
        this.setState({
          count: 0,
          restTime: this.state.restTime
        });
      }

      this.setState({
        isRest: !this.state.isRest
      });
    }
  }

  startTimer() {
    socket.emit('timer start');
    if (this.timerID === undefined || this.timerID === null) {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  }

  pauseTimer() {
    socket.emit('timer stop');
    clearInterval(this.timerID)
    this.timerID = null;
  }

  resetTimer() {
    socket.emit('timer reset')
    clearInterval(this.timerID);
    this.timerID = null;
    this.setState({
      count: 0
    });
  }

  addWorkMinute() {
    this.setState({
      workTime: this.state.workTime + 60
    });
  }

  subtractWorkMinute() {
    if (this.state.workTime > 60) {
      this.setState({
        workTime: this.state.workTime - 60
      });
    } else {
      clearInterval(this.timerID);
      this.setState({
        count: 0,
        workTime: 0
      });
    }
  }

  addRestThirty() {
    this.setState({
      restTime: this.state.restTime + 30
    });
  }

  subtractRestThirty() {
    if (this.state.restTime > 30) {
      this.setState({
        restTime: this.state.restTime - 30
      });
    } else {
      clearInterval(this.timerID);
      this.setState({
        restTime: this.state.restTime - 30
      });
    }
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

  handleNameOneChange(e) {
    this.setState({
      playerOneName: e.target.value
    });
  }

  handleNameTwoChange(e) {
    this.setState({
      playerTwoName: e.target.value
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
    let time = this.state.isRest ? this.state.restTime : this.state.workTime;
    const lessThanTen = parseInt((time - this.state.count) % 60) < 10;
    const lessThanZero = parseInt((time - this.state.count) % 60) < 0;
    let digits;
    if (lessThanZero) {
      digits = <Typeography variant="h2">{'00:00'}</Typeography>
    } else if (lessThanTen) {
      digits = <Typeography variant="h2">{'0' + parseInt((time - this.state.count) / 60)}:{'0' + parseInt((time - this.state.count) % 60)}</Typeography>
    } else {
      digits = <Typeography variant="h2">{'0' + parseInt((time - this.state.count) / 60)}:{parseInt((time - this.state.count) % 60)}</Typeography>
    }
    return (
      <Container maxWidth="sm">
        <Box my={2}>
          <Typeography variant="h4">Round Timer</Typeography>
          {digits}
        </Box>
        <Box>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button color="primary" onClick={this.startTimer}>Start</Button>
            <Button color="primary" onClick={this.pauseTimer}>Pause</Button>
            <Button color="primary" onClick={this.resetTimer}>Reset</Button>
          </ButtonGroup>
        </Box>
        <Box my={4}>
          <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
            <Button onClick={this.addWorkMinute}>+1 Min Work</Button>
            <Button onClick={this.subtractWorkMinute}>-1 Min Work</Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group">
            <Button onClick={this.addRestThirty}>+30 Sec Rest</Button>
            <Button onClick={this.subtractRestThirty}>-30 Sec Work</Button>
          </ButtonGroup>
        </Box>
        <Box>
          <Typeography variant="h4">{this.state.isRest ? "REST" : "WORK"}</Typeography>
        </Box>
        <Box>
          <Typeography>Work Time: {'0' + parseInt(this.state.workTime / 60)}:{'0' + parseInt(this.state.workTime % 60)}</Typeography>
          <Typeography>Rest Time: {'0' + parseInt(this.state.restTime / 60)}:{parseInt(this.state.restTime % 60) ? '30' : '00'}</Typeography>
        </Box>
        <Box>
          <Box>
            <Typeography variant="h4">{this.state.playerOneName}</Typeography>
            <Typeography variant="h5">{this.state.playerOneScore}</Typeography>
          </Box>
          <Box>
            <Typeography variant="h4">{this.state.playerTwoName}</Typeography>
            <Typeography variant="h5">{this.state.playerTwoScore}</Typeography>
          </Box>
        </Box>
        <Box>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button color="primary" onClick={this.addPlayerOne}>Player 1 Add Point</Button>
            <Button color="primary" onClick={this.addPlayerTwo}>Player 2 Add Point</Button>
          </ButtonGroup>
        </Box>
        <Box>
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Change P1 Name" onChange={this.handleNameOneChange} />
            <TextField id="standard-basic" label="Change P2 Name" onChange={this.handleNameTwoChange} />
          </form>
        </Box>
      </Container>
    );
  }
}

export default Timer;