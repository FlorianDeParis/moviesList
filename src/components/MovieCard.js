import React, { Component } from 'react';
import '../assets/css/MovieCard.css'

import noPoster from '../assets/images/iconmonstr-television-20.svg';

class MovieCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      base_url: 'https://api.themoviedb.org/3/',
      img_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2',
      api_key: 'a1286a31a5d4743ff5baab39181dd827',
    };
  }

  render(){
    let Card = this.props.displayType === 'list' ? 'li' : 'div';

    return (
      <Card className={"w_movie " + (this.props.displayType !== 'list' ? 'slide' : '')}>
        <div className="movieCard">
          {
            this.props.movie.poster_path ? 
            <img src={this.state.img_url + this.props.movie.poster_path} alt={'Poster'+ this.props.movie.title} />
            :<div className="noPoster"><img src={noPoster} alt={'Poster'+ this.props.movie.title} /></div>
          }
          <p className='title'>{this.props.movie.title}</p>
          <p className='released'>{this.props.movie.release_date ? this.props.movie.release_date.split('-')[0] : 'Année inconnue'}</p>
        </div>
      </Card>
    );
  }
}

export default MovieCard;