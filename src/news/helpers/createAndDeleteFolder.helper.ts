import * as fs from 'fs'
export const createAndDeleteFolder = (folderPath) => {

  deleteFolder(folderPath);
  createFolder(folderPath);

}

const deleteFolder = (folderPath:string) =>{

  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((archivo) => {
      const archivoRuta = `${folderPath}/${archivo}`;
      if (fs.lstatSync(archivoRuta).isDirectory()) {
        deleteFolder(archivoRuta);
      } else {
        fs.unlinkSync(archivoRuta);
      }
    });
    fs.rmdirSync(folderPath);
  }
  
}


// Función para crear una carpeta
const createFolder = (ruta:string) => {

  if (!fs.existsSync(ruta)) {
  fs.mkdirSync(ruta);
}
};