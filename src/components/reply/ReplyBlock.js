import React from 'react';
import ReReplyInput from "./ReReplyInput";
import ReplyModify from "./ReplyModify";
import getFormatDate from "../../modules/getFormatDate";

const ReplyBlock = ({dto, deleteReply, bno, page, reReply, isReplying, updateReply, isModifying}) => {

    return (
        <>
            {!dto.removed?
                <div className="blog-comment-content">
                    <>{isModifying.val&&isModifying.id===dto.rno?(<ReplyModify bno={bno} dto={dto} page={page}/>):
                        <>
                            <h4>{dto.writer}, {dto.rno}</h4>
                            <span>{getFormatDate(new Date(dto.modDate))}</span>
                            <p>
                                {dto.content}{" "}
                            </p>
                            <div className="btnForReply">
                                <div className="btn">
                                    <span onClick={() => reReply(dto.rno)}>답글</span>
                                </div>
                                <div className="btn">
                                    <span onClick={() => updateReply(dto.rno)}>수정</span>
                                </div>
                                <div className="btn">
                                    <span onClick={() => deleteReply(dto.rno)}>삭제</span>
                                </div>
                            </div>
                        </>
                    }</>
                    <div>
                        {isReplying.val&&isReplying.id===dto.rno?(<ReReplyInput bno={bno} dto={dto} page={page}/>):null}
                    </div>
                </div>
                :
                <div className="blog-comment-content">
                    <h4>삭제된 댓글입니다.</h4>
                </div>
            }
        </>
    );
};

export default ReplyBlock;