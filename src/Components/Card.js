import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import Tooltip from '@material-ui/core/Tooltip';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    padding: "5%"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function OutlineCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let subscription = props.subscription;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={subscription.productName}
        subheader={subscription.unitAmount}
      />
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
      <Tooltip title="Unsubscribe from this plan"> 
        <IconButton aria-label="add to favorites" onClick={(event) => props.onDelete(event, subscription.subscriptionId)}>
          <DeleteSweepIcon />
        </IconButton>
          </Tooltip>
        <Tooltip title="Pay Now">
        <IconButton aria-label="add to favorites" onClick={(event) => props.onPaySelect(event, subscription.subscriptionId)}>
          <PaymentIcon />
        </IconButton>
          </Tooltip> 
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {subscription.currency}
          </Typography>
          <Typography paragraph>
            {subscription.billingScheme}
          </Typography>
          <Typography paragraph>
            {subscription.interval}
          </Typography>
          <Typography>
            {subscription.intervalCount}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
