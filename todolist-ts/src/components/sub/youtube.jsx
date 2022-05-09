import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Popup from "../common/popup";

function Youtube() {
    const popUp = useRef(null);
    const youtubeList = useSelector(store => store.youtubeReducer.youtube);
    
    return (
        <>
            <div className="limit">
                <div className="subPage">
                    <ul className="youtubeList">
                        {/* {
                            youtubeList.map((item,idx) => {
                                return (
                                    <li key={idx} onClick={() => {
                                        console.log(popUp)
                                        popUp.current.open();
                                    }}>
                                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                                        <strong className="youtube__tit">{item.snippet.title}</strong>
                                        <p className="youtube__txt">{item.snippet.description}</p>
                                    </li>
                                )
                            })
                        } */}
                    </ul>
                    <li onClick={(e) => {
                        popUp.current.open()
                    }}>
                        <img src="" alt="" />
                        <strong className="youtube__tit">titletitletitletitle</strong>
                        <p className="youtube__txt">item.snippet.description</p>
                    </li>
                </div>
            </div>
            <Popup ref={popUp} />
        </>
    );
}

export default Youtube;
