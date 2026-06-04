import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"/public/images")
    },
    filename: function(req,filename,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    }
})

export const upload = multer({storage:storage});