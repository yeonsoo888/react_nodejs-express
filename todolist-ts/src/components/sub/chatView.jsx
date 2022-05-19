import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChatView() {

    const parm = useParams();

    return (
        <>
            <div className='chatViewWrap'>
                <ul>
                    <li>{parm.id}</li>
                </ul>
            </div>
        </>
    )
}