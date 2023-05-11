import axios, { AxiosError } from 'axios';
import NetworkConstants from './constants/NetworkConstants';
import { NetworkStatusMessages } from './constants/NetworkStatusMessages';


export default {
    httpManager : async (
        type = NetworkConstants.request_type.get,
        url,
        headerType = NetworkConstants.headerTypes.normalHeader,
        body
    ) => {

      if(headerType.Authorization) {
          headerType.Authorization = 'Bearer ' + 'token';
      }

      let shouldAttachBaseURL = !url.includes('://') //  API parameter already have arbitrary base url.
      url = shouldAttachBaseURL ? `${NetworkConstants.appConfiguration.baseUrlDev}${url}` : url

      //create Body
      if (headerType['Content-Type'] === 'multipart/form-data') {
          body = createFormData(body)
      }
      else body = (type == NetworkConstants.request_type.get ? null : JSON.stringify(body))

      //create Url for Get
      if (type == NetworkConstants.request_type.get && body !== null) {
          let isfirstParameterAdded = false
          for (let [parameter, parameterValue] of Object.entries(body)) {
              if (isfirstParameterAdded) {
                  url = url + '&' + parameter + '=' + parameterValue
              }
              else {
                  url = url + '?' + parameter + '=' + parameterValue
                  isfirstParameterAdded = true;
              }
          }
      }

      if (__DEV__) console.log(
          "\n--------------------- [Network] ---------------------\nURL: " + url +
          "\nMethod: " + type +
          "\nHeaders: " + JSON.stringify(headerType) +
          "\nParameters:\n" + '', JSON.stringify(body) + "\n"
      )

        try {
            // const controller = new AbortController();
            // if(loading){
            //   controller.abort()
            // }
            console.log("PARAMS",{
              method: type,
              url: url,
              headers: headerType,
              data: body,
              signal: newAbortSignal(NetworkConstants.appConfiguration.serviceTimeOut)
            });
            const response = await axios({
              method: type,
              url: url,
              headers: headerType,
              data: body,
              signal: newAbortSignal(NetworkConstants.appConfiguration.serviceTimeOut)
            });
           
            switch (response.status) {
              case 200:
              console.log(NetworkStatusMessages[200])
              return response
              
              case 201:
              console.log(NetworkStatusMessages[201])
              return response

              case 204:
              console.log(NetworkStatusMessages[204])
              break

              case 304:
              console.log(NetworkStatusMessages[304])
              break

              case 400:
              console.log(NetworkStatusMessages[400])
              break

              case 401:
              console.log(NetworkStatusMessages[401])
              break

              case 403:
              console.log(NetworkStatusMessages[403])
              break

              case 404:
              console.log(NetworkStatusMessages[404])
              break

              case 405:
              console.log(NetworkStatusMessages[405])
              break

              case 415:
              console.log(NetworkStatusMessages[415])
              break

              case 429:
              console.log(NetworkStatusMessages[429])
              break

              case 500:
              console.log(NetworkStatusMessages[500])
              break
            
              default:
                break;
            }
          } catch (error) {
            if (axios.isAxiosError(err)) {
                AxiosError(err);
                console.error("isAxiosError",err);
              }
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);   
          }
          finally{
              console.log("stop the loader");
          }
    }


}


function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const createFormData = (body) => {
  const data = new FormData()
  Object.keys(body).forEach(key => {
      data.append(key, body[key])
  })
  return data
}