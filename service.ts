import {v1 as uuid} from 'uuid';
import * as fs from "fs";
class HarService {
    private static instance: HarService;
  
    constructor() {
      if (!HarService.instance) {
        HarService.instance = this;
      }
      return HarService.instance;
    }
  
saveHarFile(file: Express.Multer.File): Promise<string> {
    return  new Promise((resolve, reject) => {
        if (!file) {
            return reject({code: 1, message: 'resource not found'});
        }       
        const path = `uploads/${uuid()}.har`;
       // resolve(path);
        fs.writeFile(path, file.buffer, 'binary', (e: any) => {
            if (e) {
              console.error(e);
              return reject({code: 3, message: 'file error', ...e});
            }                      
            resolve(path);
        });
    });     
  }
}
export default new HarService();
