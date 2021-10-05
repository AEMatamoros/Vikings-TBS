const express = require('express');
const router = express.Router();

const multer  = require('multer')
//DB
const pool = require('../db/dbConnection');
// Multer
const storage= multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'uploads/profile')
    },
    filename:(req,file,callBack)=>{
        callBack(null,`pro${file.originalname}`)
    },
})

const upload= multer({storage:storage})

//Player CRUD ROUTES
router.post('/upload',upload.single('file'), async (req,res,next)=>{
    //UPLOAD FILE
    const file= req.file;

    if(!file){
        const err=new Error('Upload a File!') 
        err.httpStatusCode=400
        return next(err);
    }else{
        const imagen = `/profile/PRO${file.originalname}`
        res.send({"imagen":imagen});
    }
    
})
router.post('/',async (req,res)=>{
    const {nombre, descripcion, ataque,defensa, estrellas, imagen,vida} = req.body;

    const result = await pool.query(`
        INSERT INTO players(nombre, descripcion, ataque, defensa, estrellas, imagen,vida) 
        VALUES ("${nombre}","${descripcion}",${ataque},${defensa},${estrellas},"${imagen}",${vida})
    `);

    res.send(result);
})

        
router.get('/', async (req,res)=>{
    const result = await pool.query(`SELECT * FROM players`);
    res.send(result)
})
router.get('/:playerId', async (req,res)=>{
    const id = req.params.playerId
    const result = await pool.query(`SELECT * FROM players WHERE id = ${id}`);
    res.send(result[0])
})

router.delete('/:playerId', async (req,res)=>{
    const {playerId} = req.params
    const result = await pool.query(`DELETE FROM players where id = ${playerId}`);
    res.send(result)
})

router.put('/:playerId', async (req,res)=>{
    const {playerId} = req.params
    const {nombre, descripcion, ataque,defensa, estrellas, imagen} = req.body;
    const result = await pool.query(`UPDATE players 
    SET nombre="${nombre}",
        descripcion="${descripcion}",
        ataque=${ataque},
        defensa=${defensa},
        estrellas=${estrellas},
        imagen="${imagen}" 
    WHERE id = ${playerId}`);
    res.send(result)
})

router.put('/win/:playerId', async (req,res)=>{
    const { playerId } = req.params
    const { estrellas } = req.body;
    const result = await pool.query(`
        UPDATE players 
        SET estrellas=${estrellas + 1 } 
        WHERE id = ${playerId}
    `);
    res.send(result)
})

module.exports = router;