import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Main from './page/Main';
import SignUp from './page/SignUp';
import EditUser from './page/EditUser';
import Login from './page/Login';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/edituser" component={EditUser}/>
          </Switch>
    </Router>
  );
}

export default App;
