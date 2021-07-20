import React from 'react';

const ReplyModify = () => {
    return (
        <div>
            <div className="blog-reply-wrapper mt-50">
                <h4 className="blog-dec-title">post a comment</h4>
                <div className="reReply-blog-form">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="text-leave">
                                <input type="textarea" name="content" placeholder="Message"
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
        </div>
    );
};

export default ReplyModify;