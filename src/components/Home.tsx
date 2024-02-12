import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios"; 

import ReturnHome from "./ReturnHome";

import { useLocation } from "react-router";
import PlaylistFeed from "./playlistfeed";
import PlaylistSong from "./playlistsong";
import { useRef } from "react";
import { Home } from "@mui/icons-material";
export default function CaesarAIYoutube(){
    // Generate Blender Model in React -> https://gltf.pmnd.rs/
    const controllerRef = useRef<AbortController>()
    

    const [searchquery,setSearchQuery] = useState("");
    const [videofeed,setVideoFeed] = useState([]);
    const [getSingle,setGetSingle] = useState(true)
    const [playlistfeed,setPlaylistFeed] = useState([])
    const [initialfeed,setInitialFeed] =useState([])
    const [showsearch,setShowingSearch] = useState(false)
    const [NOCurrentDownloads,setNOCurrentDownloads] = useState(0)

    const getfeed = async () =>{
        if (controllerRef.current){
        controllerRef.current.abort();
        }
        setVideoFeed([])
        setShowingSearch(true)
        if(searchquery !== ""){
            if( getSingle === true){
                const response = await axios.get(`https://caesaraiyoutube-qqbn26mgpa-uc.a.run.app/searchfeed?query=${searchquery}&amount=50`)
                let videos = response.data.result
                //console.log(videos)
                setVideoFeed(videos)

                //setVideoFeed(videos)

            }
            else{
                const response = await axios.get(`https://caesaraiyoutube-qqbn26mgpa-uc.a.run.app/playlistsearchfeed?query=${searchquery}`)
                let videos = response.data.result
                //console.log(videos)
                setPlaylistFeed(videos)
   
            }


        }
    }
    const getintialfeed = async () =>{
            // https://api.spotify.com/v1/browse/new-releases

            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                },    
                body: new URLSearchParams({
                    "grant_type":"client_credentials",
                    "client_id":"50c42d50290a46f7b9f118c1ca4f8f58",
                    "client_secret":"f0319982991b4e2ea1677201caf8e4f9"
                })
            });
            const result = await response.json()
            //console.log(result)
            // https://api.spotify.com/v1/browse/new-releases
            const headers = {Authorization: `Bearer ${result.access_token}`}
            const resp = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=50', {headers: headers})
            const feedresult = await resp.json()
            //console.log(feedresult.albums.items)
            setInitialFeed(feedresult.albums.items)
    
    }
    const cleanfilename = (filename:string) =>{
        return filename.replace(/([^a-z0-9 ]+)/gi, '-');

    }
    function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(()=>{
           if (showsearch === false){
            getintialfeed()
           }
    },[showsearch])



 
    return (
        <div  >
            <div style={{position:"absolute",left:"40px",top:"40px"}}>
            <a  onClick={() =>{setVideoFeed([]);setShowingSearch(false);setPlaylistFeed([]);}} style={{cursor:"pointer"}}>
            <Home style={{fontSize:"50px",color:"white"}}/>
            </a>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
               <p style={{fontSize:"50px"}}>
                <span style={{color:"white"}}>CaesarAIMusic</span>
               <span style={{color:"red"}}>Youtube</span>
               </p>

            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
                <form onSubmit={(e) =>{e.preventDefault();getfeed()}}>
                    <input style={{width:"700px",height:"40px",padding:"1px"}} onChange={(e) =>{setSearchQuery(e.target.value)}} value={searchquery} placeholder="Search:"></input>

                </form>
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px",gap:"20px"}}>
                <div onClick={() =>{setGetSingle(true)}} style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:getSingle === true ? "blue": "white",borderRadius:"5px", width: "300px",height:"50px", cursor:"pointer"}}>
                    <a style={{color:getSingle  === true ? "white":"black"}} >Single</a>
                </div>
                <div  onClick={() =>{setGetSingle(false)}} style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:getSingle === true ? "white": "blue",borderRadius:"5px", width: "300px",height:"50px", cursor:"pointer"}}>
                    <a  style={{color:getSingle === true ? "black":"white"}}>Playlist</a>
                </div>
                
               
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"30px",flexWrap:"wrap",marginTop:"30px"}}>
                {initialfeed.length !== 0 && showsearch === false &&
                initialfeed.map((album) =>{
                    return(
                        <div style={{display:"flex",flexDirection:"column",color:"white"}}>
                            <img style={{width:"500px"}} src={album.images[0].url}></img>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <p>Artist: {album.artists[0].name} </p>
                                <p>{album.name} | {capitalizeFirstLetter(album.album_type)}</p>
                                <p>Total Tracks: {album.total_tracks}</p>
                                <p>Release Date: {album.release_date}</p>
                            </div>
                        </div>
                    )
                })
                }

            </div>
            
            {videofeed.length > 0 &&
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"30px",flexWrap:"wrap",marginTop:"30px"}}>
            {videofeed.map((video) =>{
                return(
                    <PlaylistSong key={video.title} video={video} setNOCurrentDownloads={setNOCurrentDownloads} NOCurrentDownloads={NOCurrentDownloads}/>
                )
            })}
            </div>
            }

           
            {playlistfeed.length > 0 &&
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"30px",flexWrap:"wrap",marginTop:"30px"}}>
                 {playlistfeed.map((playlist) =>{
                    return(
                    <PlaylistFeed key={playlist.title} playlist={playlist}/>
 


                 )})}
            </div>
            }





  

    


        </div>
    )
}