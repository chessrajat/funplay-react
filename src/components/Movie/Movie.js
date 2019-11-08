import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../../config";
import Navigation from '../Elements/Navigation/Navigation';
import MovieInfo from '../Elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../Elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../Elements/FourColGrid/FourColGrid';
import Actor from '../Elements/Actor/Actor';
import Spinner from '../Elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component{

    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
        
    }

    componentDidMount() {
        this.setState({ loading: true });
        //first fetch the movie
        //this.props.param.match.movieId ,, matching the browser router.
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}`;
        this.fetchItems(endpoint)
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                // we check for status code to check if we find  movie or not
                if (result.status_code) {
                    this.setState({ loading: false })
                } else {
                    // set state function also accept a callback function
                    this.setState({ movie: result }, () => {
                        //fetch movies in the set state
                        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`
                        fetch(endpoint)
                            .then(result => result.json())
                            .then(result => {
                                //we are going to use filter function in javascript
                                //this filters array based on condition and add it to another array
                                const directors = result.crew.filter((member) => member.job === "Director");
                                this.setState({
                                    actors: result.cast,
                                    directors: directors,
                                    loading: false
                                })
                            })
                    })
                }
            }).catch((err) => console.log("error", err));
    }

    render() {
        return (
            <div className="rmdb-movie">
                {this.state.movie ?
                    <div>
                        <Navigation movie={this.state.movie.original_title} />
                        <MovieInfo movie={this.state.movie}
                            directors={this.state.directors}
                        />
                        <MovieInfoBar
                            time={this.state.movie.runtime}
                            budget={this.state.movie.budget}
                            revenue={this.state.movie.revenue}
                        />
                    </div> : null
                }
                {this.state.actors ?
                    <div className="rmdb-movie-grid">
                        <FourColGrid
                            header={"Actors"}>
                            {this.state.actors.map((element, i) => {
                                return <Actor
                                    key={i}
                                    actor={element}
                                />
                            })}
                        </FourColGrid>
                    </div>:null
                }

                {!this.state.actors && !this.state.loading ? <h1>No Movie Found !</h1> : null}
                {this.state.loading ? <Spinner /> : null}
            </div>
        )
    }
}

 
export default Movie;