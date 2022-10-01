import axios from "../../libs/axios";
import Head from "next/head";
import GuestLayout from "../../components/layout/GuestLayout";
import moment from "moment";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context) => {
    const { id } = context.query;

    const res = await axios.get(`/api/whatup/${id}`);
    const whatup = await res.data.whatup;

    return {
        props: {
            whatup,
        },
    };
};

const imgPath = process.env.NEXT_PUBLIC_BACKEND_URL;

export const Whatup = ({ whatup }) => {
    const wp = whatup;
    const { user } = useAuth({ middleware: "guest" });
    const my_web = process.env.NEXT_PUBLIC_MY_WEBSITE;

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

            //            console.log(`me is run the ex is ${exUrl} ha`);
        };

        isExUrl(wpCover);
    }, [whatup, exUrl]);
    return (
        <>
            <Head>
                <title>
                    {wp?.title} | {my_web}
                </title>
            </Head>
            <GuestLayout>
                <section>
                    {!wp && (
                        <div>
                            <div>
                                <h1 className="text-center text-red-500 font-bold">
                                    Error! no content
                                </h1>
                                <p>
                                    {user && (
                                        <span>cannot find public content</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )}
                    {wp && (
                        <div className="flex justify-center items-center">
                            <div>
                                <div className="mb-8">
                                    <h1 className="text-center text-blue-500 font-bold">
                                        {wp?.title}
                                    </h1>
                                </div>
                                <div className="flex justify-center flex-col gap-2">
                                    <div className="px-4 max-w-6xl">
                                        {!exUrl && (
                                            <img
                                                src={`${imgPath}/${whatup?.cover}`}
                                                alt={whatup?.title}
                                                className="max-w-full h-auto rounded-lg "
                                            />
                                        )}

                                        {exUrl && (
                                            <img
                                                src={`${whatup?.cover}`}
                                                alt={whatup?.title}
                                                className="max-w-full h-auto rounded-lg "
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col md:flex-row md:justify-between">
                                        <p className="text-center">
                                            {wp?.title}
                                        </p>

                                        <p className="ml-2">
                                            <span>on</span>
                                            <span className="ml-1 mr-2">
                                                {moment(wp?.created_at).format(
                                                    "YYYY-MMM-DD HH:mm a"
                                                )}
                                            </span>
                                            <span>
                                                {moment(
                                                    wp?.created_at
                                                ).fromNow()}
                                            </span>
                                        </p>

                                        <p className="ml-2">
                                            <span className="mr-2">by</span>
                                            <span>{wp?.user.name}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="py-8 px-4">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: wp?.body,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </GuestLayout>
        </>
    );
};
export default Whatup;
