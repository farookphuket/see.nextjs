import moment from "moment";
import { useEffect, useState } from "react";
import WhatupForm from "../../member/whatup/whatupForm";
import { useWhatup } from "../../api/whatup";
import Modal from "../../../components/Modal";
export default function WhatupCard({ whatup }) {
    const wp = whatup;

    const { delWhatup } = useWhatup();
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // show image cover for external url
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
    }, [exUrl]);
    const edit = (id) => {
        //console.log(`will edit ${id}`);
        setShowForm(true);
        setEditId(id);
        setShowModal(true);
    };

    const delWP = async (id) => {
        if (id === 0 || id === undefined) return;
        delWhatup({ delete_id: parseInt(id) });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(0);
        setShowModal(false);
    };
    const imgPath = process.env.NEXT_PUBLIC_BACKEND_URL;
    const isPub = wp?.is_public;

    return (
        <div>
            <div className="border-t-4 border-t-blue-500">
                <div className="py-4 px-6">
                    <h2>{wp?.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="md:mr-20">
                        <div className="max-w-md">
                            <img
                                src={`${imgPath}/${wp?.cover}`}
                                alt=""
                                className="max-w-full h-auto border rounded-lg"
                            />
                            {exUrl && (
                                <img
                                    src={`${wp?.cover}`}
                                    alt=""
                                    className="max-w-full h-auto border rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                    <div className="md:border-l-2 md:border-l-gray-300">
                        <div className="ml-2">
                            <p>
                                <span className="text-sm text-gray-300 font-bold mr-2">
                                    title
                                </span>
                                <span className="text-green-400 font-bold ml-1 mr-4">
                                    {wp?.title}
                                </span>
                            </p>
                            <p className="block">
                                <span className="text-sm text-gray-300 font-bold mr-2">
                                    owner
                                </span>
                                <span className="text-green-400 font-bold ml-1 mr-4">
                                    {wp?.user.name}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-300 font-bold mr-2">
                                    created
                                </span>
                                <span className="text-green-400 font-bold ml-1 mr-4">
                                    {moment(wp?.created_at).fromNow()}
                                </span>
                                <span className="text-sm text-gray-300 font-bold mr-2">
                                    last update
                                </span>
                                <span className="text-green-400 font-bold ml-1 mr-4">
                                    {moment(wp?.updated_at).fromNow()}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-300 font-bold mr-2">
                                    public status
                                </span>

                                {!isPub ? (
                                    <span className="uppercase text-yellow-400 font-bold ml-1 mr-4">
                                        private
                                    </span>
                                ) : (
                                    <span className="uppercase text-green-400 font-bold ml-1 mr-4">
                                        public
                                    </span>
                                )}
                            </p>
                            <div>
                                <button
                                    className="btnEdit"
                                    value={wp?.id}
                                    onClick={(e) => edit(e.target.value)}
                                >
                                    edit
                                </button>
                                <button
                                    className="btnDelete"
                                    value={wp?.id}
                                    onClick={(d) => delWP(d.target.value)}
                                >
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 px-4 pb-6">
                    <div dangerouslySetInnerHTML={{ __html: wp?.body }}></div>
                </div>
                {showForm && (
                    <div className="py-8">
                        <div className="py-4">
                            <div className="flex justify-end">
                                <p>want to cancel click the x button</p>
                                <button
                                    className="btnDelete"
                                    onClick={closeForm}
                                >
                                    x
                                </button>
                            </div>

                            {showModal && (
                                <div className=" w-full md:px-20">
                                    <Modal title="edit" modalShow={showModal}>
                                        <section className="py-8">
                                            <div className="flex justify-end items-end">
                                                <button
                                                    className="btnDelete"
                                                    onClick={closeForm}
                                                >
                                                    close
                                                </button>
                                            </div>
                                            <div className="md:px-4 py-8">
                                                <WhatupForm
                                                    editId={editId}
                                                ></WhatupForm>
                                            </div>
                                        </section>
                                    </Modal>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
