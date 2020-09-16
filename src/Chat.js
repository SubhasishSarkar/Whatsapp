import React , {useState, useEffect} from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import {MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic} from '@material-ui/icons/';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import db from './firebase';
import firebase from 'firebase'

function Chat() {

    const [input,setInput]=useState('');    
    const { roomId }= useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
     const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                    setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId)
             .collection('messages')
             .orderBy('timestamp','asc')
             .onSnapshot(snapshot=>(
                    setMessages(snapshot.docs.map(doc=>doc.data()))
            ));
        }
    }, [roomId])
    let sendmessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>last seen {messages.length > 0 ? new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString() : "..."}</p>
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
                {messages.map((message,index)=>(
                    <p key={index} className={`chat__message ${ message.name === user.displayName && 'chat__reciver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
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
