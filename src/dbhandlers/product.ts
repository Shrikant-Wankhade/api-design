import { before } from "node:test"
import { nextTick } from "process"
import prisma from "../db"

//GET ALL
export const getProducts = async (req,res)=>{
    const user = await prisma.user.findUnique({
        where: {            //to get the products we are actaully querying the user table. Beacuse we have products array on user table.
            id: req.user.id //why not req.body.user.id
        },
        include: {
            products: true
        }
    })
    res.json({data: user.products})
}

//GET ONE
export const getOneProduct = async (req,res)=>{
    const id = req.params.id //this is the id of product

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id //this is the id of user who requestwd this product
        }
    })

    res.json({data: product})
}

export const createProduct = async(req,res,next)=>{
    try{
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.json(product)
    }catch(e){   //by default all errors default to 500 status. so we dont have to explicity mention that
        next(e);
    }
    
}

export const updateProduct = async(req,res)=>{
    const updated = await prisma.product.update({
        //since update is also find ands write at the same time 
        where: {
            id: req.params.id,
            // belongsToId: req.user.id   //givimng erro rbut use this
        },
        data: {
            name: req.body.name
        }
    })
// if you do update many, you will not get back array of upadted products
//you will get back an object describing all the operations
// you did and you have to make the query to get them all

// but if you update one, you will get back the thing you updated
    res.json({data: updated})
}

export const deleteProduct = async(req,res)=>{
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            // belongsToId: req.user.id   
        },
        
    })

    res.json({data: deleted})
}

