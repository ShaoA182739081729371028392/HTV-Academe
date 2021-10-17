const axios = require("axios");

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "bb5cff18f2e44b87b9eee203f6473b94",
    "content-type": "application/json",
  },
});
function _base64ToArrayBuffer(base64) {
    base64 = base64.split(',')[1]
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
export function get_STT(data) {

    
    axios('http://localhost:4000/stt', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            data: {data: data},
          })
            .then(response => response.data)
            .catch(error => {
              throw error;
            });
    /*
    assembly
        .post("/upload", data)
        .then((res) => {
            let d = res.data['upload_url']
            assembly
                .post(`/transcript`, {
                    audio_url: d
                })
                .then((res) => {
                    let id = res.data['id'];
                    let status = 'queued'
                    let stored = {}
    
                    
                    console.log(id)
                       
                        assembly
                            .get(`/transcript/${id}`)
                            .then((res) => {
            
                                res = res.data;
                                console.log(res.data);                   
                                status = "done"
                                stored = res;
                                
                            })
                            .catch((e) => {
                                console.log(e);
                            })
                    }
                
                
        )});
        */
    
        
    

}

