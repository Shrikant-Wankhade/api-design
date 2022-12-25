import prisma from '../db'
import {comparePassword, createJWT, hashPassword} from '../modules/auth'

export const createNewUser = async (req,res,next)=>{ //throws error when creating a new user with same username.
    //why? - generally username, email are unique while name can be repeated. 
    //handle error for same user name posted by users.
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password) //error had occurred due to spelling mistakes.
            } //handle error
        })
        const token = createJWT(user);
    res.json({token: token})

    }catch(e) {
        e.type = 'input'
        next(e);
        
    }
    
    
}

export const signIn = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }         //what if user dont exist in the database - Handle errors
    })

const isValid = await comparePassword(req.body.password,user.password)
    if(! isValid){
        res.status(401)
        res.json({message:'nope'})
        return
    }
    const token = createJWT(user);
    res.json({token: token,
            message: "You are signed in"})
}