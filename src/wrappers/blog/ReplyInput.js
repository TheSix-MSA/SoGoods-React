import React from 'react';
import useInputs from "../../customHooks/useInputs";
import repliesService from "../../service/repliesService";

const initState = {
    writer: "라이터",
    email: "이메일",
    content: "",
    groupId: 0,
    level: 1,
    parentId: 0,
    keyValue: 1
}

const ReplyInput = ({bno, maxPage}) => {
    const [reply, changeReply, setReply] = useInputs(initState);

    const send = () => {
        reply.keyValue = bno;
        repliesService.insertReply(reply, maxPage).then();
        setReply({...reply, content:""})
    }

    return (
        <div className="blog-reply-wrapper mt-50">
            <h4 className="blog-dec-title">post a comment</h4>
            <div className="blog-form">
                <div className="row">
                    <div className="col-md-10">
                        <div className="text-leave">
                            <textarea className="DatGeulInput" name="content" placeholder="Message" maxLength={2000}
                                   onChange={changeReply} value={reply.content}/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" onClick={() => send()}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyInput;