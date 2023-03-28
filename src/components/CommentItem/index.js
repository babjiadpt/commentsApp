// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commenterInfo, onDeleteComment, isToggleLike} = props
  const {id, name, comment, date, isLiked, initialClassNames} = commenterInfo
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)

  const deleteComment = () => {
    onDeleteComment(id)
  }

  const onClickLikeButton = () => {
    isToggleLike(id)
  }

  return (
    <li>
      <div className="commenter-container">
        <div className={initialClassNames}>
          <p className="initial">{initial}</p>
        </div>
        <div className="name-date-container">
          <p className="name">{name}</p>
          <p className="time">{postedTime}</p>
        </div>
      </div>
      <p className="comment">{comment}</p>

      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLikeButton}
          >
            Like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={deleteComment}
          data-testid="delete"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
