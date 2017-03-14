import React, { PureComponent } from 'react';
import Icon from '../../../lib/index'

export default class App extends PureComponent {

  newIconNameInputElementRef = null;

  handleAddIconButtonClick = () => {
    this.setState({
      icons: this.state.icons.concat([ this.newIconNameInputElementRef.value ])
    })
  };

  componentWillMount() {
    this.setState({
      icons: [
        'color-search',
        'color-news',
        'color-print'
      ]
    })
  }

  render() {
    const { icons } = this.state;

    return (
      <div>
        { icons.map((icon, i) => <Icon name={icon} key={i}/> ) }
        <div>
          <input ref={(el) => this.newIconNameInputElementRef = el}/><button onClick={this.handleAddIconButtonClick}>ADD</button>
        </div>
      </div>
    )
  }


}