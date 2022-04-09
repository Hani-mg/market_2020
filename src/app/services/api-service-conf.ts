export class ApiServiceConf{
    serverUrl: string = "assets/datas/";
    serverUrlV1: string = "assets/datas/v1/";
    serverUrlV2: string = "assets/datas/v2/";
    // serverUrlOnline: string = "https://market.herokuapp.com/wp-json/market/v2/"
    serverUrlOnline: string = "https://www.market.com/wp-json/market/v2/"
    
   
    concatParam(paramArray){
        let urlParam ='';
        let index = 0;
        for(let param of paramArray){
          urlParam += '&' + param.name + '=' + param.value;
          index++;
        }
        return urlParam;
      }
}