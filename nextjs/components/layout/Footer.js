import { useVisitor } from "../../pages/api/visitor";
export const Footer = ({ children }) => {
    const { visitor } = useVisitor();
    const my_web = process.env.NEXT_PUBLIC_MY_WEBSITE;
    const vt = visitor?.visitor;

    return (
        <footer className="py-6 px-2 bg-gray-100 block my-auto md:justify-between  md:flex md:space-x-4  w-full  border-t">
            <div className="max-w-md">
                <p>
                    <span>my home town</span>
                    <span className="ml-2">Thailand</span>
                </p>

                <p>
                    {my_web} has created on 17 aug 2002 with the hope to learn
                    and share the skill with any other.
                </p>
            </div>
            <div className="max-w-lg">
                <div className="w-full py-4 md:py-0">
                    <div className="border-b-4 border-b-white">
                        <h3 className="text-gray-300  text-3xl">visitors</h3>
                    </div>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-1">
                        <li>
                            <span className="mr-1">today</span>
                            <span>{vt?.visited_today}</span>
                        </li>

                        <li className="border-l-0 md:border-l-4">
                            <span className="mr-1">this month</span>
                            <span>{vt?.visited_month}</span>
                        </li>

                        <li className="border-l-0 md:border-l-4">
                            <span className="mr-1">this year</span>
                            <span>{vt?.visited_year}</span>
                        </li>

                        <li className="border-l-0 md:border-l-4">
                            <span className="mr-1">all time</span>
                            <span>{vt?.visited_all}</span>
                        </li>
                    </ul>
                    <ul className="block md:flex justify-between md:space-x-2">
                        <li className="">
                            <span>ip</span>
                            <span className="font-bold text-green-400 ml-2">
                                {vt?.ip}
                            </span>
                        </li>

                        <li className="">
                            <span>os</span>
                            <span className="font-bold text-green-400 ml-2">
                                {vt?.os}
                            </span>
                        </li>

                        <li className="">
                            <span>browser</span>
                            <span className="font-bold text-green-400 ml-2">
                                {vt?.browser}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-lg">{children}</div>
        </footer>
    );
};

export default Footer;
