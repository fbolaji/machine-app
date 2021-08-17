import React from 'react'
import { Redirect } from 'react-router-dom'
import { useUserIdentity } from './useUserIdentity';

export function useRedirectLandingPage() {
  const isUserAuthenticated = useUserIdentity()

  if (isUserAuthenticated) {
    return <Redirect to={{ pathname: '/list' }} push={true}/>
  }

  return <Redirect to={{ pathname: '/login' }} push={true} />

}
