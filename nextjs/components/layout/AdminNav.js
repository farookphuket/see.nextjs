import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
export const AdminNav = () => {
    const { logout } = useAuth({ middleware: "auth", kickTo: "/login" });
    const [mNavOpen, setMNavOpen] = useState(false);

    const toggleMenu = () => {
        !mNavOpen ? setMNavOpen(true) : setMNavOpen(false);
    };
    return (
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
            <div>
                <h1>logo</h1>
            </div>
            <div className="lg:hidden">
                <button
                    className="flex items-center text-blue-600 p-3"
                    onClick={toggleMenu}
                >
                    menu
                </button>
            </div>
            <ul
                className={`${
                    mNavOpen ? "block " : "hidden"
                } absolute top-1/2 left-1/2 transform 
                -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto
                 lg:items-center lg:w-auto lg:space-x-6`}
            >
                <li>
                    <Link href="/admin">
                        <a className="text-sm text-gray-400 hover:text-gray-500">
                            Home
                        </a>
                    </Link>
                </li>

                <li>
                    <Link href="/admin/user">
                        <a className="text-sm text-gray-400 hover:text-gray-500">
                            user
                        </a>
                    </Link>
                </li>
            </ul>

            <a
                onClick={logout}
                className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 
                bg-blue-400 cursor-pointer hover:bg-red-400 text-sm text-white 
                font-bold  hover:text-blue-800
                rounded-xl transition duration-200"
            >
                Logout
            </a>
        </nav>
    );
};

export default AdminNav;
