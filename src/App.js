import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import logo from './assets/images/logo.svg';
import noPoster from './assets/images/iconmonstr-television-20.svg';
import ReactPaginate from 'react-paginate';

import './App.css';
import 'react-dropdown/style.css'

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
      alpha_filter: 'asc',
      opened_alpha: false,
      date_filter: null,
      genre_filter: null
    };
    this.optionsAlpha = [
      { value: 'asc', label: 'Ordre Alphabétique' },
      { value: 'desc', label: 'Ordre Inversé' }
    ];
    this.defaultOptionAlpha = this.optionsAlpha[0];
  }

  componentDidMount(){
    fetch(this.state.base_url+'discover/movie?sort_by=original_title.'+this.state.alpha_filter+'&api_key='+this.state.api_key+'&page=1')
    .then(response => response.json())
    .then((data) => {
      this.setState({res: data});
    });
  }

  componentDidUpdate(prevState){
    // console.log('UPDATE');
    console.log(prevState.res);
    console.log(this.state.res);
    //console.log(JSON.stringify(this.state))
    if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
      console.log('UPDATING DATAS');

      // fetch(this.state.base_url+'discover/movie?sort_by=original_title.'+this.state.alpha_filter+'&api_key='+this.state.api_key+'&page='+this.state.page_list)
      // .then(response => response.json())
      // .then((data) => {
      //   this.setState({res: data});
      // });

    } else {
      console.log('BOTH ARE THE SAME STATE')
    }
  }

  refreshMovieList(alpha){
    // console.log('refreshMovieList');
    // console.log(this.state.base_url+'discover/movie?sort_by=original_title.'+alpha+'&api_key='+this.state.api_key+'&page='+this.state.page_list)
    // fetch(this.state.base_url+'discover/movie?sort_by=original_title.'+alpha+'&api_key='+this.state.api_key+'&page='+this.state.page_list)
    // .then(response => response.json())
    // .then((data) => {
    //   this.setState({res: data, alpha_filter: alpha});
    // });
  }

  renderMoviesList(){
    let movies = this.state.res;
    // console.log(movies);
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
            <p className='released'>{movie.release_date ? movie.release_date.split('-')[0] : 'Année inconnue'}</p>
          </div>
        </li>
      )
    )
  }

  onChangeAlpha(entry){
    console.log(entry.value);
    this.setState({alpha_filter: entry.value})
    //this.refreshMovieList(entry.value)
  }

  renderPagination(){
    if(this.state.res){
      let totalPages = this.state.res.total_pages;
      let currentPage = this.state.res.page;
      let maxdisplayedPages = 10;
      console.log('totalPages : '+totalPages);
      console.log('currentPage : '+currentPage);
      console.log('maxdisplayedPages : '+maxdisplayedPages);

      return (
        <ReactPaginate 
          initialPage={currentPage} 
          pageCount={totalPages} 
          pageRangeDisplayed={maxdisplayedPages} 
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
    console.log(e)
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
            <span>Trier par:</span>
            <Dropdown options={this.optionsAlpha} onChange={(entry) => this.onChangeAlpha(entry)} value={this.state.alpha_filter} placeholder="Choisir l'ordre d'apparition" className="alphaBlock"/>
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

