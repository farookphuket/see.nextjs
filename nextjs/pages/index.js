import GuestLayout from "../components/layout/GuestLayout";

import { useWhatup } from "./api/whatup";
import WhatupCard from "./whatup/whatupCard";
import Head from "next/head";
const Home = () => {
    const { whatup, getWhatupPage } = useWhatup();
    const my_web = process.env.NEXT_PUBLIC_MY_WEBSITE;
    const wp = whatup?.data;
    const wpPager = whatup?.data.whatup;
    //console.log(whatup?.data.whatup);

    const paging = (p) => {
        if (!p || p === undefined) return;
        getWhatupPage({ wpURL: p });
    };

    return (
        <>
            <Head>
                <title>welcome to {my_web}</title>
                <meta
                    name="keywords"
                    content="see-southern,see-southern thailand,real business man the action"
                />
            </Head>

            <GuestLayout>
                <section className="flex items-center justify-center">
                    <div className="mt-6 flex max-w-6xl flex-wrap items-center justify-around sm:w-full">
                        <div className="mt-6 w-full rounded-xl border p-6 text-left ">
                            <h3 className="text-2xl font-bold">Home </h3>
                            <p className="mt-4 text-xl"> welcome to {my_web}</p>
                        </div>

                        <div className="grid grid-cols-1 p-2 gap-4 md:grid-cols-3">
                            {wp?.whatup.data &&
                                wp?.whatup.data.map((wp) => (
                                    <WhatupCard
                                        key={wp?.id}
                                        whatup={wp}
                                        wpPager={wpPager}
                                    ></WhatupCard>
                                ))}
                        </div>
                        <div className="md:pt-48">
                            <div className="">
                                <ul className="flex flex-col md:flex-row md:gap-4">
                                    {wpPager &&
                                        wpPager.links.map((ln, index) => (
                                            <li key={index}>
                                                {!ln.active ? (
                                                    <button
                                                        className="border border-blue-300 p-2"
                                                        dangerouslySetInnerHTML={{
                                                            __html: ln.label,
                                                        }}
                                                        value={ln.url}
                                                        onClick={(p) =>
                                                            paging(
                                                                p.target.value
                                                            )
                                                        }
                                                    ></button>
                                                ) : (
                                                    <button
                                                        className="cursor-not-allowed border border-gray-100 px-2 bg-gray-300 p-2"
                                                        dangerouslySetInnerHTML={{
                                                            __html: ln.label,
                                                        }}
                                                    ></button>
                                                )}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    );
};

export default Home;
