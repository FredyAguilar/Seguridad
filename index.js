import express from 'express';
import { PORT } from './config.js';
import { UserRepository } from './user-repository.js';

const app = express();

app.get(`/`, (req, res) => {
    res.send(`¡Hola Fredy! ¿Cómo estás? ¿Qué me cuentas?`);
});

app.post(`/login`, (req, res) => {
    // Lógica de inicio de sesión aquí

});

app.post(`/register`, (req, res) => {
    // Lógica de registro aquí
    const { username, password } = req.body //??
    console.log (req.body)

    try{
            const id= UserRepository.create({username, password})
            res.send ({ id })
        } catch (error) {
            res.status (400).send ({error})
        }
        
        
});

app.post(`/logout`, (req, res) => {
    // Lógica de cierre de sesión aquí
});

app.get(`/protected`, (req, res) => {
    // Lógica para ruta protegida aquí
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
