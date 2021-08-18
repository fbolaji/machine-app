import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { routesConfig } from '../services/routesConfig'
import * as componentsMap from '../components/componentRegistry'
import { useUserIdentity } from './useUserIdentity';
import { AlbumListComponent, LoginPageComponent } from '../components/componentRegistry';


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
            //return <ComponentToRender />
            if(isUserAuthenticated) {
                console.log(componentName)
                return <ComponentToRender />
            }

            return <LoginPageComponent/>
            //
            // return <Redirect to={{
            //     pathname: '/login',
            //     component: LoginPageComponent
            // }} />

        }}
        />
    )
  })

  useRoutesList.propTypes = {
    routesConfig: PropTypes.object.isRequired,
  }

  return routeList
}
