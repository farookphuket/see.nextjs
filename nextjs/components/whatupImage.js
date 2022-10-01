import { useEffect, useState } from "react";
import moment from "moment";
const imgInternalPath = process.env.NEXT_PUBLIC_BACKEND_URL;
export const WhatupImage = ({ cover, whatup }) => {
    const [exUrl, setExUrl] = useState(false);

    useEffect(() => {
        const wpCover = cover;

        const isExUrl = (string) => {
            setExUrl(false);
            let pattern = /^((http|https|ftp):\/\/)/;

            if (pattern.test(string)) {
                //url = "http://" + url;
                setExUrl(true);
            }
        };
        isExUrl(wpCover);
    }, [exUrl]);
    return (
        <div className="py-6">
            <div className="relative">
                <div className="max-w-md">
                    {!exUrl && (
                        <img
                            src={`${imgInternalPath}/${cover}`}
                            alt=""
                            className="max-w-full h-auto rounded-lg"
                        />
                    )}
                    {exUrl && (
                        <img
                            src={cover}
                            alt=""
                            className="max-w-full h-auto rounded-lg"
                        />
                    )}
                </div>
                <div className="absolute top-2 right-2 ">
                    <p className="bg-white p-3 text-green-500">
                        <span>by</span>
                        <span className="ml-2">{whatup?.user.name}</span>
                    </p>
                </div>
                <div className="absolute bottom-2 left-2">
                    <div className="flex justify-between gap-3 hover:text-gray-700 text-blue-500">
                        <p className="bg-white p-3 rounded-xl">
                            <span className="mr-2">view</span>
                            <span>{whatup?.read.length}</span>
                        </p>

                        <p className="bg-white p-3">
                            <span className="ml-2">
                                {moment(whatup?.created_at).fromNow()}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatupImage;
