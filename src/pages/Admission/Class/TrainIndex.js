import React, { PureComponent } from 'react';

export default class TrainIndex extends PureComponent {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
