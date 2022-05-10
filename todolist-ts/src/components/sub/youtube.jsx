import React, { useEffect, useRef , useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../common/popup";

function Youtube() {
    const popUp = useRef(null);
    const youtubeList = useSelector(store => store.youtubeReducer.youtube);
    const [selectedVid,setSelectedVid] = useState({
        id : {
            videoId : null,
        }
    })
    const selectVideo = (idx) => {
        setSelectedVid(youtubeList[idx]);
    }
    
    return (
        <>
            <div className="limit">
                <div className="subPage">
                    <ul className="youtubeList">
                        {
                            youtubeList.map((item,idx) => {
                                return (
                                    <li key={idx} onClick={() => {
                                        popUp.current.open();
                                        selectVideo(idx);
                                    }}>
                                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                                        <strong className="youtube__tit">{item.snippet.title}</strong>
                                        <p className="youtube__txt">{item.snippet.description}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {/* <li onClick={(e) => {
                        popUp.current.open()
                    }}>
                        <img src="" alt="" />
                        <strong className="youtube__tit">titletitletitletitle</strong>
                        <p className="youtube__txt">item.snippet.description</p>
                    </li> */}
                </div>
            </div>
            <Popup ref={popUp} >
                <div className="youtubeWrap">
                    <iframe 
                        id="player" 
                        type="text/html"
                        src={`http://www.youtube.com/embed/${selectedVid.id.videoId}?enablejsapi=1&origin=http://example.com`}
                        frameBorder="0"
                    >

                    </iframe>
                </div>
            </Popup>
        </>
    );
}

export default Youtube;
