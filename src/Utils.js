import axios from 'axios';


export const saveFileToServer = async (url,options) => {
    let resp = null;
    await fetch(url,options)
     .then(response => response.text())
     .then(result => {console.log(result);resp = result}).catch(err => console.log(err))
     
     return resp;
   }


export const saveFileToServer2 = async (url,data,cb,controller) => {

  axios
  .post(url, data, {
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      signal : controller.signal,
      onUploadProgress: cb,
      maxRedirects: 0 ,
      maxRate: [10 * 1024], // 10KB/s limit
  }).then(async res => {
    
    console.log(res.status);
  })
  .catch(error => {
    console.log(error);
      throw error;
  });






   } 