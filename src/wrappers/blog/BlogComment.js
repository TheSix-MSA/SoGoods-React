import React, {Fragment, useEffect, useState} from "react";
import repliesService from "../../service/repliesService";

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
    page: 1,
    size: 30,
    totalCount: 0,
    pageList: [],
    prev: false,
    next: false
  },
  bno: 1
};

const BlogComment = () => {
  const [replies, setReplies] = useState(initState);

  useEffect(() => {
    repliesService.getList(replies.bno, replies.pageMaker.page).then(res => {
      setReplies(res.response);
      console.log(res)
    }).catch();
    /***
     * 캐치 문 필요
     */
  }, []);

  console.log("Replies here!:  ", replies)
  return (
    <Fragment>
      <div className="blog-comment-wrapper mt-55">
        <h4 className="blog-dec-title">comments</h4>
        {replies.repliesDTOList && replies.repliesDTOList.map(dto => dto.rno !== dto.groupId ?
          <div className="single-comment-wrapper mt-50 ml-120">
            <div className="blog-comment-content">
              <h4>{dto.writer}, {dto.rno}</h4>
              <span>{dto.modDate} </span>
              <p>
                {dto.content},{" "}
              </p>
            </div>
          </div>
          :
        <div className="single-comment-wrapper mt-35">
          <div className="blog-comment-content">
            <h4>{dto.writer}, {dto.rno}</h4>
            <span>{dto.modDate ?dto.modDate.substr(0,11):"20202020202"} </span>
            <p>
              {dto.content},{" "}
            </p>
          </div>
        </div>
        )}
      </div>
      <div className="blog-reply-wrapper mt-50">
        <h4 className="blog-dec-title">post a comment</h4>
        <form className="blog-form">
          <div className="row">
            <div className="col-md-10">
              <div className="text-leave">
                <textarea placeholder="Message" defaultValue={""} />
              </div>
            </div>
            <div className="col-md-2">
              <input type="submit" defaultValue="SEND MESSAGE" />
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default BlogComment;
