import React , {useState, useEffect} from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import {MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic} from '@material-ui/icons/';
import './Chat.css';
import { useParams } from 'react-router-dom';

import db from './firebase';

function Chat() {

    const [input,setInput]=useState('');    
    const { roomId }= useParams();
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                    setRoomName(snapshot.data().name)
            ));
        }
        
    }, [roomId])
    let sendmessage = (e) => {
        e.preventDefault();
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>Last seen at ....</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
                
            <div className="chat__body">
                <p className="chat__message">
                    <span className="chat__name">Subhasish Sarkar</span>
                    Hey Guys
                    <span className="chat__timestamp">3:50pm</span>
                </p>
                <p className={`chat__message ${ true && 'chat__reciver'}`}>
                    <span className="chat__name">Subhasish Sarkar</span>
                    Hey Guys
                    <span className="chat__timestamp">3:50pm</span>
                </p>
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message ..." type="text"/>
                    <button onClick={sendmessage}>Send a message</button>
                </form>
                <Mic/>    
            </div> 
        </div>
    )
}

export default Chat
