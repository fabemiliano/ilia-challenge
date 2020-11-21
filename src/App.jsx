import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Details from './pages/details';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/pokemon/:id" render={(props) => <Details props={props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
