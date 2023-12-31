// Layouts
import { AdminLayout, OnlyHeader } from '@/layouts';

// Pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Doctors from '@/pages/Doctors';
import Appointment from '@/pages/Appointments';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ChatBox from '@/pages/Chat/ChatBox';
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
import BookingSchedule from '@/pages/Schedule/booking_schedule/BookingSchedule';
import ScheduleDetail from '@/pages/Schedule/schedule_detail/ScheduleDetail';
import ScheduleListForDoctor from '@/pages/Schedule/schedule_list/ScheduleListForDoctor';
import ScheduleListForPatient from '@/pages/Schedule/schedule_list/ScheduleListForPatient';
import CreateHistoryMedical from '@/pages/HistoryMedical/create_history_medical/CreateHistoryMedical';
import AppointmentFromDoctor from '@/pages/Appointments/appointment_by_doctor/AppointmentFromDoctor';
import CreateAppointment from '@/pages/Appointments/create_appointment/CreateAppointment';
import jwtDecode from 'jwt-decode';
import Logout from '@/pages/Login/Logout';
import CreatePrescription from '@/pages/Prescription/CreatePrescription';
import HistoryMedicalListByPatient from '@/pages/HistoryMedical/histoty_medical_list/HistoryMedicalListByPatient';
import DoctorDetail from '@/pages/Doctors/DoctorDetail';
import DoctorAD from '@/pages/Admin/Doctor/Doctor';
import Dashboard from '@/pages/Admin/Dashboard/Dashboard';
import NotFound from '@/components/common/NotFound';
import PatientAD from '@/pages/Admin/Patient/PatientAD';
import PatientDetailAD from '@/pages/Admin/Patient/PatientDetailAD';
import CreateDoctorService from '@/pages/Admin/ServiceMedical/CreateDoctorService';
import RegisterListForDoctor from '@/pages/Services/ListRegisterByDoctor';
import RegisterListForPatient from '@/pages/Services/ListRegisterByPatient';
// Public routes

const publicRoutes = [
    //khách
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors },
    { path: '/user/register', component: Patient, layout: null },
    { path: '/service/:id', component: Services },
    { path: '/services', component: Services },
    { path: '/otp', component: Otp, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/specialist', component: Specialist },
    { path: '/doctor-list', component: DoctorBySpecialist },
    { path: '/logout', component: Logout, layout: null },
    { path: '/doctor-detail/:id', component: DoctorDetail },
    //bác sĩ
    { path: '/editDoc', component: AsyncDataEditDoctor, layout: null },
    { path: '/prescription/create/:idHM', component: CreatePrescription, layout: null },
    { path: '/history-medical/create/:idScd', component: CreateHistoryMedical, layout: null },
    { path: '/appointment/create', component: CreateAppointment, layout: OnlyHeader },
    { path: '/doctor/schedule-list', component: ScheduleListForDoctor, layout: OnlyHeader },

    //Bệnh nhân
    { path: '/editPatient', component: AsyncDataEditPatient, layout: OnlyHeader },
    { path: '/appointments', component: Appointment, layout: OnlyHeader },
    { path: '/review/:id', component: Review, layout: OnlyHeader },
    { path: '/user/schedule-list', component: ScheduleListForPatient, layout: OnlyHeader },

    //Đăng xuấst
    { path: '/logout', component: Logout, layout: null },
    { path: '/prescription/create/:idHM', component: CreatePrescription, layout: null },
    { path: '/history-medical-list', component: HistoryMedicalListByPatient, layout: OnlyHeader },
    //bệnh nhân và bác sĩ
    { path: '/chat', component: ChatBox, layout: OnlyHeader },
    { path: '/appointment-list', component: AppointmentFromDoctor },
    { path: '/booking-schedule', component: BookingSchedule, layout: null },
    { path: '/schedule/:id', component: ScheduleDetail, layout: null },

    //admin
    { path: '/createDoc', component: CreateDoctor, layout: AdminLayout },
    { path: '/listDoc', component: DoctorAD, layout: AdminLayout },
    { path: '/listPat', component: PatientAD, layout: AdminLayout },
    { path: '/detailDoc/:id', component: DoctorDetail, layout: AdminLayout },
    { path: '/chatAD', component: ChatBox, layout: AdminLayout },
    { path: '/servicesAD', component: Services, layout: AdminLayout },
    { path: '/serviceAD/:id', component: Services, layout: AdminLayout },
    { path: '/dashboard', component: Dashboard, layout: AdminLayout },
    { path: '/patient-detail-AD/:id', component: PatientDetailAD, layout: AdminLayout },

    //error
    { path: '/not-found', component: NotFound, layout: null },
    { path: '/create-doctor-service', component: CreateDoctorService, layout: AdminLayout },
    { path: '/get-register-doctor', component: RegisterListForDoctor, layout: OnlyHeader },
    { path: '/get-register-patient', component: RegisterListForPatient, layout: OnlyHeader },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
