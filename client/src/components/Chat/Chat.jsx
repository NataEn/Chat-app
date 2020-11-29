import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom"
import queryString from 'query-string'
import io from 'socket.io-client'

const Chat=()=>{
    const location = useLocation();
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    
   useEffect(()=>{
    const {name,room}= queryString.parse(location.search)
    setName(name);
    setRoom(room)
    console.log(name,room)
   })
    
    return <h1>Chat</h1>
}
export default Chat;

