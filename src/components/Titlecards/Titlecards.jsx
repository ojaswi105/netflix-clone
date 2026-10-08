import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import Cards_data from "../../assets/cards/Cards_data.js";
import { Link } from "react-router-dom";

function TitleCards({title, category}){

     const cardsRef= useRef()
     const[apiData,setApiData]=useState([])

     const handleWheel=(event)=>{
              event.preventDefault()
              cardsRef.current.scrollLeft += event.deltaY
     }

     const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNiNWI5OTkwMDZjNmZlMDg2YTIzN2Q2MTRiMTg4YiIsIm5iZiI6MTc5MDc2MjcwNi40OTYsInN1YiI6IjZhYmNkZWQyZmRlZWIyNzAzYjFlNzllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YTTOyGlij-MDDm42BbB4THCFddseX3zohNJJE7zLCME'
  }
};


     useEffect(()=>{

fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res =>setApiData(res.results))
  .catch(err => console.error(err));

              cardsRef.current.addEventListener('wheel',handleWheel)
     },[])

   return(
   <div className="title-cards">
         <h2>{title?title:'Popular on Netflix'}</h2>
         <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
                  return <Link to={`/player/${card.id}`} className="card" key={index}>
                             <img src={'https://image.tmdb.org/t/p/w500/'+card.backdrop_path} alt="" />
                             <p>{card.original_title}</p>
                  </Link>
            })}
         </div>
   </div>
   )
}

export default TitleCards
