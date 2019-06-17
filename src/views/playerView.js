import React from 'react';
import '../App.css';
import CardView from './cardView'
import PropTypes from 'prop-types';

class PlayerView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardView: new CardView()
    }
  }

  static propTypes = {
    game: PropTypes.object.isRequired,
    logs: PropTypes.array.isRequired,
    targetCard: PropTypes.string.isRequired,
    player: PropTypes.object.isRequired,
    clicked: PropTypes.func.isRequired
  }

  play(event) {
    event.preventDefault()
    const request = { playerWhoWasAsked: this.props.targetPlayer, playerWhoAsked: this.props.game.player().name(), desired_rank: this.props.targetCard }
    this.props.logs.unshift(this.props.game.book(request, this.props.game.doTurn(request)))
    this.props.logs.unshift(...this.props.game.botTurns())
    this.props.reset()
  }

  displayButton() {
    return (
      <form onSubmit={this.play.bind(this)}>
        <button type="Submit">Request</button>
      </form>
    )
  }

  classes(card) {
    if (this.props.targetCard === card.rank()) {
      return 'card-in-hand highlight'
    }
    return 'card-in-hand'
  }

  cardHtml() {
    return this.props.player.playerHand().map((card, index) => <CardView key={index} value={card.value()} classes={this.classes(card)} onClick={this.props.clicked.bind(this, card.rank())} />)
  }

  matchesHtml() {
    return this.props.player.matches().map((match, index) => <div key={index} className="matches inbetween-match">{match.map((card, i) => <CardView key={i} value={card.value()} classes={'match'} onClick={()=>{}} /> )}</div>)
  }

  render() {
    // console.log(this.props.logs)
    return (<div>
      <h1>{this.props.player.name()}</h1>
      {this.cardHtml()}
      <div className="matchesWrapper">{this.matchesHtml()}</div>
      {(this.props.targetCard !== '' && this.props.targetPlayer !== '') ? this.displayButton() : ''}
    </div>)
  }
}

export default PlayerView