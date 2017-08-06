import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Card extends React.Component {

  renderButtons(){
    if(this.props.bla) {
      return (
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary"><i className="fa fa-pencil" aria-hidden="true"></i></button>
          <button type="button" className="btn btn-secondary" onClick={() => this.props.deleteCard(this.props._id)}><i className="fa fa-trash" aria-hidden="true"></i>
  </button>
        </div>
      )
    } else {
      return (
        <div className="center">
        <div className="btn-group center" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary" onClick={() => this.props.likeCard(this.props._id, this.props.favourite)}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></button>
          <div className="favourite"><span align="center">{this.props.favourite}</span></div>
          <button type="button" className="btn btn-secondary" onClick={() => this.props.dislikeCard(this.props._id, this.props.favourite)}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></button>
        </div>
        </div>
      )
    }
}


  render() {





    return (
      <div className="col-lg-3 col-md-4 col-sm-6">
        <div className="">
          <div className="card limit">
            <div className="limit-image-container">
              <img className="card-img-top limit-image" src={this.props.imageURL} alt="Card image cap" />
            </div>
            <div className="card-block">
              <h4 className="card-title">{this.props.title}</h4>
              <p className="card-text">{this.props.description}</p>
              <div>
                {this.props.showbtn ?  this.renderButtons()  : null }

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

}

Card.propTypes = {
  cards: React.PropTypes.array.isRequired,
  deleteCard: React.PropTypes.func.isRequired
}




export default connect(null, actions)(Card);
