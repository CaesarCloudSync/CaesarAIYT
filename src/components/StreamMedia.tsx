import axios from "axios";
export default async  function StreamMedia (youtubeurl:string,videotitle:string,setPercentProgress:any,controllerRef:any,setNOCurrentDownloads:any,NOCurrentDownloads:any){
    const resp:any =await axios.get(`https://caesaraiyoutube-qqbn26mgpa-uc.a.run.app/getaudiowatch?url=${youtubeurl}`)
    let media = resp.data.media
    //console.log(media)


    controllerRef.current = new AbortController()
    const signal = controllerRef.current.signal
    const response = await fetch(media, {signal})
    if (response.body){
        const contentLength = response.headers.get("Content-Length");
        const totalLength = typeof contentLength === "string" && parseInt(contentLength)
        const reader = response.body.getReader();
        const chunks = [];
        let recievedLength = 0;
        while(true){
            const {done,value} = await reader.read();
            if (done){
                console.log("done")
                break;
            }
 
            //console.log(value)
            recievedLength += value.length
            //console.log(typeof totalLength)
            if (typeof totalLength === "number"){
                const percent = (recievedLength / totalLength) * 100
                setPercentProgress(percent)
            }
            chunks.push(value)
        }
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url
        a.download = `${videotitle}.mp3`;
        a.click()
        setNOCurrentDownloads(NOCurrentDownloads - 1)
        function handleDownload(){
            setTimeout(() =>{
                URL.revokeObjectURL(url);
                a.removeEventListener("click",handleDownload);
            },150)

        }
        a.addEventListener("click",handleDownload,false)

    }

    //setURLInput(response.data.media)





}