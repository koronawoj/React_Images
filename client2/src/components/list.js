import React from 'react';
import Card from './card';
import { connect } from 'react-redux';
import * as actions from '../actions';

class List extends React.Component {

  componentDidMount() {
    let arr = this.props.cards;
    console.log("to jest tablice",arr);
  };


  lista(title, description, imageURL, _id, favourite) {
    return <Card title={title} description={description} imageURL={imageURL} _id={_id} showbtn={true} bla={this.props.bla} favourite={favourite} deleteCard={this.props.deleteCard}></Card>
  }

  petla() {

    var tablica = []
    for (var key in this.props.cards) {
      tablica.push(this.lista(this.props.cards[key].title, this.props.cards[key].description, this.props.cards[key].imageURL, this.props.cards[key]._id, this.props.cards[key].favourite));

    }
    return tablica;
  }


  render() {
    const emptyMessage = (
      <p>Nie ma kart w twojej kolekcji</p>
    );

    return (
      <div className="row">
        { this.petla().length === 0 ? emptyMessage : this.petla() }
      </div>
    );
  }

}

List.propTypes = {
  cards: React.PropTypes.array.isRequired,
  deleteCard: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    message: state.auth.message,
    cards: state.auth.cards,
   };
}

export default connect(mapStateToProps, actions)(List);
