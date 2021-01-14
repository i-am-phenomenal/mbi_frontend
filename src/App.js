import logo from './logo.svg';
import './App.css';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Nav from 'react-bootstrap/Nav'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
    
const styles = theme => ({
  root: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  textField: {
    width: '20ch',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "signUp",
    };
  }
  

  handleChange = (newValue) => {
    this.setState(
      {
        selectedTab: newValue
      }
    );
  };

  renderSignUpForm = () => {
    const classes = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "50%",
          marginLeft: "25%",
          padding: "-5%"
        }}
      >
        <TextField
          id="first_name"
          label="First Name"
          style={{ margin: 8 }}
          placeholder="Enter your First Name"
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
          
          <TextField
            id="last_name"
            label="Last Name"
            style={{ margin: 8 }}
            placeholder="Enter your Last Name"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />  

          <TextField
            id="email_id"
            label="Email Id"
            style={{ margin: 8 }}
            placeholder="Enter your Email Id"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />    

          <TextField
            id="password"
            label="Password"
            style={{ margin: 8 }}
            placeholder="Enter your Password"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />    
          
          <TextField
            style = {{width: "100%"}}
            id="address"
            label="Address"
            multiline
            rows={4}
            defaultValue="Enter address"
            variant="filled"
         />

          <TextField
            id="date_of_birth"
            label="Date Of Birth"
            style={{ margin: 8 }}
            placeholder="Enter your Date of birth (DD/MM/YYYY)"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

          <TextField
            id="company"
            label="Company"
            style={{ margin: 8 }}
            placeholder="Enter your Company"
            helperText=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
    )
  }

  renderLoginForm = () => {
    return <p> lili</p>
  }

  renderView = () => {
    let selectedTab = this.state.selectedTab;
    switch (selectedTab) {
      case "signUp":
        return ( <div> {this.renderSignUpForm()} </div>)
        break;

      case "login": 
        return (<div> {this.renderLoginForm()} </div>)
        break;

      default: 
        return ("")
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
          <Nav variant="tabs" >
              <Nav.Item>
                <Nav.Link eventKey ="sign_up" onClick={() => this.handleChange("signUp")} >Sign Up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="login" onClick={() => this.handleChange("login")}> Login </Nav.Link>
              </Nav.Item>
          </Nav>
      {this.renderView()}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
