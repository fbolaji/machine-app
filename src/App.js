import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap';
import { useRoutesList } from './hooks/useRoutesList'
import { useRedirectLandingPage } from './hooks/useRedirectLandingPage';

const LandingPage = () => useRedirectLandingPage()

const RenderRoutes = () => {
    const routesList = useRoutesList()

    return (
        <>
            {routesList}
        </>
    )
}

function App() {
  return (
      <Router forceRefresh={true}>
          <Route key="redirect" exact path="/list" render={() => <LandingPage />} />
          <Switch>
              <Container fluid className="app">
                <Row className="bg-secondary text-light">
                  <Col>
                    <header className="p-2">
                      <h2>User Album List...</h2>

                    </header>
                  </Col>
                </Row>
                  <Row>
                      <Col>
                          <RenderRoutes />
                          <LandingPage />
                      </Col>
                  </Row>
              </Container>
          </Switch>
      </Router>
  );
}

export default App;
