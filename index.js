import express from 'express'
import cors from 'cors'
import fse from 'fs-extra'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/todos', async (req, res) => {
    const todos = await fse.readFileSync(`database.json`)
    res.send(todos)

})
app.post('/add', async (req, res) => {
    const todo = req.body
    const todos = await fse.readFileSync(`database.json`)
    const parsedTodos = JSON.parse(todos)
    parsedTodos.unshift(todo)
    await fse.outputFile(`database.json`, JSON.stringify(parsedTodos));
    res.json(parsedTodos)
})

app.post('/done', async (req, res) => {
    const { id } = req.body
    console.log(id)
    const todos = await fse.readFileSync(`database.json`)
    const parsedTodos = JSON.parse(todos)
    const updatedTodos = parsedTodos.map(todo => {
        if (todo.id === id) {
            return { ...todo, done: true }
        }
        return todo
    })
    await fse.outputFile(`database.json`, JSON.stringify(updatedTodos));
    res.json(updatedTodos)
})




app.listen(4000, () => {
    console.log('listening on 4000')
})