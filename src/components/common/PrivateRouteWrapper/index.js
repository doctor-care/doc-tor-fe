import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes';
import { Fragment, useEffect } from 'react';

function PrivateRouteWrapper({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        console.log(accessToken);
        if (!accessToken) {
            navigate(paths.login);
        }
    }, [navigate]);

    return <Fragment>{children}</Fragment>;
}

export default PrivateRouteWrapper;
