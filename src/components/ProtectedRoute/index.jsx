import { Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [cookies] = useCookies(['token']);

  if (!cookies.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
