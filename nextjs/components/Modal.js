export const Modal = ({ title, modalShow, children }) => {
    return (
        <div className="py-4 md:px-20 md:p-20">
            <div
                className={`modal fade fixed top-16 md:left-32 md:mx-auto w-full md:w-10/12 h-full outline-none overflow-x-hidden overflow-y-auto ${
                    !modalShow && "hidden"
                }`}
                id="exampleModalXl"
                tabIndex="-1"
                aria-labelledby="exampleModalXlLabel"
                aria-modal="true"
                role="dialog"
            >
                <div className="modal-dialog modal-xl relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5
                                className="text-xl font-medium leading-normal text-gray-800"
                                id="exampleModalXlLabel"
                            >
                                {title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body relative w-full md:p-4">
                            {children}
                        </div>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
