import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    minWidth: 350,
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

export default function ReadOnlyCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let card = props.cardDetails; 
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Your Payment Method Details
        </Typography>
        <Typography variant="h5" component="h2">
        {card.cardNumber}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {card.expiryMonth + "/" + card.expiryYear}
        </Typography>
        <Typography variant="body2" component="p">
          {card.cvv}
          <br />
         
        </Typography>
      </CardContent>
      <CardActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={props.onDelete}
          >
            Remove
          </Button>
      </CardActions>
    </Card>
  );
}
