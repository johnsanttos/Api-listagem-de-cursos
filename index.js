const express = require('express')


const server = express()

server.use(express.json())


const cursos = [ 'NodeJs' , 'javascript', 'React Native']

server.get("/cursos", (req,res)=>{
	return res.json(cursos)
})

// Query params = ?nome=NodeJS
// Rout Params = /curso/2
// Request Body = {nome: 'NodeJs', tipo: 'Backend'  }

//localhost:3000/curso
server.get('/cursos/:index', (req,res) => {

	const {index} = req.params
	
	return res.json(cursos[index])
})

//criando um novo curso
server.post('/cursos',(req, res) =>{
	const {name} = req.body;
	cursos.push(name)

	return res.json(cursos)
})

//atualizando um curso

server.put('/cursos/:index',(req,res)=>{
	const {index} =req.params;
	const{name} =req.body
	cursos[index] = name
	return res.json(cursos)
})
server.listen(3000)