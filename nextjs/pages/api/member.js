import { useWhatup } from "./whatup";
import axios from "../../libs/axios";

export const useMember = () => {
    const { whatup } = useWhatup();
    const whatupList = whatup;

    const saveProfile = async ({ setError, setSuccess, ...props }) => {
        //console.log(props);
        setError([]);
        setSuccess(null);
        const profile_id = props.profile_id;

        let url = "/api/member/profile";
        let fData = new FormData();
        let res_msg = "";
        fData.append("name", props.name);
        fData.append("email", props.email);
        fData.append("avatar", props.avatar);
        fData.append("id", profile_id);
        if (profile_id && profile_id !== 0) {
            url = `/api/member/profile/${profile_id}`;
            fData.append("_method", "PUT");
        }
        axios
            .post(url, fData)
            .then((res) => {
                //       console.log(res.data);
                res_msg = `<span style="font-weight:bold;color:green">${res.data.msg}</span>`;
                setSuccess(res_msg);
                setTimeout(() => {
                    //mutate(res.data);
                    window.location.reload();
                }, 2500);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 422) {
                    res_msg = Object.values(error.response.data.errors).join();
                }

                setError(
                    `<span style="font-weight:bold;color:red">${res_msg}</span>`
                );
            });
    };
    return {
        whatupList,
        saveProfile,
    };
};
