import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import './App.css';

function App() {
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showPasswordIndex, setShowPasswordIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('passwords');
    if (saved) setPasswords(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }, [passwords]);

  const handleAddOrEdit = () => {
    if (!website || !username || !password) return alert('¡Todos los campos son obligatorios!');

    const newEntry = { website, username, password };

    if (editingIndex !== null) {
      const updated = [...passwords];
      updated[editingIndex] = newEntry;
      setPasswords(updated);
      setEditingIndex(null);
    } else {
      setPasswords([...passwords, newEntry]);
    }

    setWebsite('');
    setUsername('');
    setPassword('');
  };

  const handleEdit = (index) => {
    const entry = passwords[index];
    setWebsite(entry.website);
    setUsername(entry.username);
    setPassword(entry.password);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm('¿Seguro que quieres eliminar esta contraseña?')) {
      const updated = passwords.filter((_, i) => i !== index);
      setPasswords(updated);
    }
  };

  const handleClearFields = () => {
    setWebsite('');
    setUsername('');
    setPassword('');
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex flex-col items-center p-4 mt-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Gestor de Contraseñas 🔐</h1>

        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4">
          <input
            type="text"
            placeholder="Sitio web"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex gap-2'>
            <button
              className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200'
              onClick={handleAddOrEdit}
            >
              {editingIndex !== null ? 'Editar contraseña' : 'Guardar contraseña'}
            </button>
            <button
              className='w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-md transition duration-200'
              onClick={handleClearFields}
            >
              Limpiar
            </button>
          </div>
        </div>
        <div className="w-full max-w-md mt-6 space-y-4">
          {passwords.length === 0 ? (
            <p className="text-center text-gray-600 font-semibold">No hay contraseñas guardadas.</p>
          ) : (
            passwords.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p><strong>Sitio:</strong> {item.website}</p>
                  <p><strong>Usuario:</strong> {item.username}</p>
                  <p className='flex items-center gap-2'>
                    <strong>Contraseña: </strong>
                    {showPasswordIndex === index ? item.password : '••••••••'}
                    <button
                      onClick={() =>
                        setShowPasswordIndex(showPasswordIndex === index ? null : index)
                      }
                      className='text-purple-600 hover:text-purple-800'
                    >
                      {showPasswordIndex === index ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-sm bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
                    onClick={() => handleEdit(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                    onClick={() => handleDelete(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
