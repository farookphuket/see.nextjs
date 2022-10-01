import { useEffect } from "react";
import useSWR from "swr";
import axios from "../../libs/axios";

export const useVisitor = () => {
    const {
        data: visitor,
        error,
        mutate,
    } = useSWR("/api/visitor", () =>
        axios
            .get("/api/visitor")
            .then((res) => res.data)
            .catch((error) => {
                console.log(error);
            })
    );

    useEffect(() => {
        if (error) console.log(error);
    }, [visitor, error]);

    return {
        visitor,
    };
};

export default useVisitor;
