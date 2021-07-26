import React from 'react';
import useInputs from "../../customHooks/useInputs";
import repliesService from "../../service/repliesService";
import {ToastTopRight} from "../../modules/toastModule";

const ReplyModify = ({dto, page}) => {
    const [reply, changeReply, setReply] = useInputs({
        email: dto.email,
        content: dto.content,
        rno: dto.rno
    });

    const send = () => {
        if(reply.content.trim()===""){
            ToastTopRight("내용을 작성해 주세요.")
            return;
        }
        repliesService.updateReply(reply, page).then();
        repliesService.getRemoveModifyInput();
        setReply({...reply, content:""})
        /***
         * 수정 후 textarea에 있는 값 + reply.content의 값을 ""로 바꿔줘야한다.
         */
    }

    const turnOff = () => {
        /**
         * 수정버튼은 눌렀으나 취소하면 발동하는 함수
         */
        repliesService.getRemoveModifyInput();
    }

    return (
        <div className="blog-reply-wrapper-modify">
            <h4 className="blog-dec-title">edit your comment</h4>
            <div className="reply-blog-form-modify">
                <div className="row">
                    <div className="col-md-10">
                        <div className="text-leave">
                            <textarea className="DatGeulInput" name="content" placeholder="Message" maxLength={2000}
                                   onChange={changeReply} value={reply.content}/>
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

export default ReplyModify;