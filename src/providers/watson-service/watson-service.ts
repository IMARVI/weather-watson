import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class WatsonService{
  wResponse: any;
  constructor(
    private http:Http,

  ){}

  mensaje(msn:string){
    var js = {
      "input": {
        "text": msn
      },
      "alternate_intents": true
    }
    var body = JSON.stringify(js);
    var header = new Headers(
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic MTU4M2U4NTEtNjNkNi00Njg5LTliY2UtOGFjNGQzYjY1ODNhOldkYUtDZjh4RnNFaA=="
       });

    this.http.post('https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/e3183c7a-3790-4efd-9ac2-deb7740f4044/message?version=2017-05-26',body,{headers:header}).subscribe(
      (response) => console.log(this.wResponse = response.json()),
      (error) => console.log(error)
    );
  }



}
