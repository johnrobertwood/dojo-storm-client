import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typeography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export class Timer extends React.Component {

  render() {
    return (
      <Container>
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
    )
  }

}

export default Timer;