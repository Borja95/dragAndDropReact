import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {


  const divDrag = useRef(null);
  const[dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  //Cuando entramos en el contenedor
  const handleDragIn = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
      setDragging(true);
    }
  }

    //cuando estamos sobre el contenedor
  const handleDrag = (e) =>{
    e.preventDefault();
    e.stopPropagation();
  }

  //cuando soltamos los archivos dentro del contenedor
  const handleDrop =(e) =>{
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    dragCounter.current = 0;
    if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
      //Aquí realizas la operación donde mandarás los archivos al backend o donde los mostrarás
      console.log('Archivos arrastrados', e.dataTransfer.items);
      console.log(e.dataTransfer.items[0]);
    }
  }

  //cuando salimos del contenedor
  const handleDragOut=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if(dragCounter.current === 0){
      setDragging(false);
    }
  }

  useEffect(()=>{

    const div = divDrag.current;

    if(div){
      div.addEventListener('dragenter', handleDragIn);
      div.addEventListener('dragover', handleDrag);
      div.addEventListener('drop', handleDrop);
      div.addEventListener('dragleave', handleDragOut);
    }

    return () =>{
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
      div.removeEventListener('dragleave', handleDragOut);
    }


  },[])



  return (
    <div className='App'>

      {/* Contenedor al que haremos drag and drop */ }
    <div
      ref={divDrag}
      className={dragging ? "main dragging" : "main"}
    >

      {dragging ? (
        <div className="containerDragging" onDragOver={handleDrag}>
          <div className="divCenter">
            <img src={require('./agregarArchivo.png')} width={50} height={50} alt='Logo Agregar Archivos' />
            &nbsp;
            Agregar Archivos
          </div>
        </div>
      ) :
        <div >
          Arrastra archivos aquí
        </div>
      }
    </div>
    </div>
  );
}

export default App;
