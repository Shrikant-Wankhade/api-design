import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import {protect} from './modules/auth'
import{createNewUser, signIn} from './dbhandlers/user'
import { resolve } from 'path'
import { features } from 'process'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/',(req,res, next)=>{
    res.json({message:"hello from router"});
})

app.use((req,res,next)=>{
    req.shhh_secret = 'doggy';
    next();
})



app.use('/api', protect, router);
app.post('/user',createNewUser);
app.post('/signIn',signIn);

app.use((err, req,res, next)=>{
    if(err.type === 'auth'){
        res.status(401).json({message:"unauthorized"})
    }else if (err.type === 'input') {
        res.status(400).json({message:"invalid input"})
    }else{
        res.json(500).json({message:"oops,thats on us"})
    }
})

export default app