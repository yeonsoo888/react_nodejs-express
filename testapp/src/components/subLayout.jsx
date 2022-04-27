import React from "react";

function SubLayout({children,name}) {
    return (
        <section className={`${name} subPage`}>
            <div className="inner">
                {children}
            </div>
        </section>
    );
}

export default SubLayout;
