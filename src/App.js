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
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import {createBrowserHistory} from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect 
} from "react-router-dom";
import { createBrowserHistory } from 'history'
import Dashboard from './Components/Dashboard';
    
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
      userDetails: {
        firstName: "",
        lastName: "",
        password: "",
        emailId: "",
        address: "",
        dateOfBirth: "",
        company: ""
      },
      baseUrl: "http://localhost:8000/",
      redirectPath: "",
      shouldRedirect: false
    };
  }
  

  handleChange = (newValue) => {
    this.setState(
      {
        selectedTab: newValue
      }
    );
  };

  handleInputChange = (event, flag) => {
    let user = this.state.userDetails;
    let enteredVal = event.target.value;
    switch(flag) {
      case "firstName": {
        user.firstName = enteredVal;
        this.setState({userDetails: user});
        break;
      }

      case "lastName": {
        user.lastName = enteredVal;
        this.setState({userDetails: user});
        break;
      }

      case "password": {
        user.password = enteredVal;
        this.setState({userDetails: user});
        break;
      }

      case "address": {
        user.address = enteredVal;
        this.setState({userDetails: user});
        break;
      }

      case "emailId": { 
        user.emailId = enteredVal; 
        this.setState({userDetails: user});
        break;
      }

      case "dateOfBirth": {
        user.dateOfBirth = enteredVal;
        this.setState({userDetails: user});
        break;
      }

      case "company": {
        user.company = enteredVal; 
        this.setState({userDetails: user});
        break;
      }
      
      default: 
        break;
    }
  }

  resetUserState = () => {
    let updatedUser = {
      "firstName": "",
      "lastName": "",
      "emailId": "",
      "password": "",
      "address": "",
      "dateOfBirth": "",
      "company": ""
    }

    this.setState({userDetails: updatedUser});
  }

  signUpUser = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    }
    let userDetails = this.state.userDetails; 
    axios.post(this.state.baseUrl + "manager/signup/", userDetails, {headers: headers})
    .then((response) => {this.resetUserState()})
    .catch((error) => alert(error))
  }

  renderSignUpForm = () => {
    const classes = this.props;
    let user = this.state.userDetails;
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
          onChange={(event)=> this.handleInputChange(event, "firstName")}
          placeholder="Enter your First Name"
          value = {user.firstName}
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
            onChange={(event)=> this.handleInputChange(event, "lastName")}
            style={{ margin: 8 }}
            value={user.lastName}
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
            onChange={(event)=> this.handleInputChange(event, "emailId")}
            style={{ margin: 8 }}
            value = {user.emailId}
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
            onChange={(event)=> this.handleInputChange(event, "password")}
            value={user.password}
            style={{ margin: 8 }}
            placeholder="Enter your Password"
            helperText=""
            fullWidth
            type="password"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />    
          
          <TextField
            style = {{width: "100%"}}
            onChange={(event)=> this.handleInputChange(event, "address")}
            value = {user.address}
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
            onChange={(event)=> this.handleInputChange(event, "dateOfBirth")}
            value={user.dateOfBirth}
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
            value={user.company}
            onChange={(event)=> this.handleInputChange(event, "company")}
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

            <Button
            style={{ margin: 8, marginLeft: "40%" }}
            variant="contained"
            onClick = {(event) => this.signUpUser(event)}
            color="primary"
            className={classes.button}
          >
            Sign Up
      </Button>
        </div>
    )
  }

  componentDidMount() {
    let authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      this.setState({redirectPath: "/dashboard/", shouldRedirect: true})
    } else {
      this.setState({redirectPath: "/", shouldRedirect: false})
    } 
  }

  validate = (response) => {
    if (response.status == 200)  {
      sessionStorage.setItem("authToken", response.data.authToken);
      this.setState({shouldRedirect: true, redirectPath: "/dashboard/"})
    }
  }

  login = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    }
    let requestBody = {
      "emailId": this.state.userDetails.emailId,
      "password": this.state.userDetails.password
    }
    axios.post(this.state.baseUrl + "manager_login/", requestBody, {headers: headers})
    .then((response) => {this.validate(response)})
    .catch((error) => alert(error))
  }

  renderLoginForm = () => {
    const classes = this.props;
    let user = this.state.userDetails;
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
            id="email_id"
            label="Email Id"
            onChange={(event)=> this.handleInputChange(event, "emailId")}
            style={{ margin: 8 }}
            value = {user.emailId}
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
            onChange={(event)=> this.handleInputChange(event, "password")}
            value={user.password}
            style={{ margin: 8 }}
            placeholder="Enter your Password"
            helperText=""
            fullWidth
            type="password"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />    

        <Button
            style={{ margin: 8, marginLeft: "40%" }}
            variant="contained"
            onClick = {(event) => this.login(event)}
            color="primary"
            className={classes.button}
          >
           Login
      </Button>

      </div>
    )
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

  renderHomePage = () => {
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

  renderRouterSwitch = () => {
    return (
      <Router> 
        <Switch>
          
            <Route path="/dashboard/" >
              <Dashboard userDetails={this.state.userDetails} />
            </Route>
            <Route exact path = "/">
                {this.state.shouldRedirect ? <Redirect to="/dashboard/" /> : this.renderHomePage()}
                
            </Route>
        </Switch>
      </Router>
    )
  }

  render() {
    const {classes} = this.props;
    return (
      <div> {this.renderRouterSwitch()} </div> 
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
