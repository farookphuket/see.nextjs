import axios from "../../libs/axios";
import { useAuth } from "../../hooks/auth";

import useSWR from "swr";
import { useState } from "react";
import { getCookie, setCookie, hasCookie } from "cookies-next";

export const useAdmin = () => {
    const { user, csrf } = useAuth();

    const {
        data: userList,
        error,
        mutate,
    } = useSWR("/api/admin/user", () =>
        axios
            .get("/api/admin/user")
            .then((res) => res.data)
            .catch((error) => {
                console.log(error);
            })
    );

    const [theVUrl, setTheVUrl] = useState("/api/admin/get-visitors");
    const { data: visitors } = useSWR(theVUrl, () =>
        axios
            .get(theVUrl)
            .then((res) => res.data.visitors)
            .catch((error) => console.log(error))
    );

    const goToPage = async ({ url }) => {
        setTheVUrl(url);
    };

    const saveUser = async ({ setError, setSuccess, ...props }) => {
        await csrf();

        setError([]);
        setSuccess(null);
        let url = `/api/admin/user`;

        let fData = new FormData();
        fData.append("name", props.name);
        fData.append("email", props.email);
        fData.append("avatar", props.avatar);

        if (parseInt(props.updateId) !== 0) {
            url = `/api/admin/user/${props.updateId}`;
            fData.append("_method", "PUT");
        }

        let eM = "";
        axios
            .post(url, fData)
            .then((res) => {
                //console.log(res.data);
                eM = res.data.msg;
                setSuccess(
                    `<span style="font-weight:bold;color:green">${eM}</span>`
                );
                setTimeout(() => {
                    mutate(res.data);
                }, 2000);
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    eM = Object.values(error.response.data.errors).join();
                }
                setError(
                    `<span style="font-weight:bold;color:red">${eM}</span>`
                );
            });
    };

    const delUser = async ({ ...props }) => {
        await csrf();

        if (parseInt(props.delId) !== 0) {
            axios
                .delete(`/api/admin/user/${props.delId}`)
                .then((res) => {
                    setTimeout(() => {
                        mutate(res.data);
                    }, 2000);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return {
        userList,
        saveUser,
        delUser,
        visitors,
        goToPage,
    };
};
