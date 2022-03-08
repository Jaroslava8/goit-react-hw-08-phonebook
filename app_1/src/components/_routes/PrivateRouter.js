import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectors } from '../../redux/user';
import propTypes from 'prop-types';

export default function PrivateRouter({
  children,
  redirectTo = '/',
  ...routeProps
}) {
  const status = useSelector(selectors.getIsLoggined);
  return (
    <Route {...routeProps}>
      {status ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

PrivateRouter.propTypes = {
  children: propTypes.element.isRequired,
  path: propTypes.string.isRequired,
};