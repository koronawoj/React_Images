import React from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import Card from './card';

class AddCard extends React.Component {

  state = {
    title: "",
    description: "",
    imageURL: "",
    errors: {},
  }

  handleFormSubmit({ title, description, imageURL }){
    //Need to do sth to log user in
    let owner = this.props.userId;
    this.props.addCard({ title, description, imageURL, owner });
  }


  handleChange = (e) => {
  if (!!this.state.errors[e.target.name]){
    let errors = Object.assign({}, this.state.errors);
    delete errors[e.target.name];
    this.setState({
      [e.target.name]: e.target.value,
      errors
    });
  } else {
    this.setState({[e.target.name]: e.target.value});
  }

}


  render() {
    const { handleSubmit, fields: { title, description, imageURL }} = this.props;
    const cardPreview = <Card title={this.state.title} description={this.state.description} imageURL={this.state.imageURL} showbtn={false}></Card>


    return (
      <div>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Title: </label>
          <input {...title} value={this.state.title} className="form-control" onChange={this.handleChange} id="title" />
        </fieldset>
        <fieldset className="form-group">
          <label>Description: </label>
          <input {...description} value={this.state.description} className="form-control" onChange={this.handleChange} id="description" />
        </fieldset>
        <fieldset className="form-group">
          <label>Image URL: </label>
          <input {...imageURL}  value={this.state.imageURL} className="form-control" onChange={this.handleChange} id="imageURL" />
        </fieldset>
        <button action="submit" className="btn btn-warning">Add card</button>
      </form>
      {this.state.imageURL ? cardPreview : ''}
      {this.props.userId}
    </div>
    );
  }

}
{/* <h3>Preview: </h3>
<Card title={this.state.title} description={this.state.description} imageURL={this.state.imageURL}></Card> */}

function mapStateToProps(state) {
  return {
    title: state.title,
    description: state.description,
    imageURL: state.imageURL,
    userId: state.auth.userId,
   };
}

export default reduxForm({
  form: 'addcard',
  fields: ['title', 'description', 'imageURL']
}, mapStateToProps, actions)(AddCard);
