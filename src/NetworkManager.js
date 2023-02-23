import axios, {isCancel, AxiosError} from 'axios';


export default {
    httpManager : async (
        url,
        type,
        body,
    ) => {
        try {
            const response = await axios({
              method: type,
              url: url,
              headers: {
                'content-type': 'multipart/form-data',
                // Authorization: `Bearer ${token}`,
              },
              data: body,
            });
            if (response.status === 200 || response.status === 201) {
              return response;
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
                // handleAxiosError(error);
              } else {
                // handleUnexpectedError(error);
              }
          }
          finally{

          }
    }
}

