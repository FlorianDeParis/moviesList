import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './App.css';

class BestMoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      base_url: 'https://api.themoviedb.org/3/',
      api_key: 'a1286a31a5d4743ff5baab39181dd827',
      res: null
    }
  }

  componentDidMount(){
    fetch(this.state.base_url+'movie/550?api_key='+this.state.api_key)
    .then(response => response.json())
    .then((data) => {
      this.setState({res: data});
    });
  }

  render() {
    console.log(this.state.res);
    return (
      <div className="MoviesList">
        <nav>
          <div className="container">
            <img src={logo} alt="MovieFinder logo"></img>
          </div>
        </nav>
        <div className="container">
          lorem ipsum
        </div>
      </div>
    );
  }
}

export default BestMoviesList;