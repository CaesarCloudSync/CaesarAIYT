import { useNavigate } from "react-router-dom";
export default function PlaylistFeed({playlist}:any){
    const navigate =  useNavigate();
 
    return(
        
        <a onClick={() =>{    navigate({
            pathname: '/playlistsongs',
            search: `?list=${playlist.id}&playlistname=${playlist.title}`,
          })}} style={{cursor:"pointer"}}>
           <div  style={{display:"flex",gap:"10px",width:"500px",flexDirection: "column"}}>
            <img style={{borderRadius:"5px"}} src={playlist.thumbnails[0].url}></img>
            <div style={{color:"white"}}>
                <p >{playlist.title}</p>
                <p>Videos: {playlist.videoCount}</p>

                <div style={{display:"flex",gap:"5px"}}>
                    <a href={playlist.channel.link}><img style={{width:"30px",height:"30px",borderRadius:"100px"}} src={playlist.thumbnails[0].url}></img></a>
                    <a href={playlist.channel.link}><p style={{position:"relative",top:"5px",color:"white",textDecoration: "underline"}}>{playlist.channel.name}</p></a>
                    <p></p>    
                </div> 
            </div>
        </div>
        </a>
    )
}