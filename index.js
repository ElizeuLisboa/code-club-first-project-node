import express from "express"

import { v4 as uuid } from 'uuid';

const port = 3000
const app = express()
app.use(express.json())


const usuario = []


const checkUserId = (req, res, next) => {
    const { id } = req.params

    const index = usuario.findIndex( user => user.id ) 

    if(index <0)
        return res.status(404).json({error: "User not found"})
    
    req.userIndex = index
    req.userId = id
    next()
}


app.get('/users', (req, res) => {
  
    const { name, age } = req.body    
   

    return res.json({usuario})
})

app.post('/users', (req, res) => {
    
    const { name, age } = req.body    
    
    const users = { id:uuid(), name, age }
   
    usuario.push(users)


    return res.status(201).json({usuario})
})

app.put('/users/:id', checkUserId, (req, res) => {
    const { name, age } = req.body    
    const index = req.userIndex
    const id = req.userId

    const updateUser = { id, name, age }
    
    usuario[index] = updateUser

    return res.json({updateUser})
})


app.delete('/users/:id', checkUserId, (req, res) => {
    const index = req.userIndex
   
    usuario.splice(index,1)

    return res.status(204).json({})
})



app.listen(port, () =>{
    console.log(' Server running on port ${port}' )
})