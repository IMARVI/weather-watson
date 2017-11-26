import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class WatsonService{
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

    return this.http.post('https://watson-api-explorer.mybluemix.net/conversation/api/v1/workspaces/a18b3e20-f01c-4a7a-91c8-8e367e5d45e5/message?version=2017-05-26',body,{headers:header})
  }



}
