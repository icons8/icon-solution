import React, { PureComponent, PropTypes, Component } from 'react'

import Core from '@icons8/icon-core'
import httpGet from 'icons8-icon-core/lib/providers/httpGet'
import timeout from 'icons8-icon-core/lib/providers/timeout'

const core = Core({ httpGet, timeout });


export default class Icon extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired
  };

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps() {
    this.load();
  }

  load() {
    if (this._cancelLoading) this._cancelLoading();

    this.setState({
      icon: null,
      loading: true
    });

    const handler = core.getIcon(this.props.name, (err, icon) => {
      this.setState({
        icon,
        loading: false
      });
    });

    this._cancelLoading = handler.cancel;
  }

  render() {
    const { loading, icon } = this.state;
    return (
      <div
        className={'icons8-icon' + (loading ? ' icons8-icon--loading' : '')}
        style={{display: 'inline-block'}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        preserveAspectRatio="xMidYMid meet"
        height="100%"
        width="100%"
        style={{display: 'inline-block', pointerEvents: 'none' }}
        viewBox={icon ? icon.viewBox : null}
        dangerouslySetInnerHTML={{__html: icon ? icon.body : null }}
        />
      </div>
    )
  }
}



