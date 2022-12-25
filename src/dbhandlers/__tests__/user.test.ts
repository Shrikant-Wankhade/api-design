import * as user from '../user'

describe('user handler',()=>{
    it('should do something when something happens',()=>{
        expect(1).toBe(1)
    })
})

//ytest for creating a new user
describe('user handler',()=>{  //before each afterAll

    it('should create a new user',async ()=>{
        const req = {body: {username: "hello", paasword: "hi"}}
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }}

        
    await user.createNewUser(req,res,()=>{})

    })
})


//never have stateful tests,delete stuff in the database after every single test
