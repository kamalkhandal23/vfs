import { useEffect } from "react";

export function useOutsideClick(ref, handler) {
    useEffect(() => {
        function handleClick(event) {
            if (!ref.current) return;
            if (ref.current.contains(event.target)) return;
            handler(event);
        }
        const timeout = setTimeout(() => {
            document.addEventListener("click", handleClick);
        }, 0);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("click", handleClick);
        };
    }, [ref, handler]);
}