// Layouts
import { OnlyHeader } from '@/layouts';

// Pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Doctors from '@/pages/Doctors';
import Appointment from '@/pages/Appointments';
import Login from '@/pages/Account/Login';
import RegisterPatientPage from '@/pages/Account/Register/Register';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors, layout: null },
    { path: '/services', component: Services, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: RegisterPatientPage, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
