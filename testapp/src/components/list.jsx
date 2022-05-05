import React from "react";
import {ListGroup} from 'react-bootstrap';

function List({post , confirmErr , loginedUser}) {
    return (
        <>
            <div className="inner">
                <p>안녕하세요 {loginedUser.email} 님</p>
                <ListGroup as="ul">
                    {
                        post.map((item, i) => {
                            return (
                                <ListGroup.Item as="li" key={i}>
                                    <h4>{item.title}</h4>
                                    <p>{item.content}</p>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
                {
                    !confirmErr && <p>내용이 없습니다.</p>
                }
            </div>
        </>
    );
}

export default List;
