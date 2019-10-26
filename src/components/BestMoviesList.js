import React, { Component } from 'react';
import Slider from "react-slick";

import noPoster from '../assets/images/iconmonstr-television-20.svg';

import '../assets/css/Bestmovieslist.css';
import '../assets/css/MovieCard.css'

class BestMoviesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      base_url: 'https://api.themoviedb.org/3/',
      img_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2',
      api_key: 'a1286a31a5d4743ff5baab39181dd827',
      res: null
    }
    this.sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };
  }

  componentDidMount(){
    fetch(this.state.base_url+'discover/movie?sort_by=popularity.desc&api_key='+this.state.api_key+'&page=1')
    .then(response => response.json())
    .then((data) => {
      this.setState({res: data});
    });
  }

  renderList(){
    if(this.state.res){
      console.log(this.state.res.results.length);
      let movies = this.state.res.results.length > 10 ? this.state.res.results.slice(0, 10) : this.state.res.results;
      console.log(movies)
      return (
        movies && movies.map((movie, index) =>
          <div key={index} className="w_movie slide">
            <div className="movieCard">
              {
                movie.poster_path ? 
                <img src={this.state.img_url + movie.poster_path} alt={'Poster'+ movie.title} />
                :<div className="noPoster"><img src={noPoster} alt={'Poster'+ movie.title} /></div>
              }
              <p className='title'>{movie.title}</p>
              <p className='released'>{movie.release_date ? movie.release_date.split('-')[0] : 'Année inconnue'}</p>
            </div>
          </div>
        )
      )
    }
  }

  render() {

    return (
      <section id="BestMovies">
        <h3>Les 10 meilleurs films</h3>
        <Slider {...this.sliderSettings}>
          {this.renderList()}
        </Slider>
      </section>
    );
  }
}

export default BestMoviesList;