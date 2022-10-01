import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Link from "next/link";
import WhatupForm from "./whatupForm";
import { useWhatup } from "../../api/whatup";
import moment from "moment";

const imgPath = process.env.NEXT_PUBLIC_BACKEND_URL;

export const WhatupCard = ({ whatup }) => {
    const [editId, setEditId] = useState(0);

    const { delWhatup } = useWhatup();
    const showForm = (e) => {
        setEditId(e);
    };

    const [exUrl, setExUrl] = useState(false);
    useEffect(() => {
        const wpCover = whatup?.cover;

        const isExUrl = (string) => {
            setExUrl(false);
            let pattern = /^((http|https|ftp):\/\/)/;

            if (pattern.test(string)) {
                //url = "http://" + url;
                setExUrl(true);
            }

            //console.log(`me is run the ex is ${exUrl} ha`);
        };

        isExUrl(wpCover);
    }, [whatup, exUrl]);

    //    console.log(whatup);
    const u_id = parseInt(getCookie("user_id"));

    let edit = false;
    if (u_id === whatup?.user_id) edit = true;

    if (editId !== 0) {
        return (
            <div className="py-14 p-4">
                <div className="flex justify-end">
                    <p>want to cancel just click the x button</p>

                    <button
                        className="btn border border-red-500 bg-white text-red-600 font-bold hover:bg-red-400 hover:text-white"
                        onClick={() => setEditId(0)}
                    >
                        &times;
                    </button>
                </div>
                <div className="py-10">
                    <WhatupForm editId={editId}></WhatupForm>
                </div>
            </div>
        );
    }

    // delete note
    const delMe = async (id) => {
        //console.log(`will delte ${id}`);
        if (id === 0 || id === undefined) return;
        delWhatup({ delete_id: parseInt(id) });
    };

    return (
        <>
            <div className="grid grid-cols-1 p-2  md:grid-cols-2">
                <div>
                    <Link href={`/whatup/${whatup?.id}`}>
                        <a>
                            <span className="py-4 text-center">cover</span>
                            {whatup?.cover ? (
                                <div>
                                    {!exUrl && (
                                        <img
                                            src={`${imgPath}/${whatup?.cover}`}
                                            alt={whatup?.title}
                                            className="cursor-pointer max-w-full h-auto rounded-lg "
                                        />
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <p>normal</p>
                                </div>
                            )}
                            {whatup?.cover && (
                                <div>
                                    {exUrl && (
                                        <img
                                            src={`${whatup?.cover}`}
                                            alt={whatup?.title}
                                            className="cursor-pointer max-w-full h-auto rounded-lg "
                                        />
                                    )}
                                </div>
                            )}
                        </a>
                    </Link>
                </div>
                <div className="ml-4">
                    <Link href={`/whatup/${whatup?.id}`}>
                        <p className="text-sm md:text-2xl cursor-pointer text-center text-green-500">
                            {whatup?.title}
                        </p>
                    </Link>

                    <div className="py-14">
                        <div className="">
                            <div>
                                <p className="">
                                    <span>created</span>
                                    <span className="ml-2">
                                        {moment(whatup?.created_at).format(
                                            "YY-MM-DD HH:mm"
                                        )}
                                    </span>

                                    <span className="ml-2">
                                        {moment(whatup?.created_at).fromNow()}
                                    </span>
                                </p>
                            </div>
                            {edit ? (
                                <div className="py-6">
                                    <div className="flex justify-between">
                                        <div>
                                            <p>
                                                <span className="text-gray-200 mr-2 font-bold">
                                                    last update
                                                </span>
                                                <span>
                                                    {moment(
                                                        whatup?.updated_at
                                                    ).fromNow()}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="flex justify-center">
                                                <span className="mr-2 font-bold text-gray-300 ">
                                                    public status
                                                </span>

                                                {whatup?.is_public ? (
                                                    <span className="text-green-600 font-bold">
                                                        PUBLIC
                                                    </span>
                                                ) : (
                                                    <span className="text-yellow-500 font-bold">
                                                        PRIVATE
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="">
                                            <button
                                                className="btnEdit mr-2"
                                                value={whatup?.id}
                                                onClick={(e) =>
                                                    showForm(e.target.value)
                                                }
                                            >
                                                edit
                                            </button>
                                            <button
                                                className="btnDelete"
                                                value={whatup?.id}
                                                onClick={(d) =>
                                                    delMe(d.target.value)
                                                }
                                            >
                                                del
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <p>
                                        <span className="text-gray-200 font-bold mr-2">
                                            by
                                        </span>
                                        <span>{whatup?.user.name}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhatupCard;
