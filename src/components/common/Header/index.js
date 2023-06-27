import { Link, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

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
                                            <Link
                                                className={`text-gray-500 transition hover:text-gray-500/75 ${
                                                    currentPath === item.path ? 'text-primary' : ''
                                                }`}
                                                to={item.path}
                                            >
                                                {item.name}
                                            </Link>
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
