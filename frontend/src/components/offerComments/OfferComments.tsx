import { useQuery } from "react-query";
import { getOfferComments } from "../../apiFunctions/getOfferComments";
import { Comment } from "../../models/Comment";
import { useAuthContext } from "../../providers/AuthProvider";
import "./style.scss";
import { Button } from "../../common/button/Button";
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
    setNewComment(event.target.value);
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
    <div className="comments">
      {comments &&
        comments.map((comment: Comment) => (
          <>
            {currentUser && currentUser.username === comment.username ? (
              <div className="myComment">
                <h3>{comment.username}</h3>
                <p>{comment.text}</p>
              </div>
            ) : (
              <div className="opponentComment">
                <h3>{comment.username}</h3>
                <p>{comment.text}</p>
              </div>
            )}
          </>
        ))}
      <textarea
        placeholder="Dodaj komentarz"
        onChange={onCommentChange}
      ></textarea>
      <Button type="button" onClick={handleAddComment}>
        Dodaj komentarz
      </Button>
    </div>
  );
}
