import { useQuery } from "react-query";
import { getOfferComments } from "../../apiFunctions/getOfferComments";
import { Comment } from "../../models/Comment";
import { useAuthContext } from "../../providers/AuthProvider";
import "./style.scss";

interface Props {
  offerId: string;
}

export function OfferComments({ offerId }: Props) {
  const { currentUser } = useAuthContext();
  const { data: comments } = useQuery(["comments", offerId], () =>
    getOfferComments(offerId)
  );
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
    </div>
  );
}
