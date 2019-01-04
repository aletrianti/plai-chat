import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike } from '../../../actions/actionsPost';

class Post extends Component {
    onDelete(id) {
        this.props.deletePost(id);
    }

    onLike(id) {
        this.props.addLike(id);
    }

    likedPost(likes) {
        const { auth } = this.props;

        // Check if user has already liked a post or not
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, auth, showBtns } = this.props;

        return (
            <div className="app-post">
                <div className="post-user-info">
                    <Link to={`/profile/${auth.user.id}`} className="post-username">{ auth.user.name }</Link>
                    <span className="post-date">{ post.date }</span>
                </div>
                <div className="post-content">
                    <Link to={`/post/${post._id}`} className="post-username">{ post.title }</Link>
                    <p className="post-date">{ post.text }</p>
                </div>
                { showBtns ? (<span>
                    <div className="post-btns-bar">
                        <button type="button" onClick={this.onLike.bind(this, post._id)} className="post-btns">
                            <i className={ classnames('like-icon', {'liked-post': this.likedPost(post.likes)}) }></i>
                            <span className="number">{post.likes.length}</span>
                        </button>
                        <button type="button" className="post-btns">
                            <i className="comment-icon"></i>
                            <span className="number">{post.comments.length}</span>
                        </button>
                        { post.user === auth.user.id ? 
                            (<Link to="/edit-post" className="post-edit-btn">Edit</Link>)
                            : null
                        }
                        { post.user === auth.user.id ? 
                            (<button type="button" className="post-delete-btn" onClick={this.onDelete.bind(this, post._id)}>Delete</button>)
                            : null
                        }
                    </div>
                </span>) : null }
            </div>
        )
    }
}

Post.defaultProps = {
    showBtns: true
}

Post.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    auth: state.auth
});

export default connect(stateProps, { deletePost, addLike })(Post);
