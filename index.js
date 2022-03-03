// Emapscrip node js
// const http=require('http');

/* const app = http.createServer((request, response)=>{
    //Siempre tener en cuenta el tipo de retorno
    response.writeHead(200,{'Content':'application/json'});
    response.end('Hello World');
})
*/
// Utilizando express
const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
// cuando necesito hacer un body u otras cosas utilizamos
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Me tengo que sucribir a Youtube ',
    date: '2022-05-30T17:30:32.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Me tengo que sucribir a Facebook ',
    date: '2022-05-30T17:30:32.098Z',
    important: true
  },
  {
    id: 3,
    content: 'Me tengo que sucribir a Twiter ',
    date: '2022-05-30T17:30:32.098Z',
    important: true
  }
]

// En que path
app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id !== id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.import !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  console.log(newNote)

  response.status(201).json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
