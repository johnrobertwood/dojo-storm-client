import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typeography from '@material-ui/core/Typography';

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
      <Container maxWidth="sm">
        <Grid container direction="row">
          <Box border={1} width="100%">
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Box p={3}>
                <Typeography variant="h4">{this.props.data.playerOneName}</Typeography>
              </Box>
              <Box borderLeft={1} p={3}>
                <Typeography variant="h4">{this.props.data.playerOneScore}</Typeography>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <Grid container direction="row">
          <Box border={1} width="100%">
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Box p={3}>
                <Typeography variant="h4">{this.props.data.playerTwoName}</Typeography>
              </Box>
              <Box borderLeft={1} p={3}>
                <Typeography variant="h4">{this.props.data.playerTwoScore}</Typeography>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Container>
    );
  }
}

export default Players;