import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';
import { userAPI } from './redux/services';
import { actions } from './redux/user';
import PublicRouter from './components/_routes/PublicRouter';
import PrivateRouter from './components/_routes/PrivateRouter';
import AppBar from './components/AppBar/AppBar';
import HomeView from './views/HomeView';

const ContactsView = lazy(() => import('./views/ContactsView'));
const LoginView = lazy(() => import('./views/LoginView'));
const RegisterView = lazy(() => import('./views/RegisterView'));

export default function App() {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const { isSuccess, data, isError, error, isLoading } = userAPI.useUserQuery(
    token,
    {
      skip: !token,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(actions.authUser({ user: data, token }));
      return;
    }

    if (isError) {
      console.log(error);
      return;
    }
  }, [isSuccess, isError]);

  const placeToaster = () =>
    window.innerWidth > 480
      ? { position: 'top-center' }
      : { position: 'bottom-center' };

  return (
    !isLoading && (
      <div>
        <AppBar />

        <Switch>
          <Suspense fallback={<h1 className="helloUser">Loading...</h1>}>
            <PublicRouter exact path="/">
              <HomeView />
            </PublicRouter>
            <PublicRouter exact path="/login" redirectTo="/contacts" restricted>
              <LoginView />
            </PublicRouter>
            <PublicRouter
              exact
              path="/register"
              redirectTo="/contacts"
              restricted
            >
              <RegisterView />
            </PublicRouter>
            <PrivateRouter path="/contacts" redirectTo="/login">
              <ContactsView />
            </PrivateRouter>
          </Suspense>
          <Redirect to="/" />
        </Switch>
        <Toaster {...placeToaster()} />
      </div>
    )
  );
}