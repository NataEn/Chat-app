import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom"
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

const Chat=()=>{
    const location = useLocation();
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])
    const ENDPOINT='localhost:5000'
    
   useEffect(()=>{
    const {name,room}= queryString.parse(location.search)
    socket=io(ENDPOINT)
    setName(name);
    setRoom(room)
    socket.emit('join',{name,room},((err)=>{ 
        if(err){
            console.error(err);
        }
        }))
    
    return ()=>{
        socket.emit('break_connection');
        socket.off();
    }
   },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message])

        }),[messages]
    })
    // function for sending messages
    return <h1>Chat</h1>
}
export default Chat;

