import moment from "moment";
import { useState } from "react";
import UserForm from "./userForm";
import { useAdmin } from "../../api/admin";

export default function UserCard({ userList }) {
    const u = userList;

    const { delUser } = useAdmin();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(0);
    const [active, setActive] = useState(false);

    const edit = (id) => {
        if (id === 0 || id === undefined) setShowForm(false);
        setShowForm(id);
        setEditId(id);
        setActive(id);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(0);
        setActive(false);
    };

    const delMe = async (id) => {
        delUser({ delId: id });
    };

    return (
        <div className="border border-blue-200 rounded-lg p-2">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-green-300">{u?.name}</h2>
                <span className="font-semibold text-gray-500 py-2">
                    {moment(u?.created_at).format("YY-MM-DD HH:mm:ss")}
                </span>

                <span className="font-semibold text-gray-500 py-2">
                    {moment(u?.created_at).fromNow()}
                </span>
            </div>
            <div className="">
                <div className="">
                    {!u?.avatar && <p>no pic</p>}
                    {u?.avatar && <img src={u?.avatar} alt="" />}
                </div>
            </div>
            <div className="py-6 px-4">
                {!showForm && (
                    <div className=" flex justify-between">
                        <button
                            className="btnEdit"
                            value={u?.id}
                            onClick={(e) => edit(e.target.value)}
                            disabled={active}
                        >
                            edit
                        </button>
                        <button
                            className="btnDelete"
                            value={u?.id}
                            onClick={(d) => delMe(d.target.value)}
                        >
                            delete
                        </button>
                    </div>
                )}
            </div>
            <div>
                {showForm && (
                    <div className="flex justify-between">
                        <p>click to close</p>
                        <button className="btnDelete" onClick={closeForm}>
                            close
                        </button>
                    </div>
                )}

                {showForm && <UserForm editId={editId}></UserForm>}
            </div>
        </div>
    );
}
