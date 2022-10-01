import AdminLayout from "../../../components/layout/AdminLayout";

import { useAuth } from "../../../hooks/auth";
import UserCard from "./userCard";

import { useAdmin } from "../../api/admin";
export default function ManUser() {
    const { user } = useAuth();

    const { userList } = useAdmin();
    return (
        <AdminLayout>
            <section>
                <div className="py-6 px-4">
                    <h1>Howdy ? {user?.name}</h1>
                </div>

                <div className="py-4 md:py-8 md:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-1 md:gap-3 max-w-full">
                        {userList?.user &&
                            userList?.user.map((u) => (
                                <UserCard key={u.id} userList={u}></UserCard>
                            ))}
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
