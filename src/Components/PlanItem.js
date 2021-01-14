import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '200ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function PlanItem(props) {
  const classes = useStyles();
  let product = props.product;
  return (
    <div> 
      <ListItem alignItems="flex-start">
        
        <ListItemText
          primary={product.productName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {product.unitAmount} {product.currency.toUpperCase()}
              </Typography>
              &nbsp; {product.interval}
              <Button
                style={{ margin: 8, marginLeft: "40%" }}
                variant="contained"
                onClick = {(event) => props.onPurchase(event, product.priceId)}
                color="primary"
                className={classes.button}
              >
                  Purchase
            </Button>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
  );
}
