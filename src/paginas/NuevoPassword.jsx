import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [idValido, setIdValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams();
  const {id} = params;

  useEffect(()=>{
    const comprobarId = async () => {
      try{
        await clienteAxios(`/veterinarios/olvide-password/${id}`);
        setAlerta({msg: 'Coloca tu nuevo password'});
        setIdValido(true);
      }catch(error){
        setAlerta({msg: 'Hubo un error con el enlace', error:true})
      }
    };
    comprobarId();
  }, [])

  const {msg} = alerta;

  const handleSubmit = async e =>{
    e.preventDefault();
    if(password.length < 6){
      setAlerta({msg: 'El password debe ser minimo de seis caracteres', error:true});
      return;
    }
    try{
      const url = `/veterinarios/olvide-password/${id}`;
      const {data} = await clienteAxios.post(url, {password});
      setAlerta({msg: data.msg});
      setPasswordModificado(true);
    }catch(error){
      setAlerta({msg: error.response.data.msg, error:true});
    }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu password y no pierdas acceso a {""}<span className="text-black">tus pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {/* si en el mensaje hay algo, entonces crea el componente de alerta */}
        {msg && <Alerta alerta={alerta}/>}
        {idValido && 
        (<>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                  <input type="password" className="border w-full p-5 mt-3 bg-gray-50 rounded-xl gap-10" placeholder="Tu Nuevo Password" value={password} onChange={e => setPassword(e.target.value)}/>
              </div>
              <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>
        </>
        )}
        {passwordModificado && <Link to="/" className='block text-center my-5 text-gray-500'>Iniciar sesión.</Link>}
        
      </div>
    </>
  )
}

export default NuevoPassword