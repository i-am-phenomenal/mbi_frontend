import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { ResponsiveEmbed } from "react-bootstrap";
import OutlinedCard from "./Card";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Grid from '@material-ui/core/Grid';
import '../App.css';
import PaperCard from "./PaperCard";
import { CompareArrowsOutlined } from "@material-ui/icons";

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
      listStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      gridClass: {
        flexGrow: 1,
      }
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
          card: {
              type: "",
              cardNumber: "",
              expiryMonth: 0,
              expiryYear: 0,
              cvv: ""
          },
          hasCard: false,
          hasSubscriptions: false
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
    
    updateCardDetails = (resp) => {
        if (resp.status == 200 && resp.data.cardNumber != "") {
            let returned = resp.data;
            let cardObject = {
                type: returned.type,
                cardNumber: returned.cardNumber, 
                expiryMonth: parseInt(returned.expiryMonth), 
                expiryYear: parseInt(returned.expiryYear),
                cvv: returned.cvv
            }
            this.setState({card: cardObject, hasCard: true});
        }
    }

    updateSubscriptionDetails = (resp) => {
        if (resp.status == 200) {
            var formatted = [];
            if (resp.data == []) {
                this.setState({subscriptions: []});
            } else{
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
                this.setState({subscriptions: formatted, hasSubscriptions: true});
            }
            
        }
    }

    getCardDetails = (authToken, headers) => {
        let endpoint = this.state.baseUrl + "payment_method/get_card_details/" + this.state.userDetails.userId + "/"
        axios.get(endpoint, {headers: headers})
        .then((resp) => {this.updateCardDetails(resp)})
        .catch((error) => console.log("ERROR -> ", error))
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
        .then(() => {this.getCardDetails(authToken, headers)})
        .catch((error) => console.log("ERROR -> ", error))
    }

    renderSubscriptions = () => {
        const styles = this.props;
        let subs = this.state.subscriptions;
        if (subs != []) {
            const cards = subs.map((sub) => 
                <OutlinedCard subscription={sub} />
            )
            return (
                <div>{cards}</div>
                    
            )
        } else {
            return ("")
        }
    }

    handleCardNumberChange = (event) => {
        let card = this.state.card;
        card.cardNumber = event.target.value; 
        this.setState({card: card});
    }

    handleMonthChange = (event) => {
        let card = this.state.card;
        card.expiryMonth = parseInt(event.target.value);
        this.setState({card: card});
    }

    handleYearChange = (event) => {
        let card = this.state.card;
        card.expiryYear = parseInt(event.target.value); 
        this.setState({card: card});
    }

    handleCVVChange = (event) => {
        let card = this.state.card;
        card.cvv = event.target.value; 
        this.setState({card: card});
    }

    handleSave = (event) => {
        event.preventDefault();
        let endpoint = this.state.baseUrl + "payment_method/create/"
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + sessionStorage.getItem("authToken")
        }
        axios.post(endpoint, this.state.card, {headers: headers})
        .then((resp) => console.log(resp)) // Call Update payment method API and addDefaultpaymentmethod
        .catch((error) => console.log("ERROR -> ", error))
    }

    // Called if the user does not have any card saved
    renderAddCardForm = () => {
        return <PaperCard 
            onCardNumberChange={this.handleCardNumberChange} 
            onMonthChange={this.handleMonthChange}
            onYearChange={this.handleYearChange}
            onCVVChange={this.handleCVVChange}
            onSave={this.handleSave}
        />
    }

    renderCardSection = () => {
        let hasCard = this.state.hasCard;
        hasCard = false; // REMOVE THIS LINE ONCE DONE
        if (! hasCard) {
            return <div> {this.renderAddCardForm()} </div>
        } else {
            // # WIP
        }
    }

    render() {
        return (
            <div> 
                <div className="split left">
                    <div className="centeredLeft">
                        <div> 
                            <h3>Your Subscriptions</h3> 
                            {this.renderSubscriptions()}
                        </div>
                    </div>
                    </div>

                    <div className="split right">
                    <div className="centered">
                       <div> 
                           {this.renderCardSection()}
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Dashboard);