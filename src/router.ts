import {Router} from 'express'
import { resolve } from 'path'
import {body, validationResult} from "express-validator"
import {handleInputErrors} from './modules/middlewares'
import { isString } from 'util'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './dbhandlers/product'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './dbhandlers/update'

const router = Router()


/**
 Product
 */

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(),handleInputErrors,(req,res)=>{
    
})
router.post('/product', body('name').isString(),handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 Update
 */

 router.get('/update', getUpdates)
 router.get('/update/:id', getOneUpdate)
 router.put('/update/:id',  
    body('title').optional(), 
    body('body').optional(), 
    body('status').isIn([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]).optional(), 
    body('version').optional(), 
    updateUpdate
 )
 router.post('/update',  
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    createUpdate
 )
 router.delete('/update/:id', deleteUpdate)
 


/*
Update point
*/ 
 router.get('/updatepoint', ()=>{})
 router.get('/updatepoint/:id', ()=>{})
 router.put('/updatepoint/:id',
    body('name').optional().isString(), 
    body('description').optional().isString(),
    ()=>{}
)
 router.post('/updatepoint',
    body('name').optional().isString(), 
    body('description').optional().isString(),
    body('updateId').exists().isString(),
    ()=>{}
 )
 router.delete('/updatepoint/:id', ()=>{})

 router.use((err, req,res,next)=>{
   console.log(err)
   res.json({message:"in router handler"})
 })

 export default router;