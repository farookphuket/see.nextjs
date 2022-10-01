import { useState } from "react";
import GuestLayout from "../components/layout/GuestLayout";

import Input from "../components/form/Input";

import { useAuth } from "../hooks/auth";

export default function Register() {
    const { user, register } = useAuth({
        middleware: "guest",
        kickTo: "/register",
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const getRegister = async (e) => {
        e.preventDefault();
        register({ setError, setSuccess, name, email, password });
    };
    return (
        <GuestLayout>
            <section className="flex items-center justify-center">
                <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
                    <div className="mt-6 w-full rounded-xl border p-6 text-left ">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                            <div>
                                <h1>Warning!</h1>
                                <p>
                                    {process.env.NEXT_PUBLIC_MY_WEBSITE} did not
                                    required you to register or login
                                </p>
                            </div>
                            <div>
                                <h1>คำเตือน!</h1>
                                <p>
                                    ท่านไม่จำเป็นต้อง เข้าระบบ หรือ
                                    สมัครสมาชิกแต่หากอยากจะร่วมกับเราก็เชิญเลย
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 w-full rounded-xl border text-left ">
                        <form onSubmit={getRegister} className="p-2 block">
                            <div className="py-2">
                                <label htmlFor="" className="Label">
                                    name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="your name"
                                    className="InputText"
                                    onBlur={(e) => setName(e.target.value)}
                                ></Input>
                            </div>
                            <div className="py-2">
                                <label htmlFor="" className="Label">
                                    email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="your email"
                                    className="InputText"
                                    onBlur={(e) => setEmail(e.target.value)}
                                ></Input>
                            </div>

                            <div className="py-2 mb-4">
                                <label htmlFor="" className="Label">
                                    password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="~~~~"
                                    className="InputText"
                                    onBlur={(e) => setPassword(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex justify-between space-x-4">
                                &nbsp;
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
                                <div>
                                    <button
                                        type="submit"
                                        className="border border-green-400 
                                        rounded p-1 md:p-2 bg-gray-200 
                                        hover:bg-green-400 hover:text-white"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
