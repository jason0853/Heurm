import React, { Component } from 'react';
import './progress.scss';

class Progress extends Component {
  state = {
    percentage: 0
  };

  timeoutId = null;

  handlePost = () => {
    this.props.onPost();
  };

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timeoutId);

    this.setState({
      percentage: 0
    });

    if (nextProps.value === '') {
      return;
    }

    setTimeout(
      () =>
        this.setState({
          percentage: 100
        }),
      0
    );

    this.timeoutId = setTimeout(this.handlePost, 1000);
  }

  // componentDidMount() {
  //   this.setState({
  //     percentage: 100
  //   });

  //   setTimeout(() => {
  //     console.log('done');
  //   }, 1000);
  // }

  render() {
    const { percentage } = this.state;

    return (
      <div
        className="progress"
        percentage={percentage}
        style={{ width: percentage + '%', transition: 'all 1s ease-in-out' }}
      />
    );
  }
}

export default Progress;
