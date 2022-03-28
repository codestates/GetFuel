// import logo from './logo.svg';
import './App.css';
import Login from './Page/Login'
import Main from './Page/Main'
import { Link, Route, Switch } from 'react-router-dom'




function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      
    </div>
  );
}

export default App;
