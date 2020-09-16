import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
import { Link } from "react-router-dom";

import db from './firebase'

function SidebarChat({ id , name, addNewChat}) {

    const [messages, setMesaages] = useState([]);
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot(snapshot=>(
                setMesaages(snapshot.docs.map(doc=>doc.data()))
            ));
        }
    });

    const createChat = () => {
        const roomName = prompt('Please enter the room name');
        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            });
        }

    };

    return !addNewChat ? (
        <Link to={`/room/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages.length > 0 ? messages[0].message : "..."}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat

