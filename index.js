const express = require('express'), 
mysql = require('mysql'),
cors = require('cors'),
app = express(),
port = 3000,
router = express.Router()
;

const corsOption = {
    origin : '*',
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders : '*'
};

app.use(cors(corsOption));
app.use(express.json());

app.get("/",(req,res)=>{
    const htmlReponse= `
        <html>
            <head>
                <title>Node y expres en vercel</title>
            </head>
            <body>
                <h1>soy un proyecto en back</h1>
            </body>
        </html>
    `;
    res.send(htmlReponse);
    console.log("si jala")
})

router.post("/login",(req,res)=>{
    let data = req.body,
    values = [data.user, data.password],
    clientExist;
    conection.query("SELECT user FROM ahorcado WHERE user = ? AND password = ?",values, (e,r)=>{
      if(e){
        console.error(e)
      }else if(r.length > 0){
          clientExist = true;
      }else{
        console.log("no se encontro el usuario en la base de datos");
        clientExist = false;
      }
      res.send(clientExist);
    })
})

router.post("/register",(req,res)=>{
    let data = req.body,
    values= [data.user,data.password],userRegister;
    conection.query("SELECT * FROM ahorcado",(e,r)=>{
        for(let i = 0; i < r.length;i++){
            console.log(data.user, r[i].user);
            if(data.user == r[i].user){
                userRegister = true;
                break;
            }else{
                userRegister = false;
            }
        }
        if(userRegister == false){
            conection.query("INSERT INTO ahorcado(user,password) VALUES(?,?)",values,(e,r)=>{
                if(e){
                    console.error(e);
                }
            })
        }
        res.send(userRegister);
    })
})

router.post("/postPoints",(req,res)=>{
    let data = req.body;
    values = [data.points,data.user];
    conection.query("UPDATE ahorcado SET points= ? WHERE user = ?",values,(e,r)=>{
        if(e){
            console.log(e)
        }else{
            console.log("el cliente se a modificado");
        }
    })
})

router.get("/getPoints",(req,res)=>{
    conection.query("SELECT points FROM ahorcados WHERE user = 'jesus' ",(e,r)=>{
        if(e){
            console.error(e)
        }else{
            res.json(r);
        }
    })
})


app.use("/api",router)

const server = app.listen(port,()=>{
    console.log("servidor inicializado en el puero: ",port);
})

const conection = mysql.createConnection({
    host : 'bn4nadxq6yjssjlgvlu5-mysql.services.clever-cloud.com',
    database : 'bn4nadxq6yjssjlgvlu5',
    user : 'upasvbsuqyznwbzx',
    password : 'QvRdDizXrOs6evMS683I',
})

conection.connect((err)=>{
    if(err){
        console.log("error al conectar con la base de datos");
    }else{
        console.log("coneccion exitosa a la base de datos");
    }
})
