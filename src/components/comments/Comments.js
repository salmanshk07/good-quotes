import { useEffect, useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";

const Comments = ({ comments, addCommentHandler, id }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => setIsAddingComment(false), [comments]);

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm addCommentHandler={addCommentHandler} quoteId={id} />
      )}
      {comments.length > 0 &&
        comments.map((item) => (
          <div className={classes.CommentsWrapper}>
            <p className={classes.author}>{item.author}:</p>
            <p>{item.comment}</p>
          </div>
        ))}
    </section>
  );
};

export default Comments;
