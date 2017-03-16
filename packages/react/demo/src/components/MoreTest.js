import React, { Component } from 'react'
import Icon from '../../../lib/Icon'

export default class MoreTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      names: [
        'color-search',
        'color-news'
      ]
    }
  }

  handleRandomChangeButtonClick = () => {
    const list = [
      'color-search',
      'color-news',
      'color-print',
      'color-about',
      'color-binoculars',
      'color-bookmark'
    ];

    const nextNames = [];
    const prevNames = this.state.names;

    while (nextNames.length < 2) {
      let name = list[ Math.floor(Math.random() * list.length) ];
      if (prevNames.indexOf(name) == -1) {
        nextNames.push(name);
      }
    }

    this.setState({
      names: nextNames
    })
  };

  render() {
    const { names } = this.state;

    return (
      <div>
        {names.map((name, i) => <Icon name={name} key={i} />)}
        <button onClick={this.handleRandomChangeButtonClick}>Random Change</button>
      </div>
    )
  }

}