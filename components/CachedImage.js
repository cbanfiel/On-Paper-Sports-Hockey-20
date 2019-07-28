import React from 'react';
import Picache from 'picache';

export default class CachedImage extends React.Component {
  render() {
    return(
      <Picache style={this.props.style} source={{uri: this.props.uri}}/>
    )
  }
}