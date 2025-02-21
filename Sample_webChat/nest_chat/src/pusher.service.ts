import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
    pusher: Pusher;

    constructor(){
        this.pusher = new Pusher({
            appId: "1945175",
            key: "84618a4b8ef7e795c3be",
            secret: "518f95bad10209d3ecee",
            cluster: "ap2",
            useTLS: true
          });
    }

    async trigger(channel:string, event:string, data:any){
        await this.pusher.trigger(channel,event,data)
    }
}
