import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectors } from '../../redux/user';
import propTypes from 'prop-types';

export default function PublicRouter({
  children,
  restricted = false,
  redirectTo = '/',
  ...routeProps
}) {
  const status = useSelector(selectors.getIsLoggined);
  const needRestricted = status && restricted;
  return (
    <Route {...routeProps}>
      {needRestricted ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}

PublicRouter.propTypes = {
  children: propTypes.element.isRequired,
  path: propTypes.string.isRequired,
  exact: propTypes.bool,
  restricted: propTypes.bool,
};