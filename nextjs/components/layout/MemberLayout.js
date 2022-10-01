import { Footer } from "./Footer";
import { useAuth } from "../../hooks/auth";
import { MemberNav } from "./MemberNav";

export const MemberLayout = ({ children }) => {
    const { user, logout } = useAuth({ middleware: "auth", kickTo: "/login" });

    return (
        <>
            <div className="wrapper">
                <header className="sticky top-0 z-50">
                    <MemberNav></MemberNav>
                </header>

                <main className="min-h-screen">{children}</main>
                <Footer>
                    <div>
                        <div className="border-b-4 border-b-white">
                            <h1 className="text-blue-300 md:text-3xl">
                                contact
                            </h1>
                        </div>
                        <p>
                            <span>phone</span>
                            <span className="ml-1">
                                {process.env.NEXT_PUBLIC_MY_PHONE_NUMBER}
                            </span>
                        </p>

                        <p>
                            <span>email</span>
                            <span className="ml-1">
                                {process.env.NEXT_PUBLIC_MY_EMAIL}
                            </span>
                        </p>
                    </div>
                </Footer>
            </div>
        </>
    );
};

export default MemberLayout;
