import { Link, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { MdKeyboardArrowRight } from 'react-icons/md';

import NavMobile from '../NavMobile';
import { navPaths, paths } from '@/routes';

function Header() {
    const [visibleNavMobile, setVisibleNavMobile] = useState(false);
    const hide = () => setVisibleNavMobile(false);
    const toggleNavMobile = () => {
        setVisibleNavMobile(!visibleNavMobile);
    };

    const location = useLocation();
    const currentPath = location.pathname;
    const navRef = useRef(navPaths);
    return (
        <header className="bg-white shadow-sm border-b-2 fixed top-0 w-full h-[64px] z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link to={paths.home}>
                            <img src="/logo.png" alt="logo" width={120} height={120} />
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className=" hidden md:flex items-center justify-center">
                            <ul className="flex items-center gap-6 text-sm my-0">
                                {navRef.current.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <details className="group relative">
                                                <summary
                                                    className={`text-gray-500 flex  transition hover:text-gray-500/75 hover:bg-slate-100 rounded-md  px-2 py-1 ${
                                                        currentPath === item.path ? 'text-primary' : ''
                                                    }`}
                                                    style={{ listStyleType: 'none' }}
                                                >
                                                    <Link to={item.path} className="h-[23px] no-underline text-inherit">
                                                        {item.name}
                                                    </Link>
                                                    {item?.subMenu && (
                                                        <MdKeyboardArrowRight
                                                            size={20}
                                                            className=" mt-[3px] transition duration-300 group-open:rotate-90"
                                                        />
                                                    )}
                                                </summary>
                                                {item?.subMenu && (
                                                    <ul className="absolute mt-3 space-y-1 px-0 left-0 w-48 bg-white rounded-sm shadow-lg">
                                                        {item.subMenu.map((subMenuItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <Link
                                                                    className={`block no-underline  px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                                                                        currentPath === subMenuItem.path
                                                                            ? 'text-primary'
                                                                            : ''
                                                                    }`}
                                                                    to={subMenuItem.path}
                                                                >
                                                                    {subMenuItem.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </details>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex sm:gap-4">
                                <Link
                                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow"
                                    to={'/login'}
                                >
                                    Login
                                </Link>

                                <div className="hidden md:flex">
                                    <Link
                                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary"
                                        to={'/register'}
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>
                            <Tippy
                                visible={visibleNavMobile}
                                onClickOutside={hide}
                                interactive
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div
                                        {...attrs}
                                        tabIndex={-1}
                                        className=" w-[calc(100vw-50vw)] z-[1000] shadow rounded-sm mt-1"
                                    >
                                        <div className="w-full bg-white">
                                            <NavMobile />
                                        </div>
                                    </div>
                                )}
                            >
                                <div className="block md:hidden">
                                    <button
                                        className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                        onClick={toggleNavMobile}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
