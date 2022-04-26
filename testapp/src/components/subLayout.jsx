import React from "react";

function SubLayout({children,name}) {
    return (
        <section className={`${name} subPage`}>
            {children}
        </section>
    );
}

export default SubLayout;
