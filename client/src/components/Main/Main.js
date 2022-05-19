import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './Main.css'
import CountryCodes from '../../CountryCodes'
import NumberList from '../NumberList/NumberList';

function Main() {

const initialValue = {
    value: '',
    valid: false,
    touched: false,
    required: true,
    minLength: 3,
    maxLength: 10,
    initialCode: '+7',
}

const socket = new WebSocket('ws://localhost:5000')

const [value, setValue] = useState(initialValue)
const numbern = useRef()
const dispatch = useDispatch()
useEffect(() => {
  axios.get('http://localhost:5000')
    .then(response => dispatch({type: 'UPD_CONTACTS', payload: response.data}))
}, [])

socket.onmessage = (e) => {
  dispatch({type: 'UPD_CONTACTS', payload: JSON.parse(e.data)})
}

function validateControle(value, required, minLength, maxLength){
  let isValid = true
  if(required){
    isValid = value.trim() !== '' && isValid
  }
  if(minLength){
    isValid = value.length >= minLength && value.length <= maxLength && isValid
  }
  isValid = /^\s*[\d]+([,\.][\d]+)?\s*$/.test(value) && isValid
  return isValid
}

function onChangeHandl(event){
  setValue({value: event.target.value})
  const inputControl = {...value}
  inputControl.value = event.target.value
  inputControl.touched = true
  inputControl.valid = validateControle(inputControl.value, inputControl.required, inputControl.minLength, inputControl.maxLength)
  setValue(inputControl)
}

const newNumber = async (code, number) => {
  socket.send(JSON.stringify({ code, number}))
  numbern.current.value = ''
}

  return (
    <div className='Main'>
      <div className='MainWrapper'>
        <h1>Введите номер телефона</h1>
        <form>
          <div className='codContainer'>
            <label>Код страны</label>
            <select value={value.initialCode} onChange={(e) => setValue({...value, initialCode: e.target.value})}>
              {CountryCodes.map((code, index) => {
                  return (<option key={index} value={code.code}>{code.code}</option>)
                })}
            </select>
          </div>
          <div className='numberContainer'>
            <label>Введите номер</label>
            <input type='text' value={value.value} ref={numbern} onChange={event => onChangeHandl(event)}></input>
            {!value.valid && value.touched
            ? <span>Введите корректный номер</span>
            : null}
          </div>
          <button 
            disabled={!value.valid} onClick={(e) => {
              e.preventDefault()
              newNumber(value.initialCode, value.value)
            }}
          >Сохранить</button>
        </form>

        <NumberList />

      </div>
    </div>
  );
}

export default Main;
