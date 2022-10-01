import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";
export const GuestNav = () => {
    const { user, logout } = useAuth({ middleware: "guest" });

    const [mNavOpen, setMNavOpen] = useState(false);

    const toggleMenu = () => {
        !mNavOpen ? setMNavOpen(true) : setMNavOpen(false);
    };
    const goLogout = () => {
        console.log("lohout");
        logout();
    };
    return (
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
            <div>
                {user && (
                    <Link href="/member">
                        <h1 className="cursor-pointer">
                            {process.env.NEXT_PUBLIC_MY_WEBSITE}
                        </h1>
                    </Link>
                )}

                {!user && (
                    <Link href="/">
                        <h1 className="cursor-pointer">
                            {process.env.NEXT_PUBLIC_MY_WEBSITE}
                        </h1>
                    </Link>
                )}
            </div>
            <ul
                className={`${
                    mNavOpen ? "block " : "hidden"
                } absolute top-1/2 left-1/2 transform 
                -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto
                 lg:items-center lg:w-auto lg:space-x-6`}
            >
                {!user && (
                    <>
                        <li>
                            <Link href="/">
                                <a className="text-sm text-gray-400 hover:text-gray-500">
                                    Home
                                </a>
                            </Link>
                        </li>

                        <li className="md:hidden">
                            <Link href="/login">
                                <a className="text-sm text-gray-400 hover:text-gray-500">
                                    login
                                </a>
                            </Link>
                        </li>

                        <li className="md:hidden">
                            <Link href="/register">
                                <a className="text-sm text-gray-400 hover:text-gray-500">
                                    Register
                                </a>
                            </Link>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <Link href="/member">
                                <a className="text-sm text-gray-400 hover:text-gray-500">
                                    Home
                                </a>
                            </Link>
                        </li>

                        <li className="md:hidden">
                            <button
                                onClick={goLogout}
                                className="text-sm text-gray-400 hover:text-gray-500"
                            >
                                logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
            {!user && (
                <div className="lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6">
                    <Link href="/login">
                        <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
                            Sign In
                        </a>
                    </Link>

                    <Link href="/register">
                        <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
                            Sign up
                        </a>
                    </Link>
                </div>
            )}

            {user && (
                <div className="lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6">
                    <button
                        className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                        onClick={goLogout}
                    >
                        logout
                    </button>
                </div>
            )}

            <div className="lg:hidden">
                <button
                    className="flex items-center text-blue-600 p-3"
                    onClick={toggleMenu}
                >
                    menu
                </button>
            </div>
        </nav>
    );
};

export default GuestNav;
