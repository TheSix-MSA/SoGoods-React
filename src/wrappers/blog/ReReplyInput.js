import React from 'react';
import useInputs from "../../customHooks/useInputs";
import repliesService from "../../service/repliesService";

const initState = {
    writer: "라이터",
    email: "이메일",
    content: "",
    groupId: 0,
    level: 0,
    parentId: 0,
    keyValue: 0
}

const ReReplyInput = ({dto, bno, page}) => {
    const [reReply, changeReReply, setReReply] = useInputs(initState);

    const send = () => {
        /**
         * 작성한 대댓글 저장하는 함수
         */
        reReply.keyValue = bno;
        reReply.groupId = dto.groupId;
        reReply.parentId = dto.rno;
        repliesService.getRemoveInput();
        repliesService.insertReply(reReply, page).then().catch();
        setReReply({...reReply, content:""})
        /***
         * catch 문 채워줘야함
         */
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