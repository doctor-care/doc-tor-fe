import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Logout() {
    const navigate = useNavigate();
    // const { state, dispatch } = useContext(LoginContext);

    useEffect(() => {
        localStorage.setItem('accessToken', '');
        localStorage.removeItem('userName');
        // localStorage.removeItem('role');
        localStorage.setItem('role', '');
        // dispatch({ type: '' });
        navigate('/');
    });
}
