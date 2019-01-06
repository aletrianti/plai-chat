import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../../actions/actionsPost';

import './Comment.css';

class Comment extends Component {
    onDelete(idPost, idComment) {
        this.props.deleteComment(idPost, idComment);
    }

    render() {
        const { comment, idPost, auth } = this.props;

        return (
            <div className="app-comment">
                <div className="comment-content">
                    <Link to={`/profile/${comment.user}`} className="comment-user"><span>{ comment.name }</span></Link>
                    { comment.user === auth.user.id ? 
                        (<button type="button" className="delete-btn" onClick={this.onDelete.bind(this, idPost, comment._id)}>Delete</button>)
                        : null
                    }
                </div>    
                <p className="comment-text">{ comment.text }</p>
            </div>
        )
    }
}

Comment.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    idPost: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    auth: state.auth
});

export default connect(stateProps, { deleteComment })(Comment);
