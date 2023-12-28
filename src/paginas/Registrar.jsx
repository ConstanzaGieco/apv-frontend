import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setrepetirPassword] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }
    if(password != repetirPassword){
      setAlerta({msg: 'Los password no son iguales', error: true});
      return;
    }
    if(password.length < 6){
      setAlerta({msg: 'El password es muy corto, agrega mínimo 6 caracteres.', error: true});
      return;
    }
    setAlerta({});

    /* Crear el usuario en la API */
    try{
      //A diferencia del backend que es process.env acá es import.meta por lo que estamos trabajando con vite
      const url = `/veterinarios`;
      await clienteAxios.post(url, {nombre, email, password});
      setAlerta({msg: 'Creado correctamete, revisa tu email', error: false})
    }catch(error){
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }
  
  const {msg} = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra {""}<span className="text-black">tus pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {/* si en el mensaje hay algo, entonces crea el componente de alerta */}
          {msg && <Alerta alerta={alerta}/>}

          <form action="" onSubmit={handleSubmit}>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                  <input type="text" className="border w-full p-5 mt-3 bg-gray-50 rounded-xl gap-10" placeholder="Tu Nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                  <input type="email" className="border w-full p-5 mt-3 bg-gray-50 rounded-xl gap-10" placeholder="Email de Registro" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                  <input type="password" className="border w-full p-5 mt-3 bg-gray-50 rounded-xl gap-10" placeholder="Tu Password" value={password} onChange={e => setPassword(e.target.value)}/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                  <input type="password" className="border w-full p-5 mt-3 bg-gray-50 rounded-xl gap-10" placeholder="Repite tu Password" value={repetirPassword} onChange={e => setrepetirPassword(e.target.value)}/>
              </div>
              <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>
              <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia sesión.</Link>
              <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvidé mi password.</Link>
          </nav>
        </div>
    </>
  )
}

export default Registrar