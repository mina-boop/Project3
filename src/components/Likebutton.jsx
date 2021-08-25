import React, { Component } from 'react';

const colors = ['purple', 'green', 'red', 'yellow', 'dodgerblue'];

class LikeButton extends Component {
  state = {
    likes: 0,
  };

  handleLike = () => {
    this.setState({ likes: this.state.likes + 1 });
    console.log(this.state.likes);
  };

  render() {
    const color = colors[this.state.likes % colors.length];

    const btnStyle = {
     Image:"/Client/public/like-icon.png",
      backgroundColor: color,
      padding: '20px 20px',
      color: 'white',
     
    
    };


    return (
      <button className="icon" onClick={this.handleLike} style={btnStyle}>
      <img className="icon" src="../like-icon.png" alt="icon-like" />
        {this.state.likes} {this.state.likes === 1 ? 'Like' : 'Likes'}
     
      </button>
    );
  }
}

export default LikeButton;
