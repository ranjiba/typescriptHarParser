import  express from "express";
import {Server, Path, GET, POST, Context, ServiceContext, FileParam} from "typescript-rest";
import { Archive } from "@tracerbench/har";
import fs from "fs";
import HarService from './service';
import{Server as Wserver} from "ws";
import HarDto from './dto'

import multer from "multer"
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` });
const harRes  = {
    requestCount : 0,
    satusCount:0,
    request: Array(),
    content: Array(),
    hosts: Array()
} as  HarDto;
let status: Array<number> = [];

// WebSocket Server
const wsServer: Wserver = new Wserver({port:8085}); 
console.log('WebSocket server is listening on port 8085');
wsServer.on('connection', 
           websocket => websocket.send('This message was pushed by the typescriptHarParser')); 


@Path("/ProcessHar")
class ProcessHarService {    
    @POST
    @Path("upload")
   async testUploadFile( @FileParam("harFile") file: Express.Multer.File ) {
       console.log("rest");
      await HarService.saveHarFile(file)
        .then((res) =>{
            console.log(res)
            const archive: Archive = JSON.parse(fs.readFileSync(res).toString());

            for (const entry of archive.log.entries) {
              
                harRes.requestCount++;
                if(!status.includes(entry.response.status)){
                    status.push(entry.response.status)
                }
                let host : string | undefined = entry.serverIPAddress;
                if(host!== undefined && host !== '' && !harRes.hosts.includes(host)){                    
                   harRes.hosts.push(host);
                }    
                if(entry.response.status == 500){
                   harRes.request.push(entry.request);
                   harRes.content.push(entry.response.content);
                }
                /* wsServer.clients.forEach(function each(client) {
                    client.send("broadcast: url " + entry.request.url + " updated");
                  }); */
            }  
            console.log(harRes);   
            harRes.satusCount = status.length;
            console.log(status)    
        })
        .catch((reason)=>{
            console.log(reason)            
        });
   }
}
let app: express.Application = express();
Server.buildServices(app);

app.listen(3000, function() {
  console.log('Rest Server listening on port 3000!');
});

export default app;