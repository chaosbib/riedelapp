import Axios from "axios";

export class DataSetService {
  private token: string = "f82f0bf1fd54d297981f3452efbd9e8001a15032b69245affb9bfa1fabe5d0cd";
  
  public getDataSet(): Promise<{}> {
    return new Promise(async (resolve, reject) => {
      const getDataSetUrl: string = "https://www.igtimi.com/api/v1/resources/data?";
      const accessToken: string = `access_token=${this.token}`
      const startTime: string = "&start_time=1328480640000";
      const endTime: string = "&end_time=1328486508000";
      const types: string = "&types[1]=0.00009";
      const serialNumbers: string = "&serial_numbers[]=FA-AA-AAAM"
      const request: string = getDataSetUrl + accessToken + startTime + endTime + types + serialNumbers;

      Axios.get(request)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        })
    })
  }
}