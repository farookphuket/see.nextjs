import { Footer } from "./Footer";
import { useAuth } from "../../hooks/auth";
import { AdminNav } from "./AdminNav";

export const AdminLayout = ({ children }) => {
    const { user, csrf, logout } = useAuth({
        middleware: "auth",
        kickTo: "/login",
    });

    return (
        <>
            <div className="wrapper">
                <header className="sticky top-0 z-50">
                    <AdminNav></AdminNav>
                </header>

                <main className="min-h-screen">{children}</main>
                <Footer>
                    <p>Admin page</p>
                </Footer>
            </div>
        </>
    );
};

export default AdminLayout;
