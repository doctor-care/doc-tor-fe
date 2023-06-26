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
import Otp from '@/pages/Otp/Otp';
import EditPatient from '@/pages/patient/EditPatient';
import CreateDoctor from '@/pages/Doctors/CreateDoctor';
import EditDoctor from '@/pages/Doctors/EditDoctor';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors },
    { path: '/createDoc', component: CreateDoctor, layout: null },
    { path: '/editDoc', component: EditDoctor, layout: null },
    { path: '/patient', component: Patient, layout: null },
    { path: '/editPatient', component: EditPatient, layout: null },
    { path: '/services', component: Services, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: '/login', component: Login, layout: null },
    { path: '/otp', component: Otp, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/chat', component: ChatBox, layout: OnlyHeader },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
