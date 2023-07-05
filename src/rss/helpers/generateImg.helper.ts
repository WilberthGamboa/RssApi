
import {join} from "path";

import * as fs from "fs/promises"

export const generateImg = async (dataBuffer,imgName):Promise<void> =>{

    const filePath = join(process.cwd(), '/src/upload', imgName);
    try {
        fs.writeFile(filePath, dataBuffer);
      } catch (error) {

      }
  
}