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
import Specialist from '@/pages/Doctors/Specialist';
import DoctorBySpecialist from '@/pages/Doctors/DoctorBySpecialist';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors },
    { path: '/patient', component: Patient, layout: null },
    { path: '/service/:id', component: Services, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/chat', component: ChatBox, layout: OnlyHeader },
    { path: '/specialist', component: Specialist, layout: null },
    { path: '/doctor-list', component: DoctorBySpecialist, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
