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
import Specialist from '@/pages/Doctors/Specialist';
import DoctorBySpecialist from '@/pages/Doctors/DoctorBySpecialist';
import AsyncDataEditPatient from '@/pages/patient/AsyncDataEditPatient';
import Review from '@/pages/patient/Review';
import AsyncDataEditDoctor from '@/pages/Doctors/AsyncDataEditDoctor';

import AppointmentByDoctor from '@/pages/Appointments/AppointmentByDoctor';
import ScheduleList from '@/pages/Schedule/schedule_list/ScheduleList';
import BookingSchedule from '@/pages/Schedule/booking_schedule/BookingSchedule';
import ScheduleDetail from '@/pages/Schedule/schedule_detail/ScheduleDetail';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors },
    { path: '/createDoc', component: CreateDoctor, layout: null },
    { path: '/editDoc', component: AsyncDataEditDoctor, layout: null },
    { path: '/patient', component: Patient, layout: null },
    { path: '/editPatient', component: AsyncDataEditPatient, layout: null },
    { path: '/service/:id', component: Services, layout: OnlyHeader },
    { path: '/editPatient', component: EditPatient, layout: null },
    { path: '/services', component: Services, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: '/login', component: Login, layout: null },
    { path: '/otp', component: Otp, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/chat', component: ChatBox, layout: OnlyHeader },

    { path: '/specialist', component: Specialist, layout: null },
    { path: '/doctor-list', component: DoctorBySpecialist, layout: null },
    { path: '/appointment-list', component: AppointmentByDoctor, layout: null },
    { path: '/booking-schedule', component: BookingSchedule, layout: null },
    { path: '/schedule-list', component: ScheduleList, layout: null },
    { path: '/schedule/:id', component: ScheduleDetail, layout: null },
    { path: '/review/:id', component: Review, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
