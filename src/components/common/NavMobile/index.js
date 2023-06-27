import { navPaths } from '@/routes';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavMobile() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navRef = useRef(navPaths);
    return (
        <ul className="!m-0 !p-0 pb-4">
            {navRef.current.map((item, index) => {
                return (
                    <li key={index}>
                        <Link
                            className={`flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700 ${
                                currentPath === item.path ? 'text-primary border-l-[3px] border-primary' : ''
                            }`}
                            to={item.path}
                        >
                            {item.icon}
                            <span className={`text-sm font-medium `}>{item.name}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default NavMobile;
