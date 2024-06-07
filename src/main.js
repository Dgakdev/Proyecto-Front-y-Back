import React, { useState } from 'react';

function App() {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [logueado, setLogueado] = useState(false);

    function cambiarUsuario(evento) {
        setUsuario(evento.target.value);
    }

    function cambiarClave(evento) {
        setClave(evento.target.value);
    }

    async function login(evento) {
        evento.preventDefault();
        const response = await fetch(`http://localhost:3002/login?usuario=${usuario}&clave=${clave}`);
        const data = await response.json();
        
        if (data.success) {
            setLogueado(true);
        } else {
            alert('Login failed');
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                <input 
                    type="text" 
                    id="username" 
                    value={usuario} 
                    onChange={cambiarUsuario} 
                    placeholder="Username" 
                />
                <input 
                    type="password" 
                    id="password" 
                    value={clave} 
                    onChange={cambiarClave} 
                    placeholder="Password" 
                />
                <button id="button" type="submit">Login</button>
            </form>
            {logueado && <p>Logged in successfully!</p>}
        </div>
    );
}

export default App;
