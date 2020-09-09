import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
function SidebarChat({ id , name, addNewChat}) {

    const createChat = () => {
        const roomName = prompt('Please enter the room name');

        if(roomName){

        }

    };

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>Last text ....</p>
            </div>
        </div>
    ) : (
        <div className="sidebarChat" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat

