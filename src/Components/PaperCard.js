import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(10),
      width: theme.spacing(50),
      height: theme.spacing(40),
    },
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} variant="outlined"> 
      <TextField id="standard-basic" label="Card Number" onChange={(event) => props.onCardNumberChange(event)} />
      <br /> 
      <TextField id="standard-basic" label="Expiry Month" onChange={(event) => props.onMonthChange(event)} />
      <br /> 
      <TextField id="standard-basic" label="Expiry Year" onChange={(event) => props.onYearChange(event)} />
      <br /> 
      <TextField id="standard-basic" label="CVV"  onChange={(event) => props.onCVVChange(event)}/>
      <br /> 
      <br /> 
      <Button
        style={{ margin: 8, marginLeft: "40%" }}
        variant="contained"
        onClick = {(event) => props.onSave(event)}
        color="primary"
        className={classes.button}
        >
        Save
    </Button>
      </Paper>
    </div>
  );
}
