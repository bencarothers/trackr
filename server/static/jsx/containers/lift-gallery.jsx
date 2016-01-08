import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';

const tilesData = [
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=651%C3%97640&w=350&h=340',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=652%C3%97640&w=350&h=340',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=653%C3%97640&w=350&h=340',
    title: 'Camera',
    author: 'Danson67',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=654%C3%97640&w=350&h=340',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=655%C3%97640&w=350&h=340',
    title: 'Hats',
    author: 'Hans',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=650%C3%97641&w=350&h=340',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=650%C3%97642&w=350&h=340',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
      img: 'https://placeholdit.imgix.net/~text?txtsize=61&txt=650%C3%97643&w=350&h=340',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

const tileElements = tilesData.map(tile => <GridTile
  key={tile.img}
  title={tile.title}
  subtitle={<span>by <b>{tile.author}</b></span>}
  actionIcon={<IconButton></IconButton>}
  ><img src={tile.img} /></GridTile>);
const gridListStyle = {width: '100%', height: '90%', overflowY: 'auto', marginBottom: 24};

const GridListExampleSimple = () => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
    <GridList
      cellHeight={400}
      style={gridListStyle}
    >
      {tileElements}
    </GridList>
  </div>
);

export default GridListExampleSimple;
