import { Cancel } from "@mui/icons-material";
export default function ProgressBar({percentProgress,setPercentProgress,controllerRef,style={}}:any){

    return(
        <div style={style}>
            <div className="mb-1 text-lg font-medium" style={{color:"white"}}>Progress: {percentProgress}</div>
            <div style={{display:"flex",gap:"3px"}}>
                <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style={{width: `${percentProgress}%`}}></div>
                </div>
            {percentProgress > 0 &&
            <a onClick={() =>{
                if (controllerRef.current){
                    controllerRef.current.abort();
                    setPercentProgress(0)
                }

            }} style={{position:"relative",bottom:"3px",cursor:"pointer"}}>
            <Cancel style={{color:"white"}}/>
            </a>
            }
            </div>
        </div>
    )
}