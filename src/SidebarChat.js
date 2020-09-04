import React from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'
function SidebarChat({addNewChat}) {

    const createChat = () => {};

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/abc.svg`}/>
            <div className="sidebarChat__info">
                <h2>Room Name</h2>
                <p>Last text ....</p>
            </div>
        </div>
    ) : (
        <div className="sidebarChat" onclick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat

