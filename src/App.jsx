import {sum} from './operations/sum.js';
import {substract} from './operations/substract.js';
import {multiply} from './operations/multiply.js';
import {divide} from './operations/divide.js';
import { useState } from 'react'
import './App.css'
import { ButtonNumber } from './components/ButtonNumber'
import { ButtonOperation } from './components/ButtonOperation'

function App() {

  let [numberScreen, setNumberScreen] = useState(0)
  let [resultAcc, setResultAcc] = useState({resultAcum:0,operation:'none', newNumber:false})

  //Gestión introducción números
  const handleNumberClick = (numberClick) =>{
    if(resultAcc.newNumber){
      setNumberScreen(numberClick.toString())
      resultAcc.newNumber = false
      setResultAcc(resultAcc)
    }else{
      if((numberScreen).length>15){
        console.log('Se alcanzó el tamaño máximo del número que se puede usar');
      }else{
        if(numberScreen==0){
          setNumberScreen(numberClick.toString())
        }else{
          setNumberScreen((numberScreen) + numberClick.toString())
        }
      }
    }
  }

//Gestión operaciones
  const handleOperationClick = (operation) =>{
      if(resultAcc.operation!='none'){
        //Ya se ha introducido un segundo número
        numberScreen = resultAcc.operation(parseFloat(resultAcc.resultAcum),parseFloat(numberScreen))
        resultAcc.resultAcum = numberScreen
        resultAcc.operation = operation
        resultAcc.newNumber = true
        setNumberScreen(numberScreen)
        setResultAcc(resultAcc)

      }else{
        //Se va introducir un segundo número
        resultAcc.resultAcum = numberScreen
        resultAcc.operation = operation
        setNumberScreen('')
        setResultAcc(resultAcc)
        
      }
  }
  
//Gestión botón igual
  const handleEqualClick = () =>{
    if(resultAcc.operation!='none'){
      numberScreen = resultAcc.operation(parseFloat(resultAcc.resultAcum),parseFloat(numberScreen))
      resultAcc.operation='none'
      resultAcc.resultAcum = numberScreen
      setResultAcc(resultAcc)
      setNumberScreen(numberScreen)

    }else{
      //No se ha pulsado antes ningún botón de operación con lo que al pulsar el botón igual, no tiene que hacer nada la calculadora
    }
  }

  return (
    <>
      <h1>CALCULADORA</h1>
      <div className='calculator'>
        <div className='result'>{numberScreen}</div>
        <div className='buttons-calculator'>
          <div className='row'>
            <ButtonNumber number={1} numberFunction={()=>handleNumberClick(1)}/>
            <ButtonNumber number={2} numberFunction={()=>handleNumberClick(2)}/>
            <ButtonNumber number={3} numberFunction={()=>handleNumberClick(3)}/>
            <ButtonOperation sign={'+'} operation={()=>handleOperationClick(sum)}/>
          </div>
          <div className='row'>
            <ButtonNumber number={4} numberFunction={()=>handleNumberClick(4)}/>
            <ButtonNumber number={5} numberFunction={()=>handleNumberClick(5)}/>
            <ButtonNumber number={6} numberFunction={()=>handleNumberClick(6)}/>
            <ButtonOperation sign={'-'} operation={()=>handleOperationClick(substract)}/>
          </div>
          <div className='row'>
            <ButtonNumber number={7} numberFunction={()=>handleNumberClick(7)}/>
            <ButtonNumber number={8} numberFunction={()=>handleNumberClick(8)}/>
            <ButtonNumber number={9} numberFunction={()=>handleNumberClick(9)}/>
            <ButtonOperation sign={'*'} operation={()=>handleOperationClick(multiply)}/>
          </div>
          <div className='row'>
            <ButtonNumber number={'='} numberFunction={()=>handleEqualClick()}/>
            <ButtonNumber number={0} numberFunction={()=>handleNumberClick(0)}/>
            <ButtonNumber number={'.'} numberFunction={()=>handleNumberClick('.')}/>
            <ButtonOperation sign={'/'} operation={()=>handleOperationClick(divide)}/>
          </div>

        </div>
        <div className='button-clear' onClick={()=>{
                                                    setNumberScreen(0)
                                                    resultAcc.operation='none'
                                                    resultAcc.newNumber=true
                                                    setResultAcc(resultAcc)}}>Clear</div>
      </div>
    </>
  )
}

export default App
