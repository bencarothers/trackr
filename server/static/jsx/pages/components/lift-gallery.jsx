import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';


const LiftGallery = React.createClass({

        render (){

            var tilesData = []

            var arrayLength = this.props.lifts.length;

            for (var i = 0; i < arrayLength; i++) {
                tilesData.push(this.props.lifts[i])
            }


            var gridListStyle = {
                width: '100%',
                height: '100%',
                margin: 24
            };

            var tileStyle = {
                marginLeft: 24,
                marginRight: 24,
                marginBottom: 24
            };

            var tileElements = tilesData.map(tile => <GridTile
                    key={tile.gif_file_path}
                    style={tileStyle}
                    title={tile.lift_type}
                    subtitle={<span>by <b>{tile.weight}</b></span>}
                    actionIcon={<IconButton></IconButton>}
                ><img src={tile.gif_file_path}/></GridTile>
            );

            return (

                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}} data-step="2" data-intro="This is where they'll show up">
                    <GridList
                        cellHeight={400}
                        style={gridListStyle}
                    >
                        {tileElements}
                    </GridList>
                </div>
            )
        }
    }
);

export default LiftGallery;
