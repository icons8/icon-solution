import React, { PureComponent, PropTypes } from 'react'

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
        className={core.classes.icon + (loading ? ' '+core.classes.loading : '') + (icon ? ' '+icon.sizeClassName : '')}
        style={{display: 'inline-block'}}
        dangerouslySetInnerHTML={{__html: icon ? icon.svg : null }}
      >
      </div>
    )
  }
}



