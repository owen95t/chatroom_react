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
import { GuardProvider, GuardedRoute} from "react-router-guards";

function App() {
  const [name, setName] = useState('')
  const [roomID, setRoomID] = useState('')
    const [join, setJoin] = useState(false)
    const [create, setCreate] = useState(false)
    const [auth, setAuth] = useState(false)

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
      handleSetAuth(true)
  }

  const handleCreate = () => {
      setCreate(true)
      setJoin(false)
      handleSetAuth(true)
  }

  function handleSetAuth(bool) {
      if (bool === true) {
          console.log('set true')
          setAuth(true)
      }else if (bool === false) {
          console.log('set false')
          setAuth(false)
      }
  }

  const requireName = (to, from, next) => {
      if (to.meta.auth) {
          if (auth === true) {
              next()
          }
          next.redirect('/')
      }else {
          next()
      }
  }

  return (
    <div className="App">
      <Router>
          <GuardProvider guards={[requireName]}>
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
                  <GuardedRoute
                      meta={{auth: true}}
                      path='/chat'
                      render={(props) => (
                          <ChatPage
                              {...props}
                              name={name}
                              roomID={roomID}
                              isJoin={join}
                              isCreate={create}
                              onRoomChange={handleSetRoomID}/>)}
                  />
                  {/*<Route*/}
                  {/*    path='/chat'*/}
                  {/*    render={(props) => (*/}
                  {/*        <ChatPage*/}
                  {/*            {...props}*/}
                  {/*            name={name}*/}
                  {/*            roomID={roomID}*/}
                  {/*            isJoin={join}*/}
                  {/*            isCreate={create}*/}
                  {/*            onRoomChange={handleSetRoomID}*/}
                  {/*        />*/}
                  {/*    )}*/}
                  {/*/>*/}
                  {/*  <GuardedRoute path='/chat' component={ChatPage}*/}
                  {/*                auth={auth}*/}
                  {/*                name={name}*/}
                  {/*                roomID={roomID}*/}
                  {/*                isJoin={join}*/}
                  {/*                isCreate={create}*/}
                  {/*                onRoomChange={handleSetRoomID}*/}
                  {/*                onAuth={handleSetAuth}*/}
                  {/*  />*/}
              </Switch>
          </GuardProvider>
      </Router>
    </div>
  );
}

export default App;
