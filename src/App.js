import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import BestMoviesList from './components/BestMoviesList'
import ReactPaginate from 'react-paginate';

import logo from './assets/images/logo.svg';
import noPoster from './assets/images/iconmonstr-television-20.svg';

import './App.css';
import './assets/css/MovieCard.css'
import 'react-dropdown/style.css'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      base_url: 'https://api.themoviedb.org/3/',
      img_url: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2',
      api_key: 'a1286a31a5d4743ff5baab39181dd827',
      page_list: 1,
      res: null,
      alpha_filter: 'asc',
      date_filter: null,
      genre_filter: 'all',
      search_mode: false,
      query_word: null
    };
    this.optionsAlpha = [
      { value: 'asc', label: 'Ordre Alphabétique' },
      { value: 'desc', label: 'Ordre Inversé' }
    ];
    this.defaultOptionAlpha = this.optionsAlpha[0];
    this.optionsGenres = [
      { value: 'all', label: 'Tous' },
      { value: '28', label: 'Action' },
      { value: '27', label: 'Horreur' },
      { value: '10749', label: 'Amour' }
    ];
    this.defaultOptionGenres = this.optionsGenres[0];
  }

  componentDidMount(){
    fetch(this.state.base_url+'discover/movie?sort_by=original_title.'+this.state.alpha_filter+'&include_adult=false&api_key='+this.state.api_key+'&page=1')
    .then(response => response.json())
    .then((data) => {
      this.setState({res: data});
    });
  }

  componentDidUpdate(prevProps, prevState){
    console.log('----');
    console.log('UPDATE');
    console.log(prevState);
    console.log(this.state);
    console.log('----');

    if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
      let url_mode = this.state.search_mode ? 'search' : 'discover';
      let query = this.state.search_mode ? '&query='+this.state.query_word : '';
      let genre = this.state.genre_filter !== 'all' ? '&with_genres='+this.state.genre_filter : '';
      console.log('URL MODE :'+url_mode);
      console.log('UPDATING DATAS');

      fetch(this.state.base_url+url_mode+'/movie?sort_by=original_title.'+this.state.alpha_filter+'&include_adult=false&api_key='+this.state.api_key+'&page='+this.state.page_list+query+genre)
      .then(response => response.json())
      .then((data) => {
        this.setState({res: data});
      });

    } else {
      console.log('BOTH ARE THE SAME STATE')
    }
  }

  renderMoviesList(){
    let movies = this.state.res;
    if(movies){
      return (
        movies && movies.results.map((movie, index) =>
          <li key={index} className="w_movie">
            <div className="movieCard">
              {
                movie.poster_path ? 
                <img src={this.state.img_url + movie.poster_path} alt={'Poster'+ movie.title} />
                :<div className="noPoster"><img src={noPoster} alt={'Poster'+ movie.title} /></div>
              }
              <p className='title'>{movie.title}</p>
              <p className='released'>{movie.release_date ? movie.release_date.split('-')[0] : 'Année inconnue'}</p>
            </div>
          </li>
        )
      )
    }
  }

  onChangeAlpha(entry){
    this.setState({alpha_filter: entry.value, page_list: 1, search_mode: false})
  }

  onChangeGenres(entry){
    console.log(entry.value);
    this.setState({genre_filter: entry.value, page_list: 1, search_mode: false})
  }

  onChangeSearch(event){
    if(event.target.value.trim().length > 0){
      console.log(event.target.value);
      this.setState({search_mode: true, query_word: event.target.value.trim()})
    } else {
      this.setState({search_mode: false, query_word: null})
      console.log('EMPTY STRING');
    }
  }

  renderPagination(){
    if(this.state.res){
      let totalPages = this.state.res.total_pages;
      let currentPage = this.state.res.page;
      let maxdisplayedPages = 11;
      console.log(totalPages,currentPage)
      return (
        <ReactPaginate 
          initialPage={currentPage - 1} 
          pageCount={totalPages} 
          pageRangeDisplayed={maxdisplayedPages - 1} 
          marginPagesDisplayed='0'
          previousLabel=' '
          nextLabel=' '
          containerClassName='pagination'
          pageClassName='pagination-btn'
          nextClassName='pagination-btn nextPage'
          previousClassName='pagination-btn prevPage'
          onPageChange={(e) => this.changePage(e)}
        />
      )
    }
  }

  changePage(e){
    this.setState({page_list: e.selected + 1})
  }

  render() {
    return (
      <div className="MoviesList">
        <nav>
          <div className="container">
            <img src={logo} alt="MovieFinder logo"></img>
            <input type="text" placeholder="Rechercher un film" onChange={(e) => this.onChangeSearch(e)}></input>
          </div>
        </nav>
        <div className="container">
          <BestMoviesList />
          <span className="separator"></span>
          <h3>Tous les films</h3>
          <div className="filters">
            <span>Trier par:</span>
            <Dropdown options={this.optionsAlpha} onChange={(entry) => this.onChangeAlpha(entry)} value={this.state.alpha_filter} placeholder="Choisir l'ordre d'apparition" className="alphaBlock"/>
            <span>Filtrer par:</span>
            <Dropdown options={this.optionsGenres} onChange={(entry) => this.onChangeGenres(entry)} value={this.state.genre_filter} placeholder="Genre" className="genresBlock"/>
          </div>
          <ul className="moviesPage">
            {this.renderMoviesList()}
          </ul>
          {this.renderPagination()}
        </div>
      </div>
    );
  }
}

export default HomePage;

