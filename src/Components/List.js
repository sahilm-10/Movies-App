import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios'
import API_KEY from '../secrets';
export default class List extends Component {
  constructor(){
    super();
    this.state = {
      hover:"",
      parr : [1],
      currPage : 1,
      movies : []
    };
  }

  

    handleEnter=(id) =>{
      this.setState({
        hover:id
      });
    }

    handleLeave=() =>{
      this.setState({
        hover:'',
      });
    };
    changeMovies = async () =>{
      console.log("Change Movies")
      let ans = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
      );
      // console.log(ans.data);
      this.setState({
        movies:[...ans.data.results]
      })
    }
    handleNext = () =>{
      let tempArr = [];
      for(let i=1;i<=this.state.parr.length+1;i++){
        tempArr.push(i);  //[1,2]
      }
      this.setState({
        parr:[...tempArr],
        currPage : this.state.currPage + 1
      },this.changeMovies);
      console.log(this.state.currPage);
      
    }
  
    async componentDidMount(){
      console.log("componentDidMount called !!");
      // console.log(API_KEY);
      let ans = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
      );
      // console.log(ans.data);
      this.setState({
        movies:[...ans.data.results]
      })
    }
  render() {
    let movie = movies.results; //fetching movies
       
    return (
     <>
     
        {this.state.movies.length == 0 ?(
        <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        ):(
            <div>
                <h3 className='text-center text-title'>
                    <strong>Trending</strong>
                </h3>
                <div className="movie-list">
                    {this.state.movies.map((movieObj)=>(
                         <div className="card movie-card" 
                         onMouseEnter={() => this.handleEnter(movieObj.id)} 
                         onMouseLeave={this.handleLeave} >

                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top banner-img" alt="..."
                        style={{height:"40vh"}}
                        />
                        <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                        <div className="button-wrapper">
                          {
                            this.state.hover == movieObj.id &&
                            <a href="#" class="btn btn-danger movie-button">
                              Add to Favourites
                            </a>
                            // && -> if true then {} compare to if statement
                          }
                        
                  
                  </div>
                </div>
                     ))}
                </div>
                <div className='pagination'>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    {
                      this.state.parr.map(pageNum => (
                    <li class="page-item"><a class="page-link" href="#">{pageNum}</a></li>
                    
                      ))
                      }
                    <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
                  </ul>
                </nav>
                </div>
            </div>
        )
     }
     </>  
    )
  }
}
