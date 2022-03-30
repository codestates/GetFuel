import './App.css';
import { BrowserRouter as Router, Route, Switch,  } from 'react-router-dom';
import Main from './page/main/Main';
import SignUp from './page/signup/SignUp';
import EditUser from './page/edituser/EditUser';
import Login from './page/login/Login';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/edituser" component={EditUser}/>
          </Switch>
    </Router>
  );
}

export default App;
