import { useEffect } from 'react';

const Cursor = () => {
    useEffect(() => {
        const cursor = document.getElementById("cursor");
        if (!cursor) return;

        const moveCursor = (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        };

        const addHoverClass = () => cursor.classList.add("cursor-hover");
        const removeHoverClass = () => cursor.classList.remove("cursor-hover");

        document.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll("a, button, input, textarea");
        interactiveElements.forEach(item => {
            item.addEventListener("mouseenter", addHoverClass);
            item.addEventListener("mouseleave", removeHoverClass);
        });

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach(item => {
                item.removeEventListener("mouseenter", addHoverClass);
                item.removeEventListener("mouseleave", removeHoverClass);
            });
        };
    }, []);

    return <div className="cursor" id="cursor"></div>;
};

export default Cursor;
