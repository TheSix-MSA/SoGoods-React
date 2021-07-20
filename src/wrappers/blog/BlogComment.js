import React, {Fragment, useEffect, useState} from "react";
import repliesService from "../../service/repliesService";
import ReplyBlock from "./ReplyBlock";
import ReplyInput from "./ReplyInput";

const initState = {
  repliesDTOList: [
    {
      rno: 0,
      writer: "",
      email: "",
      content: "",
      removed: false,
      groupId: 0,
      level: 0,
      parentId: 0,
      regDate: "",
      modDate: ""
    },],
  pageMaker: {
    page: 0,
    size: 20,
    totalCount: 0,
    pageList: [],
    prev: false,
    next: false
  },
  bno: 1
};

const BlogComment = () => {
  const [replies, setReplies] = useState(initState);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    repliesService.getList(replies.bno, replies.pageMaker.page).then(res => {
      setReplies(res.data.response);
    });
    /***
     * catch 문 채워줘야함
     */
  }, [replies.pageMaker.page, flag, replies.bno]);

  const deleteReply = (rno) => {
    repliesService.deleteReply(rno, replies.pageMaker.page)
        .then()
        .catch();
    /***
     * Toastify need for successful deletion
     * + need to take care of catch
     */
  }

  const movePage = (num) => {
    /**
     * 재렌더링을 위해 만든 함수. 댓글 페이지가 바뀌거나 바뀌지 않더라도
     * 새로운 댓글이 입력되거나 하면 실행하여 재랜더링.
     */
    replies.pageMaker.page = num;
    setReplies({...replies});
    setFlag(!flag);
  }

  repliesService.setMovePage(movePage);

  const [isReplying, setIsReplying] = useState({
    id: 0,
    val: false
  });
  //대댓글 작성중인지 확인하는 용도로 사용하는 상태

  const [isModifying, setIsModifying] = useState({
    id: 0,
    val: false
  });

  const removeInput = () => {
    /***
     * isReplying 상태를 false로 바꿔 useEffect에 재랜더링을 시키는 함수
     */
    setIsReplying({
      id:0,
      val: false
    });
  }

  const removeModifyInput = () => {
    /***
     * isReplying 상태를 false로 바꿔 useEffect에 재랜더링을 시키는 함수
     */
    setIsModifying({
      id: 0,
      val: false
    });
  }

  const reReply = (rno) => {
    /***
     * 대댓글 입력 컴포넌트를 불러오는 함수.
     * isReplying을 true로 바꿔서 불러온다.
     */
    setIsReplying({
      id:rno,
      val: true
    });
    repliesService.setRemoveInput(removeInput);
    // repliesService에 removeInput 을 위에 만든 removeInput으로 설정하는 함수
  }

  useEffect(()=>{
    /**
     * 대댓글이 입력되거나, 인풋창을 띄워놓고 취소할때
     * 인풋창을 없에기 위해 만든 useEffect
     */
  },[isReplying, isModifying])

  const updateReply = (rno)=>{
    /***
     * 수정 버튼 클릭시 수정 컴포넌트를 불러오는 함수
     * isModifying 을 true로 바꿔서 가져온다.
     */

    setIsModifying({
      id: rno,
      val: true
    });
    repliesService.setRemoveModifyInput(removeModifyInput)
  }

  return (
    <Fragment>
      <div className="blog-comment-wrapper mt-55">
        <h4 className="blog-dec-title">comments</h4>
        {replies.repliesDTOList && replies.repliesDTOList.map(dto =>
          <div className={ dto.rno !== dto.groupId ?
              "single-comment-wrapper mt-50 ml-120":"single-comment-wrapper mt-35"} key={dto.rno}>
            <ReplyBlock dto={dto}
                        deleteReply={deleteReply}
                        bno={replies.bno}
                        page={replies.pageMaker.page}
                        updateReply={updateReply}
                        reReply = {reReply}
                        removeInput = {removeInput}
                        removeModifyInput={removeModifyInput}
                        isReplying = {isReplying}
                        isModifying ={isModifying}
            />
          </div>
        )}
      </div>

      <div className="reply-pagination">
        {replies.pageMaker.prev && <span>Prev</span>}
        {replies.pageMaker.pageList.map(i => i===replies.pageMaker.page? <span key={i}><b>{i}</b></span>:
            <span key={i} onClick={() => movePage(i)}>{i}</span>)}
        {replies.pageMaker.next && <span>Next</span>}
      </div>

      <ReplyInput bno={replies.bno} page={replies.pageMaker.page}
                  maxPage={replies.pageMaker.pageList.length!==0?replies.pageMaker.pageList[replies.pageMaker.pageList.length-1]:1}/>
    </Fragment>
  );
};

export default BlogComment;
