import React, { useState } from 'react';
import './App.css';

import Login from './Login';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
    const [user, setUser] = useState(null);
  return (
      <div className="App">
      {!user?(
          <Login/>
      ):(
        <div className="app__body">
            <Router>
                <Sidebar/>
                    <Switch>
                        <Route path="/room/:roomId">
                            <Chat/>
                        </Route>
                        <Route path="/">
                            <Chat/>
                        </Route>
                    </Switch>
            </Router>
        </div>                
      )}
    </div>
  );
}

export default App;
