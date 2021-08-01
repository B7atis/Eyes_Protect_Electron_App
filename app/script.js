import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: null,
  }

  formatTime(time) {
    if (!time || isNaN(time) || time <= 0) {
      return null;
    } return (Math.floor(time / 60) % 60).toString() + ':' + (Math.floor(time % 60)).toString().padStart(2, '0');
  }

  step = () => {
    this.setState({
      time: this.state.time - 1
    });

    if (this.state.time === 0) {
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
        this.playBell();
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
        this.playBell();
      }
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });
  }

  stopTimer = () => {
    this.setState({
      timer: clearInterval(this.step),
      time: 0,
      status: 'off',
    });
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  closeApp = () => window.close();

  render() {
    const { status, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status === 'work') && <img src="./images/work.png" alt='work' />}
        {(status === 'rest') && <img src="./images/rest.png" alt='rest' />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button onClick={() => this.startTimer()} className="btn">Start</button>}
        {(status !== 'off') && <button onClick={() => this.stopTimer()} className="btn">Stop</button>}
        <button onClick={() => this.closeApp()} className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
