import { useQuery } from "react-query";
import { getOfferComments } from "../../apiFunctions/getOfferComments";
import { Comment } from "../../models/Comment";
import { useAuthContext } from "../../providers/AuthProvider";
import "./style.scss";
import { useState } from "react";
import { createOfferComment } from "../../apiFunctions/createOfferComment";

interface Props {
  offerId: string;
}

export function OfferComments({ offerId }: Props) {
  const { currentUser } = useAuthContext();
  const { data: comments } = useQuery(["comments", offerId], () =>
    getOfferComments(offerId)
  );
  const [newComment, setNewComment] = useState<string>("");
  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const commentValue = event.target.value;
    setNewComment(commentValue);

    const charCountSpan = document.getElementById("charCount");
    if (charCountSpan) {
      charCountSpan.innerText = commentValue.length.toString();
    }

  };

  const handleAddComment = () => {
    const comment: Comment = {
      username: currentUser!.username,
      text: newComment,
      offer_id: parseInt(offerId),
      Date: new Date().toString(),
    };
    createOfferComment(comment)
      .then(() => {
        setNewComment("");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
        window.location.reload();
      });
  };
  return (
    <>
    <div className="comments">
      {comments &&
        comments.map((comment: Comment) => (
          <>
            {currentUser && currentUser.username === comment.username ? (
              <div className="commentItem myComment">
                <div className="author">
                <h5>{comment.username}</h5>
                </div>
                <div className="content">
                <p>{comment.text}</p>
                </div>
              </div>
            ) : (
              <div className="commentItem opponentComment">
                <div className="author">
                <h5>{comment.username}</h5>
                </div>
                <div className="content">
                <p>{comment.text}</p>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <div className = "createComment">
      <textarea
        placeholder="Dodaj komentarz"
        onChange={onCommentChange}
      >
      </textarea>
      <br />
      <p>Ilość znaków: <span id="charCount">{newComment.length}</span>/255</p>
      <br />
      <button type="button" className = "commentButton" onClick={handleAddComment} disabled={newComment.length > 255}>
        Dodaj komentarz
      </button>
      </div>
    </>
  );
}
