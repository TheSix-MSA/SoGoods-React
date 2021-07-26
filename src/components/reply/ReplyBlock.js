import React from 'react';
import ReReplyInput from "./ReReplyInput";
import ReplyModify from "./ReplyModify";
import getFormatDate from "../../modules/getFormatDate";

const ReplyBlock = ({dto, deleteReply, bno, page, reReply, isReplying, updateReply, isModifying, user}) => {

    return (
        <>
            {!dto.removed?
                <div className="blog-comment-content">
                    <>{isModifying.val&&isModifying.id===dto.rno?(<ReplyModify bno={bno} dto={dto} page={page}/>):
                        <>
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <div style={{display:"flex", paddingLeft:"10px"}}>
                                    <p style={{fontSize:"13px"}}>{dto.writer}</p>
                                    <span style={{marginLeft:"10px", fontSize:"10px"}}>{getFormatDate(new Date(dto.modDate))}</span>
                                </div>
                                <div className="btnForReply" style={{display:"flex"}}>
                                        <span onClick={() => reReply(dto.rno)} style={{marginRight:"10px", fontSize:"12px", cursor:"pointer"}}>답글</span>
                                    {user&&user.email===dto.email?
                                            <span onClick={() => updateReply(dto.rno)} style={{marginRight:"10px", fontSize:"12px", cursor:"pointer"}}>수정</span>
                                        : null}
                                    {user&&(user.email===dto.email||user.roles.includes("ADMIN"))?
                                            <span onClick={() => deleteReply(dto.rno, bno)} style={{marginRight:"10px", fontSize:"12px", cursor:"pointer"}}>삭제</span>
                                        :null}
                                </div>
                            </div>
                            <p style={{paddingLeft:"10px"}}>
                                {dto.content}{" "}
                            </p>

                        </>
                    }</>
                    <div>
                        {isReplying.val&&isReplying.id===dto.rno?(<ReReplyInput user={user} bno={bno} dto={dto} page={page}/>):null}
                    </div>
                </div>
                :
                <div className="blog-comment-content">
                    <p style={{margin:"0", padding:"0", fontSize:"10px"}}>삭제된 댓글입니다.</p>
                </div>
            }
        </>
    );
};

export default ReplyBlock;