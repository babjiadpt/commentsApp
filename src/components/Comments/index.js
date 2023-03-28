import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commenterDetailsList: []}

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  isToggleLike = id => {
    this.setState(prevState => ({
      commenterDetailsList: prevState.commenterDetailsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    const backGroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const addCommentDetails = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassNames: backGroundClassNames,
    }

    this.setState(prevState => ({
      commenterDetailsList: [
        ...prevState.commenterDetailsList,
        addCommentDetails,
      ],
      nameInput: '',
      commentInput: '',
    }))
  }

  onDeleteComment = id => {
    const {commenterDetailsList} = this.state

    const filteredComments = commenterDetailsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commenterDetailsList: filteredComments})
  }

  render() {
    const {commenterDetailsList, nameInput, commentInput} = this.state
    const count = commenterDetailsList.length

    return (
      <div className="app-container">
        <div className="comments-app-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="form-description">
                say something about 4.0 technologies
              </p>
              <input
                type="text"
                className="input-text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                rows="5"
                placeholder="Your Comment"
                className="comment-text"
                value={commentInput}
                onChange={this.onChangeCommentInput}
              />
              <div>
                <button type="submit" className="comment-button">
                  Add Comment
                </button>
              </div>
            </form>
          </div>

          <hr className="line" />
          <div className="count-container">
            <button type="button" className="count-button comment-button">
              {count}
            </button>
            <p className="count-comment">Comments</p>
          </div>
          <ul className="comment-details-container">
            {commenterDetailsList.map(eachCommenterDetails => (
              <CommentItem
                commenterInfo={eachCommenterDetails}
                key={eachCommenterDetails.id}
                onDeleteComment={this.onDeleteComment}
                isToggleLike={this.isToggleLike}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
