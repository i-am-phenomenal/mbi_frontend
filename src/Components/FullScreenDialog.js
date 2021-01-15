import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import PropTypes from 'prop-types';
import PlanItem from "./PlanItem";
import { CompareArrowsOutlined } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    }
  }

  setProducts = (resp) => {
    let records = [];
    resp.data.forEach(record => {
      let obj = {
          priceId: record.priceId,
          currency: record.currency,
          intervalCount: record.intervalCount, 
          interval: record.interval,
          productName: record.product.name,
          productId: record.product.productId,
          unitAmount: record.unitAmount
      }
      records.push(obj);
  });
    this.setState({products: records});
  }

  componentDidMount() {
    let endpoint = "http://localhost:8000/price/get_all/"
    axios.get(endpoint)
    .then((resp) => {this.setProducts(resp)})
    .catch((error) => console.log("ERROR ==> ", error))
  }
  
  subscribeToProduct = (priceId) => {
    let metadata = this.props.metadata;
    let endpoint = "http://localhost:8000/subscriptions/create/"
    let requestBody = {
      paymentMethodId: metadata.paymentMethodId,
      customerId: metadata.customerId,
      priceId: priceId
    }
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Token " + sessionStorage.getItem("authToken")
  }
    axios.post(endpoint, requestBody, {headers: headers})
    .catch((error) => console.log("ERROR ==> ", error))
  }

  handleOnPurchaseClick = (event, priceId) => {
    if (this.props.metadata.paymentMethodId == null) {
      alert("You need to add payment method details first");
    } else {
      {this.subscribeToProduct(priceId)}
    }
  }

  render() {
    const {handleClose, open, metadata}= this.props;
    const plans = this.state.products.map((product) => 
      <ListItem> <PlanItem product={product} onPurchase={this.handleOnPurchaseClick} /> </ListItem>
    ) 
    return (
      <div>
      <Dialog fullScreen open={open}  TransitionComponent={Transition}>
        <AppBar  styles={{position: 'relative'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" styles={{marginLeft: 2, flex: 1,}}>
              Subscription Plans
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {plans}
        </List>
      </Dialog>
    </div>
    )
  }
}

export default FullScreenDialog;
