import React from 'react';
import Card from 'material-ui/lib/card/card';
import FlatButton from 'material-ui/lib/flat-button';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import MenuItem from 'material-ui/lib/menus/menu-item';

const Lift = React.createClass({

    render() {
         var cardStyle = {
                 display: 'block',
                 marginLeft: '270px',
                 width: '300px',
                 height: '300px',
                 paddng: '50px'

             };

        return(
        <Card style={cardStyle}>
          <CardMedia overlay={<CardTitle title="I suck at squatting" subtitle="Ripp save me"/>}>
            <img src="http://70sbig.com/wp-content/uploads/2012/03/halfsquat-fuck.jpg"/>
          </CardMedia>
          <CardTitle title="135 Squat" subtitle="12/10/15"/>
          <CardActions>
            <FlatButton label="View Lift"/>
            <FlatButton label="Delete"/>
          </CardActions>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          </CardText>
        </Card> 
        );
    }
});

export default Lift;
