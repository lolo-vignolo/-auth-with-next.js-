import { hashPassword } from "../../../helper/auth";
import { connectToDatabase } from "../../../helper/db";



 async function handler (req, res) {

    // chequeo que la infoque venga en el body este bien

    if(req.method !== "POST"){
        return;
    }

        const data = req.body
    
        const {email,password} = data 
        if (
            !email ||
            !email.includes('@') ||
            !password ||
            password.trim().length < 7
          ) {
            res.status(422).json({
              message:
                'Invalid input - password should also be at least 7 characters long.',
            });
            return;
          }
    
        // hago la coneccion
    
       const clientConection = await connectToDatabase();
       const db = clientConection.db()

       // veo si y esxiste 

       const existUser = await db.collection('users').findOne({email:email})

       if(existUser){
            res.status(422).json({message:"there already exist an user with that Email"}
            )
            clientConection.close()
           return;
           
       }
    
       // encripto password usando el helper
    
       const myPassword = await hashPassword(password)
    
       // creo un nuevo usuario en la colección deseada 
    
       const result = await db.collection('users').insertOne({
           email:email,
           password:myPassword
       })
    
       res.status(201).json({message:'Created User'});
       clientConection.close()


}

export default handler