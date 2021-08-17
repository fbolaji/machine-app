import _isEmpty from 'lodash/isEmpty'
import {useSelector} from 'react-redux';

export function useUserIdentity() {
  const getUser = useSelector(state => state?.user?.userDetails)
  const userLoggedIn = !_isEmpty(getUser) ? true : false

  console.log('userLoggedIn', userLoggedIn)
  return userLoggedIn
}
