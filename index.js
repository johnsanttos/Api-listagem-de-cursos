const express = require('express')

const server = express()

server.use(express.json())

const cursos = ['NodeJs', 'javascript', 'React Native']

//Middleware Global
server.use((req, res, next) => {
  console.log(`URL CHAMADA ${req.url}`)
  return next()
})

function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nome do curso é obrigatorio!' })
  }
  return next()
}

function checkIndexCurso(req,res, next){
const curso = cursos[req.params.index]
if(!curso){
	return res.status(400).json({error: "O curso não existe"})
}

req.curso = curso
return next()
}

server.get('/cursos', (req, res) => {
  return res.json(cursos)
})

// Query params = ?nome=NodeJS
// Rout Params = /curso/2
// Request Body = {nome: 'NodeJs', tipo: 'Backend'  }

//localhost:3000/curso
server.get('/cursos/:index',checkIndexCurso, (req, res) => {
  const { index } = req.params

  return res.json(req.curso)
})

//criando um novo curso
// .push adiciona item ao array
server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body
  cursos.push(name)

  return res.json(cursos)
})

//atualizando um curso

server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params
  const { name } = req.body
  cursos[index] = name
  return res.json(cursos)
})

//excluindo curso
// splice do javascript deleta do array
server.delete('/cursos/:index', (req, res) => {
  const { index } = req.params

  cursos.splice(index, 1)
  //return res.json(cursos)
  return res.json({ message: 'Curso deletado com sucesso!' })
})
server.listen(3000)
