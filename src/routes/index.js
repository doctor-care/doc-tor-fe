// Layouts
import { OnlyHeader } from '@/layouts';

// Pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Doctors from '@/pages/Doctors';
import Appointment from '@/pages/Appointments';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

//icon
import { AiOutlineHome } from 'react-icons/ai';
import { RiServiceLine } from 'react-icons/ri';

//path
const paths = {
    home: '/',
    doctors: '/doctors',
    services: '/services',
    login: '/login',
    register: '/register',
};

//nav path
const navPaths = [
    { name: 'Trang chủ', path: paths.home, icon: <AiOutlineHome /> },
    { name: 'Dịch vụ', path: paths.services, icon: <RiServiceLine /> },
];

// Public routes
const publicRoutes = [
    { path: paths.home, component: Home },
    { path: paths.doctors, component: Doctors, layout: null },
    { path: paths.services, component: Services, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: paths.login, component: Login, layout: null },
    { path: paths.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes, paths, navPaths };
