import {useEffect, useState} from "react";


export function useIsVisible(id) {
    if(document.getElementById(id) === null) {
        return true
    }

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }
    );

        observer.observe(document.getElementById(id));
        return () => {
            observer.disconnect();
        };
    }, [id]);


    const [isIntersecting, setIntersecting] = useState(false);

    return isIntersecting;
}