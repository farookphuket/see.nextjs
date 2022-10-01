import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import MemberLayout from "../../components/layout/MemberLayout";

import WhatupCard from "./whatup/whatupCard";
import WhatupForm from "./whatup/whatupForm";
import { useWhatup } from "../api/whatup";
import { useMember } from "../api/member";
import Modal from "../../components/Modal";

const bs = process.env.NEXT_PUBLIC_BACKEND_URL;
const org = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN;

export default function Member() {
    const { user } = useAuth({ middleware: "auth", kickTo: "/login" });

    const { whatup, getWhatupPage } = useWhatup();
    const wtp = whatup?.data.whatup;
    const wpPager = whatup?.data.whatup;
    //    console.log(wpPager);

    const paging = (p) => {
        if (!p || p === undefined) return;
        getWhatupPage({ wpURL: p });
    };

    const [showM, setShowM] = useState(false);
    const theM = () => {
        !showM ? setShowM(true) : setShowM(false);
    };
    return (
        <MemberLayout>
            <section className="flex items-center justify-center py-4">
                <div className="mt-6 flex max-w-6xl  flex-wrap items-center justify-around sm:w-full">
                    <div className="py-4 w-full">
                        <h1 onClick={theM}>howdy! ,{user?.name}</h1>
                        <div className="flex justify-end items-end">
                            <p>got something to share?</p>
                            <button className="btn" onClick={theM}>
                                what&apos;s up
                            </button>
                        </div>

                        <Modal title="what in your mind" modalShow={showM}>
                            <section className="py-14">
                                <div className="flex justify-end items-end">
                                    <button
                                        className="btnDelete"
                                        onClick={theM}
                                    >
                                        close
                                    </button>
                                </div>
                                <WhatupForm editId={0}></WhatupForm>
                            </section>
                        </Modal>
                    </div>

                    <div className="py-14">
                        {wtp &&
                            wtp?.data.map((wp) => (
                                <WhatupCard
                                    key={wp?.id}
                                    whatup={wp}
                                ></WhatupCard>
                            ))}
                    </div>

                    <div className="flex-none w-full">
                        <div className="">
                            <ul className="flex flex-row gap-2 md:gap-4">
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
                                                        paging(p.target.value)
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
        </MemberLayout>
    );
}
