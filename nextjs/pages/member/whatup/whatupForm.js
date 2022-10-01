import RichText from "../../../components/form/RichText";
import Input from "../../../components/form/Input";
import { useEffect, useState } from "react";
import { useWhatup } from "../../api/whatup";
import { useAuth } from "../../../hooks/auth";
import axios from "../../../libs/axios";

const bn = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function WhatupForm({ editId }) {
    const { csrf } = useAuth();

    const { saveWhatup } = useWhatup();
    const [exUrl, setExUrl] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(null);
    const [updateId, setUpdateId] = useState(0);
    const [external_url, setExternalUrl] = useState("");

    const [cover, setCover] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [isPublic, setIsPublic] = useState(0);

    const [file_size, setFileSize] = useState(0);
    const [file_too_big, setFileTooBig] = useState("");

    //console.log(`edit from edit id ${editId}`);
    const handleCheckBox = (e) => {
        // console.log(`check ${e.target.checked} now`);
        !e.target.checked ? setIsPublic(0) : setIsPublic(1);
    };

    const showUpload = (e) => {
        //   console.log(e.target.files[0]);
        let po = URL.createObjectURL(e.target.files[0]);

        let upload_file = e.target.files[0];
        let file_size = e.target.files[0].size / 1024 ** 2;

        if (file_size > 2) {
            //console.log("file too big");
            setFileTooBig("Error file too big ,less than 2 MB. please");
            setCover(null);
        }

        if (e.target.files && e.target.files[0]) {
            setCoverUrl(po);
            setCover(upload_file);
            setFileSize(e.target.files[0].size);
        }
    };

    const previewExternalUrl = (e) => {
        if (parseInt(e.target.value) === 1) {
            //          console.log(`will use default`);
            setExternalUrl(1);
            setCoverUrl(`${bn}/img/kob-test1-1920x1080.png`);
        }
        let ex = e.target.value;
        if (ex.length >= 4) {
            //           console.log(`the value ${ex}`);
            setExternalUrl(ex);
            setCoverUrl(ex);
        }
    };
    const submitForm = async (e) => {
        e.preventDefault();
        //        console.log("form has submited");
        saveWhatup({
            setError,
            setSuccess,
            title,
            cover,
            body,
            external_url,
            isPublic,
            updateId,
        });
    };

    const setFormZero = () => {
        //console.log(`call the setZero`);
        if (editId === 0) {
            setError([]);
            setSuccess(null);
            setTitle("");
            setBody("");
            setIsPublic(0);
            setCoverUrl("");
            setCover("");
        } else {
            setError([]);
            setSuccess(null);
        }
    };

    useEffect(() => {
        if (editId === 0 || editId === undefined) setFormZero();

        getEditData(editId);
    }, [editId, exUrl]);

    const isExUrl = (string) => {
        let pattern = /^((http|https|ftp):\/\/)/;

        if (pattern.test(string)) {
            //url = "http://" + url;
            setExUrl(true);
        }
    };

    const getEditData = async (id) => {
        //console.log(`edit id ${id}`);
        if (id === undefined || id === 0) return;
        //setCover(null);
        await csrf();
        try {
            let res = await axios.get(`api/member/whatup/${id}/edit`);
            let data = await res.data.whatup;
            //   console.log(data);
            if (data.is_public !== 0) setIsPublic(1);
            setTitle(data.title);

            if (isExUrl(data?.cover) !== true) {
                setCoverUrl(`${bn}/${data?.cover}`);
            }

            setCoverUrl(data?.cover);

            setBody(data.body);
            setUpdateId(data.id);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="bg-white">
            <form onSubmit={submitForm}>
                <Input type="hidden" value={editId}></Input>
                <div className="py-4">
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        placeholder="Title..."
                        onChange={(t) => setTitle(t.target.value)}
                        className="InputText"
                    ></Input>
                </div>

                <div>
                    <div>
                        <Input
                            type="file"
                            name="cover"
                            id="cover"
                            className="w-full text-sm"
                            onChange={showUpload}
                        ></Input>
                    </div>
                    <div>
                        <label className="Label">url</label>
                        <Input
                            type="text"
                            name="external_url"
                            onBlur={previewExternalUrl}
                            placeholder="enter the image url or 1"
                            className="InputText"
                        ></Input>
                    </div>
                    <div>
                        {coverUrl && (
                            <div className="grid grid-cols-1 gap-3 py-6  md:grid-cols-2">
                                <div className="max-w-md">
                                    <img src={coverUrl} alt="" />
                                    {!exUrl && (
                                        <img src={`${bn}/${coverUrl}`} alt="" />
                                    )}
                                </div>

                                <p>{title}</p>
                            </div>
                        )}
                        {cover && (
                            <div>
                                <p>file name {cover?.name}</p>
                                <p>
                                    file size {cover?.size / (1024 * 1024)} MB.
                                </p>
                                {file_too_big && (
                                    <p className="text-red-600 font-bold text-3xl">
                                        {file_too_big}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 w-full bg-white  p-2 text-left">
                    <RichText
                        value={body}
                        onBlur={(b) => setBody(b)}
                        config={{
                            disablePlugins: "powered-by-jodit",
                            height: 450,
                        }}
                    ></RichText>
                </div>
                <div className="flex justify-between">
                    &nbsp;
                    <div>
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
                    <div>
                        <label
                            htmlFor="is_public"
                            className="flex justify-evenly space-x-3"
                        >
                            <Input
                                type="checkbox"
                                name="is_public"
                                id="is_public"
                                value={isPublic}
                                checked={isPublic}
                                onChange={handleCheckBox}
                                className="w-6 h-6"
                            ></Input>
                            <div>
                                {isPublic ? (
                                    <span>Public</span>
                                ) : (
                                    <span>No</span>
                                )}
                            </div>
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="btn">
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
