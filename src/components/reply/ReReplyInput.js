import React from 'react';
import useInputs from "../../customHooks/useInputs";
import repliesService from "../../service/repliesService";
import {ToastTopRight} from "../../modules/toastModule";

const initState = {
    writer: "",
    email: "",
    content: "",
    groupId: 0,
    level: 0,
    parentId: 0,
    keyValue: 0
}

const ReReplyInput = ({dto, bno, page, user}) => {
    const [reReply, changeReReply, setReReply] = useInputs({...initState,
        writer:user.name.substr(0,user.name.length-1)+"*", email:user.email});

    const send = () => {
        /**
         * 작성한 대댓글 저장하는 함수
         */
        if(reReply.content.trim()===""){
            ToastTopRight("내용을 작성해 주세요.")
            return;
        }
        reReply.keyValue = bno;
        reReply.groupId = dto.groupId;
        reReply.parentId = dto.rno;
        repliesService.getRemoveInput();
        repliesService.insertReply(reReply, page).then();
        setReReply({...reReply, content:""})
    }

    const turnOff = () => {
        /**
         * 대댓글 창은 켰으나 취소하면 발동하는 함수
         */
        repliesService.getRemoveInput();
    }

    return (
        <div className="blog-reply-wrapper mt-50">
            <h4 className="blog-dec-title">post a comment</h4>
            <div className="reReply-blog-form">
                <div className="row">
                    <div className="col-md-10">
                        <div className="text-leave">
                            <textarea className="DatGeulInput" name="content" placeholder="Message" maxLength={2000}
                                   onChange={changeReReply} value={reReply.content}/>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" onClick={() => send()}/>
                        <input type="submit" value="Cancel" onClick={()=> turnOff()}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReReplyInput;