import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from "react-bootstrap";

import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
