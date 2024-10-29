import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
    const email = useSelector((state) => state.user.email);

    if (!email) {
        return <Navigate to="/" />;
    }

    return children;
}
