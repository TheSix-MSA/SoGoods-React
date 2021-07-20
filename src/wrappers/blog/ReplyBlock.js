import React, {useEffect, useState} from 'react';
import ReplyInput from "./ReplyInput";
import ReReplyInput from "./ReReplyInput";
import repliesService from "../../service/repliesService";

const ReplyBlock = ({dto, deleteReply, bno, page}) => {
    const [isReplying, setIsReplying] = useState(false);
    //대댓글 작성중인지 확인하는 용도로 사용하는 상태

    const removeInput = () => {
        /***
         * isReplying 상태를 false로 바꿔 useEffect에 재랜더링을 시키는 함수
         */
        setIsReplying(false);
    }

    const reReply = (rno, groupId) => {
        /***
         * 대댓글 입력 컴포넌트를 불러오는 함수.
         * isReplying을 true로 바꿔서 불러온다.
         */
        setIsReplying(true);

        repliesService.setRemoveInput(removeInput);
         // repliesService에 removeInput 을 위에 만든 removeInput으로 설정하는 함수
    }

    useEffect(()=>{
        /**
         * 대댓글이 입력되거나, 인풋창을 띄워놓고 취소할때
         * 인풋창을 없에기 위해 만든 useEffect
         */
    },[isReplying])

    const updateReply = (dto)=>{
        /***
         * 07/20 미완...
         */
        console.log(dto)
    }

    return (
        <>
            {!dto.removed?
                <div className="blog-comment-content">
                    <h4>{dto.writer}, {dto.rno}</h4>
                    <span>{dto.modDate ?dto.modDate.substr(0,10):"20202020202"}</span>
                    <p>
                        {dto.content}{" "}
                    </p>
                    <div className="btnForReply">
                        <div className="btn">
                            <span onClick={() => reReply(dto.rno,dto.groupId)}>답글</span>
                        </div>
                        <div className="btn">
                            <span onClick={() => updateReply(dto)}>수정</span>
                        </div>
                        <div className="btn">
                            <span onClick={() => deleteReply(dto.rno)}>삭제</span>
                        </div>
                    </div>
                    <div>
                        {isReplying?(<ReReplyInput bno={bno} dto={dto} page={page}/>):null}
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