import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap';
import { useRoutesList } from './hooks/useRoutesList'
import { useRedirectLandingPage } from './hooks/useRedirectLandingPage';
import Header from './components/header';

const LandingPage = () => useRedirectLandingPage()

const RenderRoutes = () => {
    const routesList = useRoutesList()

    return (
        <>
            {routesList}
        </>
    )
}

export const App = () => {
  return (
      <Router>
          <Switch>
              <Container fluid className="app">
                <Row className="bg-secondary text-light">
                  <Col>
                   <Header />
                  </Col>
                </Row>
                  <Row>
                      <Col className="col-12">
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
