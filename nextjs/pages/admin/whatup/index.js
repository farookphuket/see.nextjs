import { AdminLayout } from "../../../components/layout/AdminLayout";
import WhatupCard from "./whatupCard";
import { useWhatup } from "../../api/whatup";
export const ManWhatup = () => {
    const { whatup } = useWhatup();
    const wp = whatup?.whatup;
    console.log(wp);
    return (
        <AdminLayout>
            <section>
                <div>
                    <h1>Whatup</h1>

                    {wp &&
                        wp.map((w) => (
                            <WhatupCard key={w.id} whatup={w}></WhatupCard>
                        ))}
                </div>
            </section>
        </AdminLayout>
    );
};
export default ManWhatup;
