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
  bno: 4
};

const BlogComment = () => {
  const [replies, setReplies] = useState(initState);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    repliesService.getList(replies.bno, replies.pageMaker.page).then(res => {
      setReplies(res.response);
    }).catch();
    /***
     * catch 문 채워줘야함
     */
  }, [replies.pageMaker.page, flag]);

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
