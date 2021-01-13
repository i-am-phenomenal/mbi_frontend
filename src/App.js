import logo from './logo.svg';
import './App.css';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
    
const styles = theme => ({
  root: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: "your_clients",
      authTokenUrl: "",
    };
  }

  renderSignUpForm = () => {
    const {classes} = this.props;
    return (
      "asldasd"
    //   <FormControl>
    //       <InputLabel htmlFor="my-input">Email address</InputLabel>
    //       <Input id="my-input" aria-describedby="my-helper-text" />
    //       <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
    // </FormControl>
    )
  }
 

  renderModal = () => {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          {this.renderSignUpForm()}
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
    )
  }

  render() {
    return (
      <div> 
        {this.renderModal()}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
