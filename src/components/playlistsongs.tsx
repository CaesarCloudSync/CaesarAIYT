import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios"; 
import ReturnHome from "./ReturnHome";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import PlaylistSong from "./playlistsong";
export default function CaesarAIVideos(){
    const [NOCurrentDownloads,setNOCurrentDownloads] = useState(0)

   


    const [searchParams, setSearchParams] = useSearchParams();
    const [playlistLink,setPlaylistLink] = useState(`https://www.youtube.com/playlist?list=${searchParams.get("list")}`)
    const [videofeed,setVideoFeed] = useState([])

    const get_video_links = async () =>{
        const response = await axios.get(`https://caesaraiyoutube-qqbn26mgpa-uc.a.run.app/getplaylistvideos?url=${playlistLink}`)
        let videos = response.data.result
        //console.log(videos)
        setVideoFeed(videos)
    }
    const cleanfilename = (filename:any) =>{
        return filename.replace(/([^a-z0-9 ]+)/gi, '-');

    }

    useEffect(() =>{
        get_video_links()
    },[])

 



 
    return (
        <div >
            <div style={{position:"absolute",left:"40px",top:"40px"}}>
            <ReturnHome style={{fontSize:"50px",color:"white"}}/>
            </div>
    





            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"50px"}}>
               <h1 style={{color:"white",fontSize:"50px"}}>CaesarAIMusic Youtube</h1>
            </div>

            {videofeed.length > 0 &&
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px",gap:"20px",flexWrap:"wrap"}}>

                 {videofeed.map((video,ind) =>{return(
                    <PlaylistSong key={video.title} video={video} setNOCurrentDownloads={setNOCurrentDownloads} NOCurrentDownloads={NOCurrentDownloads}/>


                 )})}
                
            </div>
            }




            



        </div>
    )
}