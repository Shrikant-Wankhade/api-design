import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePassword = (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = async (password)=>{
    // const salt = await bcrypt.genSalt(5);
    return bcrypt.hash(password,5);
   
}


export const createJWT = (user)=>{
    const token = jwt.sign({
        id: user.id, 
        username: user.username
    },
        process.env.JWT_SECRET
    )
    return token;
}

export const protect = (req,res, next)=>{
    const bearer = req.headers.authorization;

    if(!bearer){
        res.status(401)
        res.json({message:'not authorized'})
        return; //if not returned, it will set waiting;
    }

    const [,token] = bearer.split(" ");
    if (!token) {
        res.status(401);
        res.send("Not authorized");
        return;
      }
      try{
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.user = user;
        next()
      }catch(e){
        console.error(e);
        res.status(401);
        res.json({message:"not a valid token"});
        return;
      }
}
