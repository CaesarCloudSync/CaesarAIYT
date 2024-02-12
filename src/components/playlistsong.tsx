import axios from "axios";
import { useState} from "react";
import StreamMedia from "./StreamMedia";
import ProgressBar from "./ProgressBar";
import { useRef } from "react";
export default function PlaylistSong({video,NOCurrentDownloads,setNOCurrentDownloads}:any){

    const [percentProgress,setPercentProgress] = useState(0);

    const controllerRef = useRef<AbortController>()
    //console.log(video)

    return(
        <div>
        <a onClick={() =>{if(NOCurrentDownloads < 6){setNOCurrentDownloads(NOCurrentDownloads +1);StreamMedia(`https://www.youtube.com/watch?v=${video.id}`,video.title,setPercentProgress,controllerRef,setNOCurrentDownloads,NOCurrentDownloads)}else{alert("Max 6 concurrent downloads.")}}} style={{cursor:"pointer"}}>
            <div  style={{display:"flex",gap:"10px",width:"500px",flexDirection: "column"}}>
            <img style={{borderRadius:"5px"}} src={video.thumbnails[0].url}></img>
            <div style={{color:"white"}}>
                <p >{video.title}</p>
                {video.viewCount !== undefined && <p>{video.viewCount.short} &#x2022; {video.publishedTime}</p> }
                <div style={{display:"flex",gap:"5px"}}>
                    {video.channel.thumbnails !== undefined &&<a href={`https://www.youtube.com${video.channel.link}`}><img style={{width:"30px",height:"30px",borderRadius:"100px"}} src={video.channel.thumbnails[0].url}></img></a>}
                    <a href={`https://www.youtube.com${video.channel.link}`}><p style={{position:"relative",top:"5px",color:"white",textDecoration: "underline"}}>{video.channel.name}</p></a>
                    <p></p>    
                </div> 
            </div>
        </div>
        </a>
        <ProgressBar style={{marginTop:"10px"}} key={video.title} setPercentProgress={setPercentProgress} percentProgress={percentProgress} controllerRef={controllerRef}/>


        

        </div>
    )
}