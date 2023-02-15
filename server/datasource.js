import { RESTDataSource } from '@apollo/datasource-rest'; 

class HdbApi extends RESTDataSource {
    baseURL = process.env.HDB_INSTANCE_URL;
    
    constructor(options) {
      super(options);
      this.token = options.token;
    };
  
    async sqlQuery(body) {
      // for read operations
      return await this.post(
        '',
        {
          body,
        }
      ).then((res) => {
        return res;
      })
    };
  
    async noSqlQuery(body) {
      return await this.post(
        '',
        {
          body,
        }
      ).then((res) => {
        const { message } = res;
        return {
          status: 200,
          message
        }
      }).catch((err) => {
        const { status, body } = err.extensions.response;
        const message = body.error;
  
        return {
          status,
          message
        }
      });
    };
  
    willSendRequest(_path, request) {
      request.headers['authorization'] = this.token;
    };
  
  };

  export default HdbApi;
