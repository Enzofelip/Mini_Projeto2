const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001

const user = [
    {
        id:uuidv4() ,
        name: "Enzo Felipe",
        age: 15,
        city: "Mogi das Cruzes"
    }
];


 app.get("/", (req, res) => {
    return  res.json("Hello Word")
 })

 app.get("/cadastros", (req, res) => {
    return res.status(200).json(user);
})

app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    const todo = user.find(todo => todo.id === id);

    res.status(200).json(todo)
})

app.post("/register",(req, res) => {
    const {name, age, city,} = req.body;

    const newCadastro = {
        id:   uuidv4(),
        name,
        age,
        city
    }

    console.log(newCadastro);

    user.push(newCadastro);
   return res.status(201).json(newCadastro)

})

app.patch("/:id", (req, res) => {
    const id = req.params.id;
    const {name, age, city} = req.body

    const todo = user.find(todo => todo.id === id);
    if(!todo){
        res.status(404).json({message: "ID não existente, tente novamente mais tarde..."})
        return
    }

    if(todo.id === id){
        todo.name = name;
        todo.age = age;
        todo.city = city
    }

    return res.status(200).json(todo);
})



app.delete("/:id", (req, res) => {
    const id = req.params.id;

    const index = user.findIndex((cadas) => cadas.id === id);

    user.splice(index, 1);

    return res.status(204).json({message: "Cadastro removido"})
})

app.listen(port, ()=> {
    console.log("Servidor rodando na prota 3001");
})

