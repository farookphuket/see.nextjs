import MemberLayout from "../../components/layout/MemberLayout";
import axios from "../../libs/axios";
import Input from "../../components/form/Input";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import { useMember } from "../api/member";

const imgInternal = process.env.NEXT_PUBLIC_BACKEND_URL;

export const Profile = () => {
    const { user } = useAuth();
    const { saveProfile } = useMember();
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [cover, setCover] = useState("");
    const [profile_id, setProfileId] = useState(0);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(null);
    const [inUrl, setInUrl] = useState(false);

    const isExUrl = (str) => {
        setInUrl(false);
        let pattern = /^((http|https|ftp):\/\/)/;
        if (!pattern.test(str)) {
            str = `http://${str}`;
            setInUrl(true);
        }

        //        console.log(`the isExurl is run ${cover} cover`);
        return inUrl;
    };
    const getEditData = async () => {
        let res = await axios.get(`/api/member/profile/${user?.id}`);
        let data = await res.data.current_user;
        setEmail(data?.email);
        setName(data?.name);
        //console.log(`the cover url after ${data.avatar} the in url ${inUrl}`);

        setCover(data?.avatar);
        setProfileId(data?.id);
        isExUrl(data?.avatar);
        //       console.log(`the ex url is ${inUrl}`);
    };
    const myCover = (e) => {
        //       console.log(e);
        let uploadFile = e.target.files[0];
        let cv = URL.createObjectURL(uploadFile);
        setCover(cv);
        setAvatar(uploadFile);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        saveProfile({ setError, setSuccess, name, email, avatar, profile_id });
    };
    useEffect(() => {
        getEditData(user?.id);
    }, [user?.id]);
    return (
        <MemberLayout>
            <section className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mr-2 py-6 px-6">
                        <div className="mb-6">
                            <h1 className="text-center text-gray-700 font-bold pb-6">
                                {user?.name}&apos;s profile
                            </h1>
                            <p>to edit your profile in the form.</p>
                        </div>
                        <div className="max-w-md">
                            {!inUrl ? (
                                <img
                                    src={`${imgInternal}/${user?.avatar}`}
                                    alt=""
                                />
                            ) : (
                                <img src={user?.avatar} alt="" />
                            )}

                            {inUrl ? (
                                <img src={`${imgInternal}/${cover}`} alt="" />
                            ) : (
                                <img src={user?.avatar} alt="" />
                            )}
                        </div>
                    </div>

                    <div>
                        <form className="mb-6" onSubmit={submitForm}>
                            <Input type="hidden" value={profile_id}></Input>
                            <div>
                                <label htmlFor="" className="Label">
                                    name
                                </label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(n) => setName(n.target.value)}
                                    className="InputText"
                                ></Input>
                            </div>

                            <div>
                                <label htmlFor="" className="Label">
                                    email
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="InputText"
                                ></Input>
                            </div>

                            <div>
                                <label htmlFor="" className="Label">
                                    avatar
                                </label>
                                <Input
                                    type="file"
                                    name="avatar"
                                    onChange={myCover}
                                    className="InputText"
                                ></Input>
                            </div>
                            {/* show the avatar START*/}
                            <div className="py-4">
                                <div className="max-w-sm">
                                    {!inUrl ? (
                                        <img
                                            src={`${imgInternal}/${cover}`}
                                            alt=""
                                            className="w-full h-auto border "
                                        />
                                    ) : (
                                        <img
                                            src={cover}
                                            alt=""
                                            className="w-full h-auto border border-b-2"
                                        />
                                    )}

                                    {inUrl ? (
                                        <img
                                            src={`${imgInternal}/${cover}`}
                                            alt=""
                                            className="w-full h-auto border "
                                        />
                                    ) : (
                                        <img
                                            src={cover}
                                            alt=""
                                            className="w-full h-auto border"
                                        />
                                    )}
                                </div>
                            </div>
                            {/* show the avatar START*/}
                            {/* show success ,error status START*/}

                            <div className="py-4 px-4">
                                {error && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: error,
                                        }}
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
                            {/* show success ,error status END*/}
                            {/* button START*/}
                            <div>
                                <div className="py-4 px-4">
                                    <button className="btnEdit" type="submit">
                                        update
                                    </button>
                                </div>
                            </div>
                            {/* button END*/}
                        </form>
                    </div>
                </div>
            </section>
        </MemberLayout>
    );
};

export default Profile;
