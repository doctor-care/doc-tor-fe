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
    appointments: '/appointments',
};

//nav path
const navPaths = [
    { name: 'Trang chủ', path: paths.home, icon: <AiOutlineHome /> },
    {
        name: 'Dịch vụ',
        path: paths.services,
        icon: <RiServiceLine />,
        subMenu: [{ name: 'Đặt lịch', path: paths.appointments, icon: <RiServiceLine /> }],
    },
    { name: 'Bác sĩ', path: paths.doctors, icon: <RiServiceLine /> },
];

// Public routes
const publicRoutes = [
    { path: paths.home, component: Home },
    { path: paths.services, component: Services, layout: OnlyHeader },
    { path: paths.appointments, component: Appointment, layout: OnlyHeader },
    { path: paths.login, component: Login, layout: null },
    { path: paths.register, component: Register, layout: null },
];

const privateRoutes = [{ path: paths.doctors, component: Doctors, layout: null }];

export { publicRoutes, privateRoutes, paths, navPaths };
