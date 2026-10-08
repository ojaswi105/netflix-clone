import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";

function Player() {

  const {id}= useParams()
  const navigate=useNavigate()

   const[apiData,setApiData]=useState({
      name:"",
      key:"",
      published_at:"",
      type:""
   })

   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNiNWI5OTkwMDZjNmZlMDg2YTIzN2Q2MTRiMTg4YiIsIm5iZiI6MTc5MDc2MjcwNi40OTYsInN1YiI6IjZhYmNkZWQyZmRlZWIyNzAzYjFlNzllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YTTOyGlij-MDDm42BbB4THCFddseX3zohNJJE7zLCME'
      }
   };

   useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
         .then(res => res.json())
         .then(res => setApiData(res.results[0]))
         .catch(err => console.error(err));
   }, [])

   return (
      <div className="player">
         <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}}/>
         <iframe height='90%' width="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            frameBorder="0" title="trailer" allowFullScreen></iframe>
         <div className="player-info">
            <p>{apiData.published_at}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
         </div>
      </div>
   )
}

export default Player
