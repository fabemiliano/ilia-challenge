import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Details from './pages/details';
import NotFound from './pages/notFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/pokemon/:id" render={(props) => <Details props={props} />} />
        <Route render={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
