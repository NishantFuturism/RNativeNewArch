export const saveFileToServer = async (url,options) => {
    let resp = null;
    await fetch(url,options)
     .then(response => response.text())
     .then(result => {console.log(result);resp = result}).catch(err => console.log(err))
     
     return resp;
   }