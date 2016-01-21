import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';


const LiftGallery = React.createClass({

        render (){

            var tilesData = [
                {
                    img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=650%C3%97643&w=350&h=340',
                    title: 'lift 1',
                    author: 'BkrmadtyaKarki',
                },
            ];

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
                    key={tile.img}
                    style={tileStyle}
                    title={tile.title}
                    subtitle={<span>by <b>{tile.author}</b></span>}
                    actionIcon={<IconButton></IconButton>}
                ><img src={tile.img}/></GridTile>
            );

            return (

                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
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
