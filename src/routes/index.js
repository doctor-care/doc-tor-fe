// Layouts
import { OnlyHeader } from '@/layouts';

// Pages
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Doctors from '@/pages/Doctors';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/doctors', component: Doctors, layout: null },
    { path: '/services', component: Services, layout: OnlyHeader },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
