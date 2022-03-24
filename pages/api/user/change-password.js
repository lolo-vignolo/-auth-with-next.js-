import { getSession } from "next-auth/react";
import { hashPassword, verifyPasword } from "../../../helper/auth";
import { connectToDatabase } from "../../../helper/db";


async function handler (req, res) {

    //verifico que sea path 

    if(req.method !== "PATCH"){
        return;
    }

    // controla que el usuario esté autenticado.
    // veo si hay session iniciada, use el getSession que controla si del lado del seridor hay alguna session iniciada
    const session = await getSession({req: req})
    console.log(session);
    if(!session){
        res.status(401).json({message:"not authenticated!"})
        return;
    }
    ///////////

    //ahora se que esta auth, por lo cual sigo.

    const userEmail = session.user.email
    console.log(userEmail);
    const {oldPassword, newPassword} = req.body


    const client = await connectToDatabase();
    const db = client.db()
    const userCollection = db.collection('users')
    const existUser = await userCollection.findOne({email:userEmail}) 

    if(!existUser){
        res.status(404).json({message:"there is something wrong!"})
        client.close()
        return;
    }

    const currectPassword = existUser.password

    const passwordAreEqual = await verifyPasword(oldPassword, currectPassword)

    if(!passwordAreEqual){
        res.status(403).json({message: "You are not authorized to do it, the password are not equals "})
        client.close()
        return; 
    }

    const newPasswordHashed = await hashPassword(newPassword)

    //voy a la coleccion, con el updateOne me permite actualizar uno de los estados de lacolleccion
    // le paso dos argumentos, primero la referencia del usuario que quiero cambiar (en este caso el email),
    // segundo otro objeto que siempre va a ser $set que a la vez tiene un objeto dentro donde pongo la key que quiero cambiar 
    // con el nuevo valor.

    const result = await userCollection.updateOne({email: userEmail}, {$set: {password: newPasswordHashed}})
    res.status(200).json({message: "The password was updated"})
    client.close()
    
}

export default handler;