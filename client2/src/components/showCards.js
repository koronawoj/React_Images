import React from 'react';
import List from './list';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ShowCards extends React.Component {

  render() {
    return (
      <div>
      { this.props.params.userId ? this.props.getUserCards(this.props.params.userId) : this.props.getCards() }
      <List cards={this.props.cards} bla={this.props.params.userId} ></List>

    </div>
    );
  }
}

ShowCards.propTypes = {
  cards: React.PropTypes.array.isRequired,
  deleteCard: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    cards: state.auth.cards,
   };
}

export default connect(mapStateToProps, actions)(ShowCards);
