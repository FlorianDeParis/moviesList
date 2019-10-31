import React, { Component } from 'react';
import Slider from "react-slick";
import MovieCard from './MovieCard';

import '../assets/css/Bestmovieslist.css';

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
      slidesToScroll: 2
    };
  }

  componentDidMount(){
    fetch(this.state.base_url+'discover/movie?sort_by=popularity.desc&include_adult=false&api_key='+this.state.api_key+'&page=1')
    .then(response => response.json())
    .then((data) => {
      this.setState({res: data});
    });
  }

  renderList(){
    if(this.state.res){
      let movies = this.state.res.results.length > 10 ? this.state.res.results.slice(0, 10) : this.state.res.results;
      return (
        movies && movies.map((movie, index) =>
          <MovieCard key={index} movie={movie} displayType='slide'/>
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