import express from 'express';
import { PORT } from './config.js';
import { UserRepository } from './user-repository.js';

const app = express();
app.use(express.json())


app.get(`/`, (req, res) => {
    res.send(`¡Hola Fredy! ¿Cómo estás? ¿Qué me cuentas?`);
});

app.post(`/login`, async (req, res) => {
    // Lógica de inicio de sesión aquí
    const {username, password } = req.body
    try {
        const user = await UserRepository.login ({ username, password})
        res.send ({ user })
    } catch (error) {
        res.status(401).send(error.message)
    }

});

app.post(`/register`, async (req, res) => {
    // Lógica de registro aquí
    const { username, password } = req.body //??
    console.log (username, password)

    try{
            const id= await UserRepository.create({username, password})
            res.send ({ id })
        } catch (error) {
            res.status (400).send ({error: error.message})
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
