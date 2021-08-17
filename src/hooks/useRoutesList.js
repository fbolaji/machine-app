import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { routesConfig } from '../services/routesConfig'
import * as componentsMap from '../components/componentRegistry'
import { useUserIdentity } from './useUserIdentity';


export function useRoutesList() {
  const isUserAuthenticated = useUserIdentity()
    console.log("router", isUserAuthenticated)
  const routeList = routesConfig.map(({ path, component }, index) => {
    const componentName = component
    const ComponentToRender = componentsMap[componentName]
    return (
        <Route
        exact
        key={index}
        path={path}
        render={() => {
            return <ComponentToRender />
            // if(isUserAuthenticated) {
            //     return <Redirect to={{pathname: 'list'}} />
            // } else {
            //     return <Redirect to={{pathname: 'login'}} />
            // }
        }}
        />
    )
  })

  useRoutesList.propTypes = {
    routesConfig: PropTypes.object.isRequired,
  }

  return routeList
}
