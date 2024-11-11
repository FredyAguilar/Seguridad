import crypto from 'node:crypto';
import DBLocal from 'db-local';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './config.js';

// Crear esquema de base de datos con DBLocal
const { Schema } = new DBLocal({ path: `./db` });

// Definir el modelo User
const User = Schema(`User`, {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true}
});

// Clase UserRepository
export class UserRepository {
    // Método estático para crear un nuevo usuario
    static async create({ username, password }) {
        // Validaciones de username (opcional: usar zod o alguna librería)
        Validation.username(username)
        Validation.password(password)
        
        //2.Asegurarse que el username nooo existe 
        const user = User.findOne({ username})
        if (user) throw new Error (`el usuario ya existe`);

        const id=crypto.randomUUID ()
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()
            return id
        // Aquí puedes agregar la lógica para crear el usuario, por ejemplo:
        // const newUser = new User({ _id: generateId(), username, password });
        // return newUser.save();
    }

    // Método estático para login
    static async login({ username, password }) {
        // Lógica para login
     Validation.username(username)
     Validation.password(password)

     const user = User.findOne ({ username})
     if (!user) throw new Error(`El usuario no existe`)

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error(`La contraseña no es valida`)
            

            const { password: _, ...publicUser } = user

            return publicUser 
    }
}

class Validation {
    static username (username){

        if (typeof username !== `string`) throw new Error(`El nombre de usuario debe ser una cadena de texto`);
        if (username.length < 3) throw new Error(`El nombre de usuario debe tener al menos 3 caracteres`);
        
    }

    static password (password){
        if (typeof password !== `string`) throw new Error(`La contraseña debe ser una cadena de texto`);
        if (password.length < 6) throw new Error(`La contraseña debe tener al menos 6 caracteres`);
        

    }
}
