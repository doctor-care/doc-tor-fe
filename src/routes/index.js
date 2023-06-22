// Layouts
import { OnlyHeader } from '@/layouts';

// Pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Doctors from '@/pages/Doctors';
import Appointment from '@/pages/Appointments';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ChatBox from '@/pages/Chat/Chat';
import Patient from '@/pages/patient/Patient';

// Public routes
const currentUser = 'user1';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors, layout: null },
    { path: '/patient', component: Patient, layout: null },
    { path: '/services', component: Services, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/chat', component: ChatBox, layout: OnlyHeader,props:{user:currentUser}},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
