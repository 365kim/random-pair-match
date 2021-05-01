import React from 'react';
import ReactDOM from 'react-dom';
import { Animation, PairList } from './components';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  showResult() {
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    setTimeout(() => {
      this.showResult();
    }, 3000);
  }

  render() {
    return <div className="App">{this.state.isLoading ? <Animation /> : <PairList />}</div>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
