import GuestLayout from "../../components/layout/GuestLayout";

export const Whatup = ({ id }) => {
    console.log(id);
    return (
        <GuestLayout>
            <div>show whatup here {id}</div>
        </GuestLayout>
    );
};

export default Whatup;
