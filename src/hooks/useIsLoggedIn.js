import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useIsLoggedIn = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const history = useHistory();

  useEffect(() => {
    if (token && role) {
      if (role === 'Admin') {
        history.replace('/admin/dashboard');
      } else {
        history.replace('/user/dashboard');
      }
    }
  }, [history, role, token]);
};

export default useIsLoggedIn;
