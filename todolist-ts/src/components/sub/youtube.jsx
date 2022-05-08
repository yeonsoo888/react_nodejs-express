import React from "react";
import { useSelector } from "react-redux";

function Youtube() {
    const youtubeList = useSelector(store => store.youtubeReducer.youtube);

    console.log(youtubeList);
    return (
        <>
            <div className="limit">
                <div className="subPage">
                    <ul className="youtubeList">
                        {
                            youtubeList.map((item,idx) => {
                                return (
                                    <li key={idx}>
                                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                                        <strong className="youtube__tit">{item.snippet.title}</strong>
                                        <p className="youtube__txt">{item.snippet.description}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Youtube;
