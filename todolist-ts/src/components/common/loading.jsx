import React , { useEffect, forwardRef,useImperativeHandle, useState} from "react";

const Loading = forwardRef((props,ref) => {
    const [loading,setLoading] = useState(true)
    useImperativeHandle(ref, () => {
        return {
            loading: () => setLoading(true),
            done: () => setLoading(false)
        }
    })


    return <>
        {
            loading && (
                <div className="loadingWrap">
                    <div className="lds-dual-ring"></div>
                </div>
            )
        }
    </>;
})

export default Loading;
