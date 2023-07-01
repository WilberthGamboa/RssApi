import {v4 as uuid} from 'uuid'
export const uuidImgGenerator = () =>{
    const fileName = uuid()+"."+'png';
    return fileName;
}