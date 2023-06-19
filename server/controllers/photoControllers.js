
import download from 'image-downloader'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'//file sistem, modulo nativo de nodejs para manipular archivos en nuestro sistema



const __dirname = path.dirname(fileURLToPath(import.meta.url));
//const __dirname = ruta.split("controllers")
const __dir = __dirname.slice(0, -12)


export const byLink = async (req, res) => {
    try {
        const { link } = req.body
       // console.log('entro al backend')

        const newName = 'photo'+Date.now() + '.jpg'
        
        const options = {
            url: link,
            dest: __dir+'/uploads/'+newName
        }
            //https://a0.muscache.com/im/pictures/miso/Hosting-725618445959793719/original/708605de-376a-42b3-b84a-d66c88e7d246.jpeg?im_w=1200
        await download.image(options)
            .then(({ filename }) => {
                console.log('guardado en', filename)
            })
            .catch((err) => console.log(err))

            res.status(200).json(newName)

        } catch (error) {
        res.status(500).json(error.message)
    }
}




export const byDevice = (req, res) => {
    
    try {
        
        const uploadedFiles = []
        
        for (let index = 0; index < req.files.length; index++) {
            const {path, originalname} = req.files[index];
            const extension = originalname.split(".")[1]
            const newPath = path + '.' + extension
    
            fs.renameSync(path, newPath)
            console.log(req.files[index])
            uploadedFiles.push(newPath.replace("uploads\\",""))
        }
        res.json(uploadedFiles)
    
    } catch (error) {
        console.log(error)    
    }
    
}

//C:\Users\Personal\Desktop\MERN\airbnb-reserva-app\server\controllers\uploads\1681691905445.jpg

//57