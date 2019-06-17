import React from 'react';
// import '../App.css';
import Login from './Login.js'
import Game from '../models/game.js'
import GameView from './gameView.js'
import EndGame from './endGame.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: props.game,
      view: 'Login'
    }
  }

  login() {
    this.setState({view: 'Login', game: undefined})
  }

  startGame(name) {
    const game = new Game(name)
    this.setState({ view: '', game: game})
  }

  endGame() {
    this.setState({view: 'EndGame'})
  }

  render() {
    if (this.state.view === 'Login'){
      return <Login onload={this.startGame.bind(this)}/>
    } else if (this.state.view === 'EndGame') {
      return <EndGame onload={this.login.bind(this)} game={this.state.game} />
    }
    return <GameView onload={this.endGame.bind(this)} game={this.state.game}/>
  }
}

export default App;
