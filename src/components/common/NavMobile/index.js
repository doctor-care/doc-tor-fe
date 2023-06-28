import { navPaths } from '@/routes';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

function NavMobile() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navRef = useRef(navPaths);

    return (
        <ul className="m-0 p-0 pb-4">
            {navRef.current.map((item, index) =>
                !item?.subMenu ? (
                    <li key={index}>
                        <Link
                            className={`flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700 ${
                                currentPath === item.path ? 'text-primary border-l-[3px] border-primary' : ''
                            }`}
                            to={item.path}
                        >
                            {item.icon}
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    </li>
                ) : (
                    <li key={index}>
                        <details className="group">
                            <summary
                                className={`flex items-center gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700 ${
                                    currentPath === item.path ? 'text-primary border-l-[3px] border-primary' : ''
                                }`}
                                style={{ listStyleType: 'none' }}
                            >
                                <Link className={`flex items-center no-underline text-inherit`} to={item.path}>
                                    {item.icon}
                                    <span className="text-sm font-medium ml-2">{item.name}</span>
                                </Link>
                                <MdKeyboardArrowRight
                                    size={20}
                                    className=" mt-[3px] transition duration-300 group-open:rotate-90"
                                />
                            </summary>
                            <ul className="space-y-1 px-0 left-0 w-fulls rounded-sm ">
                                {item.subMenu.map((subMenuItem, subIndex) => (
                                    <li key={subIndex}>
                                        <Link
                                            className={`block no-underline border-transparent px-12 py-2 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700  ${
                                                currentPath === subMenuItem.path ? 'text-primary' : ''
                                            }`}
                                            to={subMenuItem.path}
                                        >
                                            {subMenuItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ),
            )}
        </ul>
    );
}

export default NavMobile;
