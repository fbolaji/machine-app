import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { routesConfig } from '../services/routesConfig'
import * as componentsMap from '../components/componentRegistry'
import { useUserIdentity } from './useUserIdentity';
import { LoginPageComponent } from '../components/componentRegistry';

export function useRoutesList() {
  const isUserAuthenticated = useUserIdentity()
  const routeList = routesConfig.map(({ path, component }, index) => {
    const componentName = component
    const ComponentToRender = componentsMap[componentName]
    return (
        <Route
        exact
        key={index}
        path={path}
        render={() => {
            if(isUserAuthenticated) {
                console.log(componentName)
                return <ComponentToRender />
            }

            return <LoginPageComponent/>
        }}
        />
    )
  })

  useRoutesList.propTypes = {
    routesConfig: PropTypes.object.isRequired,
  }

  return routeList
}
