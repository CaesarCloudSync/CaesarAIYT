import { Home } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
export default function ReturnHome({style={}}){
    const navigate = useNavigate()
    return(
        <div>
            <a onClick={() =>{navigate("/")}} style={{cursor:"pointer"}}>
            <Home style={style}/>
            </a>

        </div>
    )
}