import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike } from '../../../actions/actionsPost';

import './Post.css';

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
                    <div className="user-info">
                        <Link to={`/profile/${post.user}`} className="post-username">{ post.name }</Link>
                        <span className="post-date">{ post.date }</span>
                    </div>
                    
                    <div className="edit-delete-btns">
                        { post.user === auth.user.id ? 
                            (<Link to="/edit-post" className="post-edit-btn edit-btn">Edit</Link>)
                            : null
                        }
                        { post.user === auth.user.id ? 
                            (<button type="button" className="post-delete-btn delete-btn" onClick={this.onDelete.bind(this, post._id)}>Delete</button>)
                            : null
                        }
                    </div>
                </div>
                <div className="post-content">
                    <Link to={`/post/${post._id}`} className="post-title"><h3>{ post.title }</h3></Link>
                    <p className="post-text">{ post.text }</p>
                    <img src={require("../../../assets/images/keyboard-rainbow.jpg")} alt="post placeholder" />
                </div>
                { showBtns ? (<span>
                    <div className="post-btns-bar">
                        <button type="button" onClick={this.onLike.bind(this, post._id)} className="post-btns">
                            <img src={require("../../../assets/icons/heart-regular.svg")} alt="" className={ classnames('bar-icon', {'liked-post': this.likedPost(post.likes)}) }/>
                            <span className="number">{post.likes.length}</span>
                        </button>
                        <button type="button" className="post-btns">
                            <img src={require("../../../assets/icons/comment-regular.svg")} alt="" className="bar-icon"/>
                            <span className="number">{post.comments.length}</span>
                        </button>
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
