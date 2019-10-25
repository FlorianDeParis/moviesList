import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import noPoster from './assets/images/iconmonstr-television-20.svg';
import './App.css';

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      base_url: 'https://api.themoviedb.org/3/',
      img_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2',
      api_key: 'a1286a31a5d4743ff5baab39181dd827',
      page_list: 1,
      old_page_list: null,
      res: null,
      alpha_filter: true,
      opened_alpha: false
    };
  }

  componentDidMount(){
    let order = this.state.alpha_filter?'asc':'desc';
    fetch(this.state.base_url+'discover/movie?sort_by=original_title.'+order+'&api_key='+this.state.api_key+'&page=1')
    .then(response => response.json())
    .then((data) => {
      this.setState({res: data, old_page_list: 1});
    });
  }

  componentDidUpdate(){
    // let order = this.state.alpha_filter?'asc':'desc';
    // if(this.state.page_list !== this.state.old_page_list){
    //   fetch(this.state.base_url+'discover/movie?sort_by=original_title.'+order+'&api_key='+this.state.api_key+'&page='+this.state.page_list)
    //   .then(response => response.json())
    //   .then((data) => {
    //     this.setState({res: data, old_page_list: this.state.page_list});
    //   });
    // }
  }

  renderMoviesList(){
    let movies = this.state.res;
    console.log(movies);
    return (
      movies && movies.results.map((movie, index) =>
        <li key={index} className="w_movie">
          <div className="movie">
            {
                movie.poster_path ? 
                <img src={this.state.img_url + movie.poster_path} alt={'Poster'+ movie.title} />
                :<div className="noPoster"><img src={noPoster} alt={'Poster'+ movie.title} /></div>
            }
            <p className='title'>{movie.title}</p>
            <p className='released'>{movie.release_date.split('-')[0]}</p>
          </div>
        </li>
      )
    )
  }

  handleClickAlpha(e){
    e.stopPropagation();
    console.log(this.state.opened_alpha);
    this.setState({opened_alpha: !this.state.opened_alpha})
  }



  render() {
    return (
      <div className="MoviesList">
        <nav>
          <div className="container">
            <img src={logo} alt="MovieFinder logo"></img>
          </div>
        </nav>
        <div className="container">
          <h3>Tous les films</h3>
          <div className="filters">
          <div>Trier par: 
            <button className="alphaBlock" onClick={(e) => this.handleClickAlpha(e)} opened={this.state.opened_alpha.toString()}>
              <span>Ordre Alphabétique</span>
              <ul>
                <li order="asc">Ordre Alphabétique</li>
                <li order="desc">Ordre Inversé</li>
              </ul>
            </button>
          </div>
          </div>
          <ul className="moviesPage">
            {this.renderMoviesList()}
          </ul>

        </div>
      </div>
    );
  }
}

export default HomePage;

