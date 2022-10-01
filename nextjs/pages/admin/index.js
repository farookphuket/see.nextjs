import AdminLayout from "../../components/layout/AdminLayout";

import { useAdmin } from "../api/admin";
import moment from "moment";
import { useWhatup } from "../api/whatup";
import WhatupCard from "./whatup/whatupCard";
import WhatupForm from "../member/whatup/whatupForm";
import { useAuth } from "../../hooks/auth";
import Modal from "../../components/Modal";
import { useState } from "react";
export default function Admin() {
    const { whatup, getWhatupPage } = useWhatup();
    const { visitors, goToPage } = useAdmin();
    const { user } = useAuth();
    const [editId, setEditId] = useState(0);
    // whatup list
    const wp = whatup?.data.whatup;

    const wpPager = whatup?.data.whatup;

    const paging = (p) => {
        if (!p || p === undefined) return;
        getWhatupPage({ wpURL: p });
    };
    //console.log(wp);

    const vData = visitors?.data;
    const vLinks = visitors?.links;

    const goTo = async (url) => {
        //        console.log(url);
        if (!url || url === undefined) return;
        goToPage({ url });
    };

    // modal
    const [showModal, setShowModal] = useState(false);
    const theModal = () => {
        if (!editId) setEditId(0);
        //   console.log(`edit id is ${editId}`);

        !showModal ? setShowModal(true) : setShowModal(false);
    };
    //    console.log(wp);
    return (
        <AdminLayout>
            <div className="flex items-center justify-center">
                <div className="flex max-w-6xl flex-wrap items-center justify-around sm:w-full">
                    <div>
                        <div className="">
                            <h1 className="text-center font-bold">
                                howdy? {user?.name}
                            </h1>
                        </div>
                        <div className="flex justify-end items-end w-full">
                            <p className="text-blue-600 underline font-bold mr-6">
                                want to write something dude
                            </p>
                            <div className="">
                                <button className="btn" onClick={theModal}>
                                    What&apos;s up?
                                </button>
                            </div>
                        </div>

                        <Modal title="what to share" modalShow={showModal}>
                            <section className="py-6 px-4">
                                <div className="text-right">
                                    <button
                                        className="btnDelete"
                                        onClick={theModal}
                                    >
                                        close
                                    </button>
                                </div>
                                <div className="py-6">
                                    <WhatupForm editId={0}></WhatupForm>
                                </div>
                            </section>
                        </Modal>
                    </div>
                    <div className="">
                        <h2 className="text-center ">
                            <span>all post</span>
                            <span className="ml-2 text-green-400">
                                {wp?.data.length}
                            </span>
                        </h2>

                        <div className="pb-6">
                            {wp &&
                                wp?.data.map((w) => (
                                    <WhatupCard
                                        key={w?.id}
                                        whatup={w}
                                    ></WhatupCard>
                                ))}
                        </div>
                        {/* pagination link*/}

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
                        {/* pagination END*/}
                    </div>
                </div>
            </div>

            <div className="py-14 px-4">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="border border-slate-300 w-35">
                                    ip
                                </th>
                                <th className="border border-slate-300 w-15">
                                    browser
                                </th>
                                <th className="border border-slate-300 w-15">
                                    os
                                </th>
                                <th className="border border-slate-300 w-25">
                                    visited
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {vData &&
                                vData.map((v) => (
                                    <tr
                                        key={v.id}
                                        className="hover:bg-gray-50 hover:border-blue-400 hover:border hover:text-blue-600 hover:font-bold hover:underline hover:p-4"
                                    >
                                        <td className="border-l-2   md:border-l-0 border-b-2 md:border-b-0">
                                            {v.ip}
                                        </td>
                                        <td className="border-l-2 md:border-l-0 border-b-2 md:border-b-0">
                                            {v.browser}
                                        </td>
                                        <td className="border-l-2 md:border-l-0 border-b-2 md:border-b-0">
                                            {v.os}
                                        </td>
                                        <td className="border-l-2 md:border-l-0 border-b-2 md:border-b-0">
                                            <div className="flex flex-col md:flex-row md:justify-between">
                                                <span className="ml-3 ">
                                                    {moment(
                                                        v.created_at
                                                    ).format(
                                                        "YY-MM-DD HH:mm:ss"
                                                    )}
                                                </span>

                                                <span className=" ml-3 mr-4">
                                                    {moment(
                                                        v.created_at
                                                    ).fromNow()}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <ul className="flex flex-wrap md:flex-row md:justify-between">
                                        {vLinks &&
                                            vLinks.map((l, index) => (
                                                <li
                                                    key={index}
                                                    className="py-6"
                                                >
                                                    {l.active && (
                                                        <button
                                                            className="font-bold ml-2 border border-gray-400 p-2 rounded-xl "
                                                            dangerouslySetInnerHTML={{
                                                                __html: l.label,
                                                            }}
                                                        ></button>
                                                    )}
                                                    {!l.active && (
                                                        <button
                                                            className="text-green-700 border border-blue-400 p-2 font-bold hover:bg-blue-300 hover:text-white rounded-lg cursor-pointer"
                                                            dangerouslySetInnerHTML={{
                                                                __html: l.label,
                                                            }}
                                                            value={l.url}
                                                            onClick={(e) =>
                                                                goTo(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        ></button>
                                                    )}
                                                </li>
                                            ))}
                                    </ul>
                                </td>
                                <td>
                                    <div className="py-16">
                                        <div className="grid grid-cols-1 md:flex md:justify-center items-center">
                                            {visitors?.current_page && (
                                                <p>
                                                    <span>page</span>
                                                    <span className="ml-2 font-bold text-blue-600">
                                                        {visitors.current_page}
                                                    </span>
                                                </p>
                                            )}
                                            {visitors?.last_page && (
                                                <p>
                                                    <span className="ml-2 mr-1">
                                                        of
                                                    </span>

                                                    <span className="mr-2">
                                                        {visitors.last_page}
                                                    </span>
                                                    <span>pages of total</span>
                                                    <span className="ml-1 mr-2">
                                                        {visitors.total}
                                                    </span>
                                                    <span>items</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
