import UserMenu from '../../components/AppBar/UserMenu';
import Navigation from '../../components/AppBar/Navigation';

import { useSelector } from 'react-redux';
import { selectors } from '../../redux/user';

export default function AppBar() {
  const status = useSelector(selectors.getIsLoggined);

  return (
    <div>
      <Navigation loggined={status} />
      {status && <UserMenu />}
    </div>
  );
}