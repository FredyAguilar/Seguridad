import DBLocal from 'db-local';
import crypto from 'crypto'
// Crear esquema de base de datos con DBLocal
const { Schema } = new DBLocal({ path: './db' });

// Definir el modelo User
const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true }
});

// Clase UserRepository
export class UserRepository {
    // Método estático para crear un nuevo usuario
    static create({ username, password }) {
        // Validaciones de username (opcional: usar zod o alguna librería)
        if (typeof username !== `string`) throw new Error(`El nombre de usuario debe ser una cadena de texto`);
        if (username.length < 3) throw new Error(`El nombre de usuario debe tener al menos 3 caracteres`);
        
        if (typeof password !== `string`) throw new Error(`La contraseña debe ser una cadena de texto`);
        if (password.length < 6) throw new Error(`La contraseña debe tener al menos 6 caracteres`);
        
        //2.Asegurarse que el username nooo existe 
        const user = User.findOne({ username})
        if (user) throw new Error (`el usuario ya existe`);

        const id=crypto.randomUUID ()


        User.create({
            _id: id,
            username,
            password
        }).save()
            return id
        // Aquí puedes agregar la lógica para crear el usuario, por ejemplo:
        // const newUser = new User({ _id: generateId(), username, password });
        // return newUser.save();
    }

    // Método estático para login
    static login({ username, password }) {
        // Lógica para login
    }
}