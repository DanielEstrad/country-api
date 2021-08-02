import './App.css';
import Layout from './Layouts/Layout';
import Countries from './components/Countries';
import CountryInformation from './components/CountryInforrmation';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Countries} ></Route>
          <Route path="/country/:name" component={CountryInformation} ></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
