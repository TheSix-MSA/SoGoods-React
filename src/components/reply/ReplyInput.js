import React from 'react';
import useInputs from "../../customHooks/useInputs";
import repliesService from "../../service/repliesService";
import {ToastTopRight} from "../../modules/toastModule";

const initState = {
    writer: "라이터",
    email: "이메일",
    content: "",
    groupId: 0,
    level: 1,
    parentId: 0,
    keyValue: 1
}

const ReplyInput = ({bno, maxPage, user}) => {
    const [reply, changeReply, setReply] = useInputs({...initState,
        writer:user.name.substr(0,user.name.length-1)+"*", email:user.email});

    const send = () => {
        if(reply.content.trim()===""){
            ToastTopRight("내용을 작성해 주세요.")
            return;
        }

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
                            <textarea className="DatGeulInput" name="content" placeholder="Message" maxLength={2000} style={{background:"none", border:"none"}}
                                   onChange={changeReply} value={reply.content}/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" onClick={() => send()} style={{background:"#cecece"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyInput;