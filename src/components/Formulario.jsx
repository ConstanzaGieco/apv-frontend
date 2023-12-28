import { useState, useEffect } from "react";
import Alerta from './Alerta';
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes();

    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'))
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
        
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault()
        //validar el formulario
        if([nombre,propietario,email,fecha,sintomas].includes('')){
            setAlerta({msg: 'Todos los campos son obligatorios', error:true})
            return;
        }
        setAlerta({msg: 'Guardado correctamente'})
        guardarPaciente({nombre,propietario,email,fecha,sintomas,id})
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }

    const {msg} = alerta;

    return (
        <>  
            <h2 className="font-black text-3xl text-center">Administrador de pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Añade a tus pacientes y {''} <span className="text-indigo-600 font-bold">Administrarlos</span></p>
            <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input type="text" placeholder="Nombre de la mascota" id="nombre" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={e => setNombre(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input type="text" placeholder="Nombre del propietario" id="propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={e => setPropietario(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
                    <input type="email" placeholder="Email del propietario" id="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                    <input type="date" id="fecha"className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={e => setFecha(e.target.value)}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Síntomas</label>
                    <textarea placeholder="Escribe los sintomas" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={sintomas} onChange={e => setSintomas(e.target.value)}/>
                </div>
                <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar paciente'} className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"/>
            </form>
            {msg && <Alerta alerta={alerta}/>}
        </>
    )
}

export default Formulario