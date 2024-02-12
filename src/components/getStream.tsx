export async function* getIterableStream(body:any){
    const reader = body.getReader()
    const decoder = new TextDecoder()
  
    while (true) {
      const { value, done } = await reader.read()
      if (done) {
        break
      }
      const decodedChunk = decoder.decode(value, { stream: true })
      yield decodedChunk
    }
  }

  export const generateStream = async (url:any)=> {
    const response = await fetch(
      url,
      {
        method: 'GET',
      }
    )
    if (response.status !== 200) throw new Error(response.status.toString())
    if (!response.body) throw new Error('Response body does not exist')
    return getIterableStream(response.body)
  }
  export const generateStreamPost = async (url:any,formData:any)=> {
    const response = await fetch(
      url,
      {
        body: formData,
        method: "post"
    }
    )
    if (response.status !== 200) throw new Error(response.status.toString())
    if (!response.body) throw new Error('Response body does not exist')
    return getIterableStream(response.body)
  }