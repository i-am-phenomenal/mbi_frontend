import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { ResponsiveEmbed } from "react-bootstrap";

const styles = theme => ({
    root: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },    
  });

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          baseUrl: "http://localhost:8000/",
          userDetails: {
            userId: "",
            firstName: "",
            lastName: "",
            password: "",
            emailId: "",
            address: "",
            dateOfBirth: "",
            company: ""
          },
          subscriptions: [],
        };
      }

    updateUserDetails = (response) => {
        if (response.status == 200) {
            let returned = response.data;
            let userObject = {
                userId: returned.id,
                firstName: returned.firstName,
                lastName: returned.lastName,
                emailId: returned.emailId, 
                password:  returned.password, 
                company: returned.company, 
                dateOfBirth: returned.dateOfBirth
            }

            this.setState({userDetails: userObject});
        }
    }

    updateSubscriptionDetails = (resp) => {
        if (resp.status == 200) {
            var formatted = [];
            let subscriptions = resp.data.forEach(sub => {
                let obj = {
                    productName: sub.productName, 
                    currency: sub.currency,
                    unitAmount: sub.unitAmount,
                    billingScheme: sub.billingScheme,
                    interval: sub.interval,
                    intervalCount: sub.intervalCount
                }
                formatted.push(obj);
            })
            this.setState({formatted: subscriptions});
        }
    }

    getSubscriptions = (authToken, headers) => {
        let endpoint = this.state.baseUrl + "subscriptions/get_available/" + this.state.userDetails.userId + "/"
        axios.get(endpoint,{headers: headers})
        .then((resp) => {this.updateSubscriptionDetails(resp)})
        .catch((error) => console.log("ERROR -> ", error))
    }

    componentDidMount() {
        let authToken = sessionStorage.getItem("authToken");
        const headers = {
            accept: 'application/json',
            "Authorization": "Token " + authToken
        }
        axios.get(this.state.baseUrl + "manager/get_details/",
        {
            headers: headers 
        }
        )
        .then((resp) => {this.updateUserDetails(resp)})
        .then(() => {this.getSubscriptions(authToken, headers)})
        .catch((error) => console.log("ERROR -> ", error))
    }

    render() {
        return (
            <p> Dashboard </p>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Dashboard);