import React, { Component } from 'react'
import HeroImage from "../Elements/HeroImage/HeroImage"
import SearchBar from "../Elements/SearchBar/SearchBar"
import FourColGrid from "../Elements/FourColGrid/FourColGrid"
import MovieThumb from "../Elements/MovieThumb/MovieThumb"
import LoadMoreBtn from "../Elements/LoadMoreBtn/LoadMoreBtn"
import Spinner from "../Elements/Spinner/Spinner"
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE} from "../../config"


class Home extends Component{
    state = {
        movies : [],
        heroImage : null,
        loading : false,
        currentPage : 0,
        totalPages : 0,
        searchTerm : ""
    }

    componentDidMount() {

        this.setState({ loading: true })
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchMovies(endPoint);

        // // gettin state from the local storage
        // if (localStorage.getItem('HomeState')){
        //     const state = JSON.parse(localStorage.getItem('HomeState'));
        //     this.setState({...state})
        // }else {
        //     this.setState({ loading: true })
        //     const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        //     this.fetchMovies(endPoint);
        // }
      
    } 

    loadMoreBtn = () => { 
        // let is used to set variable and const is to set constant variable
        let endPoint = "";
        this.setState({ loading: true });

        if (this.state.searchTerm === "") {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage +1}&include_adult=false`;
        }

        this.fetchMovies(endPoint);
    }

    searchMovies = (searchTerm) =>{
        console.log(searchTerm)

        let endPoint = ""
        this.setState({
            movies: [],
            loading: true,
            searchTerm: searchTerm
        })

        if (searchTerm === "") {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`;
        }
       

        this.fetchMovies(endPoint);
    }

    fetchMovies = (endPoint)=>{
        // we will use inbuild fetch movies
        // This will return a promise so we will wait until this promise is completed or discarded
        // ... is the spreder operator to append list to another list
        fetch(endPoint)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    movies: [...this.state.movies, ...result.results],
                    heroImage: (this.state.heroImage) ? this.state.heroImage : result.results[0],
                    loading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages
                }, () => {
                        //saving data to local storage
                        localStorage.setItem('HomeState', JSON.stringify(this.state));
                });
            });
    }

    render() {
        return (
            <div className="index-home">
                {/* here we don't want to render hero image before there is data in state , so we use ternery operator */}
                {this.state.heroImage ?
                    <div><HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                        title={this.state.heroImage.original_title}
                        text={this.state.heroImage.overview}
                    />
                        <SearchBar 
                            callback = {this.searchMovies}
                        />
                    </div> : null}
                
                <div className="index-home-grid">
                    <FourColGrid
                        header = {this.state.searchTerm ? "Search Result" : "Popular Movies"}
                        loading = {this.state.loading}>
                        {this.state.movies.map((element, i) => {
                            return (
                                <MovieThumb
                                    key = {i}
                                    clickable= {true}
                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` :
                                    "./images/no_image.jpg"}
                                    movieId = {element.id}
                                    movieName = {element.original_title}
                                />
                            )
                        })}
                    </FourColGrid>
                    {this.state.loading ? <Spinner /> : null}
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                        <LoadMoreBtn 
                            text="Load More"
                            onClick = {this.loadMoreBtn}
                        /> : null}
                </div>
                
                
            </div>
         
        )
    }
}

export default Home