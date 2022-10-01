import { useEffect, useState } from "react";

import axios from "../../../libs/axios";
import InputText from "../../../components/form/Input";
import { useAdmin } from "../../api/admin";

export const UserForm = ({ editId }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(null);
    const [updateId, setUpdateId] = useState(0);

    const [showAvatar, setShowAvatar] = useState(false);
    const { saveUser } = useAdmin();

    const getEditData = async (id) => {
        //    console.log(`click on get ${id}`);
        if (id === 0 || id === undefined) return;
        let res = await axios.get(`/api/admin/user/${id}`);
        let data = await res.data.user;
        //   console.log(data);
        setName(data.name);
        setEmail(data.email);
        setAvatar(data.avatar);
        setUpdateId(id);
    };

    const checkAvatar = (e) => {
        console.log(e);
        setShowAvatar(e);
        setAvatar(e);
    };

    const submitForm = (e) => {
        e.preventDefault();
        saveUser({ setError, setSuccess, name, email, avatar, updateId });
    };

    useEffect(() => {
        getEditData(editId);
    }, [editId]);
    return (
        <div className="py-12">
            <h1 className="text-3xl">editing... {name}</h1>
            <div className="py-4 px-2">
                <form onSubmit={submitForm}>
                    <InputText type="hidden" value={editId}></InputText>
                    <div>
                        <label htmlFor="avatar" className="Label">
                            Avatar
                        </label>
                        <InputText
                            className="InputText"
                            value={avatar}
                            name="avatar"
                            onChange={(a) => setAvatar(a.target.value)}
                            onBlur={(a) => checkAvatar(a.target.value)}
                            placeholder="user avatar"
                        ></InputText>
                    </div>
                    {showAvatar && (
                        <div>
                            <img src={showAvatar} alt={name} />
                        </div>
                    )}
                    <div>
                        <label htmlFor="name" className="Label">
                            Name
                        </label>
                        <InputText
                            className="InputText"
                            value={name}
                            name="name"
                            onChange={(n) => setName(n.target.value)}
                            placeholder="name"
                        ></InputText>
                    </div>

                    <div className="py-4">
                        <label htmlFor="email" className="Label">
                            Email
                        </label>
                        <InputText
                            className="InputText"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="me@email.me"
                        ></InputText>
                    </div>
                    <div className="flex justify-end py-6 md:py-4">
                        <div className="px-4 py-4">
                            &nbsp;
                            {error && (
                                <div
                                    dangerouslySetInnerHTML={{ __html: error }}
                                ></div>
                            )}
                            {success && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: success,
                                    }}
                                ></div>
                            )}
                        </div>
                        <div>
                            <button className="btnEdit">update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
