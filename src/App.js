import React, { useState } from 'react';
import './App.css';
import './index.css';
import './main';

function App() {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [logueado, setLogueado] = useState(false);
    const [error, setError] = useState(null);

    const cambiarUsuario = (evento) => {
        setUsuario(evento.target.value);
    }

    const cambiarClave = (evento) => {
        setClave(evento.target.value);
    }

    const login = async (evento) => {
        evento.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/login?usuario='+usuario+'&clave='+clave, {
                method: 'GET', // Cambiar a 'POST' si es necesario
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify({ usuario, clave }) // Solo necesario si estás enviando datos en el cuerpo
            });

            const data = await response.text();

            if (data === 'inicio de sesion exitoso') {
                setLogueado(true);
                setError(null);
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError('Error connecting to the server');
        }
    }

    return (
        <div className="App">
            <form onSubmit={login}>
                <div className="title">Login</div>
                <label>
                    <input 
                        type="text" 
                        value={usuario} 
                        onChange={cambiarUsuario} 
                        placeholder="Username" 
                    />
                </label>
                <label>
                    <input 
                        type="password" 
                        value={clave} 
                        onChange={cambiarClave} 
                        placeholder="Password" 
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            {logueado && <p>Logged in successfully!</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default App;
