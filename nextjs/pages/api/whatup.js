import axios from "../../libs/axios";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";

export const useWhatup = () => {
    const [wpURL, setWPURL] = useState("/api/whatup");
    const {
        data: whatup,
        error,
        mutate,
    } = useSWR(wpURL, () =>
        axios
            .get(wpURL)
            .then((res) => res)
            .catch((error) => {
                console.log(error);
            })
    );

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const getWhatupPage = async ({ wpURL }) => {
        //console.log(`the url is ${wpURL}`);
        setWPURL(wpURL);
    };

    const saveWhatup = async ({ setError, setSuccess, ...props }) => {
        //console.log(props);
        await csrf();

        setError([]);
        setSuccess(null);

        let url = "/api/member/whatup";

        let fData = new FormData();
        fData.append("title", props.title);
        fData.append("body", props.body);
        fData.append("is_public", props.isPublic);
        fData.append("cover", props.cover);

        if (props.external_url) {
            fData.append("external_url", props.external_url);
        }

        if (props.updateId !== 0) {
            url = `/api/member/whatup/${props.updateId}`;
            fData.append("_method", "PUT");
        }
        axios
            .post(url, fData)
            .then((res) => {
                setSuccess(
                    `<span style="font-weight:bold;color:green;">${res.data.msg}</span>`
                );

                setTimeout(() => {
                    mutate(res);
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                let eM = "";
                if (error.response.status === 422) {
                    eM = Object.values(error.response.data.errors).join();
                }

                setError(
                    `<span style="font-weight:bold;color:red">${eM}</span>`
                );
            });
    };

    const getLastUpdate = async () => {
        await csrf();
        axios
            .get(`/api/whatup`)
            .then((res) => res.data)
            .catch((error) => {
                console.log(error);
            });
    };

    const delWhatup = async ({ ...props }) => {
        //console.log(props);
        if (props.delete_id !== 0) {
            //          console.log(`we'll delete ${props.delete_id}`);
            axios
                .delete(`/api/member/whatup/${props.delete_id}`)
                .then((res) => mutate(res))
                .catch((error) => {
                    console.log(error);
                });
            getLastUpdate();
        }
    };
    useEffect(() => {
        if (error) console.log(error);
    }, [whatup, error]);
    return {
        whatup,
        saveWhatup,
        delWhatup,
        getLastUpdate,
        getWhatupPage,
    };
};
