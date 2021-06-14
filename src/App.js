import './App.css';
import HomePage from "./pages/HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import EnterRoom from "./pages/EnterRoom";
import {useState} from "react";
import ChatPage from "./pages/ChatPage";

function App() {
  const [name, setName] = useState('')
  const [roomID, setRoomID] = useState('')
    const [join, setJoin] = useState(false)
    const [create, setCreate] = useState(false)

  const handleNameChange = (e) => {
    console.log('HandleSetName: ' + e.target.value)
    setName(e.target.value)
  }

  const handleRoomIDChange = (e) => {
      setRoomID(e.target.value)
  }

  const handleSetRoomID = (room) => {
      setRoomID(room)
  }

  const handleJoin = () => {
      setJoin(true)
      setCreate(false)
  }

  const handleCreate = () => {
      setCreate(true)
      setJoin(false)
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
              path='/'
              exact component={
                () =>
                    <HomePage/>
              }
          />
          <Route
              path='/create'
              render={(props) => (
                  <CreateRoom
                      {...props}
                      name={name}
                      onNameChange={handleNameChange}
                      handleCreate={handleCreate}
                  />
              )}
          />
          <Route
              path='/enter'
              render={(props) => (
                  <EnterRoom
                      {...props}
                      name={name}
                      roomID={roomID}
                      onNameChange={handleNameChange}
                      onRoomChange={handleRoomIDChange}
                      onEnter={handleJoin}
                  />
              )}
          />
          <Route
              path='/chat'
              render={(props) => (
                  <ChatPage
                      {...props}
                      name={name}
                      roomID={roomID}
                      isJoin={join}
                      isCreate={create}
                      onRoomChange={handleSetRoomID}
                  />
              )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
