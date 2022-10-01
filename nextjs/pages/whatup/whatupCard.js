import Link from "next/link";
import WhatupImage from "../../components/whatupImage";
export const WhatupCard = ({ whatup }) => {
    return (
        <div className="">
            <Link href={`/whatup/${whatup?.id}`}>
                <a>
                    <div className="hover:bg-blue-500 hover:font-bold hover:text-white hover:cursor-pointer ">
                        <div>
                            <WhatupImage
                                cover={whatup?.cover}
                                whatup={whatup}
                            ></WhatupImage>
                        </div>

                        <div className="text-center hover:px-4">
                            <p>{whatup?.title}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default WhatupCard;
