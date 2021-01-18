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
import ReadOnlyCard from "./ReadOnlyCard";
import FullScreenDialog from "./FullScreenDialog";
import { AccordionSummary } from "@material-ui/core";

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
            company: "",
            paymentMethodId: ""
          },
          subscriptions: [],
          card: {
              type: "",
              cardNumber: "",
              expiryMonth: 0,
              expiryYear: 0,
              cvv: "",
              paymentMethodId: "",
          },
          hasCard: false,
          hasSubscriptions: false,
          subsPromptState: false
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
                dateOfBirth: returned.dateOfBirth,
                paymentMethodId: returned.paymentMethodId
            }

            this.setState({userDetails: userObject});
        }
    }
    
    updateCardDetails = (resp) => {
        if (resp.status == 200 && resp.data != false) {
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
                        intervalCount: sub.intervalCount,
                        subscriptionId: sub.subscriptionId
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

    toggleSubscriptionPrompt = (event) => {
        event.preventDefault();
        let currentState = this.state.subsPromptState;
        this.setState({subsPromptState: ! currentState});
    }

    renderEmptySubsView = () => {
        const classes = this.props;
        return (
            <div>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    You dont have any subscriptions yet
                </Typography>
                < br /> 
                <Button
                    style={{ margin: 5, marginLeft: "20%", right: 20 }}
                    variant="contained"
                    onClick = {(event) => this.toggleSubscriptionPrompt(event)}
                    color="primary"
                    className={classes.button}
                >
                    View Subscriptions
            </Button>
                </div> 
            )
    }

    removeSubscriptionFromState = (subId) => {
        let updated = []
        this.state.subscriptions.forEach((sub) => {
            if (sub.subscriptionId != subId) {
                updated.push(sub);
            }
        })
        this.setState({subscriptions: updated});
    }

    unsubscribeFromPlan = (event, subId) => {
        event.preventDefault();
        let endpoint = this.state.baseUrl + "subscriptions/delete/"
        let requestBody = {
            subscriptionId: subId
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + sessionStorage.getItem("authToken")
        }
        axios.post(endpoint, requestBody, {headers: headers})
        .then((resp) => {this.removeSubscriptionFromState(subId)})
        .catch((error) => console.log("ERROR -> ", error))
    }

    initiatePayment = (event, subId) => {
        event.preventDefault();
        let endpoint = this.state.baseUrl + "payment_method/payment_intent/"
        let requestBody = {
            customerId: this.state.userDetails.userId, 
            paymentMethodId: this.state.userDetails.paymentMethodId,
            subscriptionId: subId
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + sessionStorage.getItem("authToken")
        }
        axios.post(endpoint, requestBody, {headers: headers})
        .then((resp) => console.log(resp))
        .catch((error) => console.log("ERROR -> ", error))
    }

    renderSubscriptions = () => {
        const styles = this.props;
        let subs = this.state.subscriptions;
        if (subs != false) {
            const cards = subs.map((sub) => 
                <OutlinedCard subscription={sub} onDelete={this.unsubscribeFromPlan} onPaySelect={this.initiatePayment}  />
            )
            return (
                <div>
                    <Button
                    style={{ margin: 5, marginLeft: "20%", right: 20 }}
                    variant="contained"
                    onClick = {(event) => this.toggleSubscriptionPrompt(event)}
                    color="primary"
                    className={styles.button}
                    >
                        View Subscriptions
                </Button>
                    <h3>Your Subscriptions</h3> 
                    {cards}
                </div> 
            )
        } else {
            return ( <div> {this.renderEmptySubsView()} </div> )
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

    updatePaymentMethod = () => {
        let endpoint = this.state.baseUrl + "manager/update_payment_method/"
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + sessionStorage.getItem("authToken")
        }
        let requestBody = {
            paymentMethodId: this.state.card.paymentMethodId,
            managerId: this.state.userDetails.userId
        }
        axios.put(endpoint, requestBody, {headers: headers})
        .then((resp) => {this.setState({hasCard: true})})
        .catch((error) => console.log("ERROR -> ", error))
    }

    setCardDetails = (resp) => {
        let card = this.state.card;
        let user = this.state.userDetails;
        card.paymentMethodId = resp.data.Details.id;
        user.paymentMethodId = card.paymentMethodId;
        this.setState({card: card, userDetails: user});
    }

    handleSave = (event) => {
        event.preventDefault();
        let endpoint = this.state.baseUrl + "payment_method/"
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + sessionStorage.getItem("authToken")
        }
        axios.post(endpoint, this.state.card, {headers: headers})
        .then((resp) => {this.setCardDetails(resp)}) // Call Update payment method API and addDefaultpaymentmethod
        .then(() => {this.updatePaymentMethod()})
        .catch((error) => console.log("ERROR -> ", error))
    }

    updateCardDetailsState = () => {
        let card = {
            cardNumber: "",
            expiryMonth: 0,
            expiryYear: 0,
            cvv: ""
        }
        let user = this.state.userDetails; 
        user.paymentMethodId = "";
        {this.setState(
            {
                hasCard: false,
                card: card,
                usedDetails: user
            }
        )}
    }

    removeCardFromUser = (event) => {
        event.preventDefault();
        let endpoint = this.state.baseUrl + "manager/remove_card_details/";
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + sessionStorage.getItem("authToken")
        }
        let requestBody = {
            paymentMethodId: this.state.userDetails.paymentMethodId,
        }
        axios.post(endpoint, requestBody, {headers: headers})
        .then((resp) => {this.updateCardDetailsState()})
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
        if (! hasCard) {
            return <div> {this.renderAddCardForm()} </div>
        } else {
            return <div>  <ReadOnlyCard cardDetails={this.state.card} onDelete={this.removeCardFromUser} /> </div>
        }
    }

    closeDialog = (event) => {
        event.preventDefault();
        
        this.setState({subsPromptState: false});
        alert("Please refresh the screen to see subscriptions.")
    }

    renderSubscriptionPrompt = () => {
        if (this.state.subsPromptState) {
            return <FullScreenDialog 
            handleClose={this.closeDialog} 
            open={true} 
            metadata={
                {
                    paymentMethodId: this.state.userDetails.paymentMethodId,
                    customerId: this.state.userDetails.userId
                }
            } /> 
        }
    }

    render() {
        return (
            <div> 
                <div className="split left">
                    <div className="centeredLeft">
                        <div> 
                            {this.renderSubscriptions()}
                        </div>
                    </div>
                    </div>

                    <div className="split right">
                    <div className="centered">
                       <div> 
                           {this.renderCardSection()}
                           {this.renderSubscriptionPrompt()}
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