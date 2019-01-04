import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../../actions/actionsPost';

class Comment extends Component {
    onDelete(idPost, idComment) {
        this.props.deleteComment(idPost, idComment);
    }

    render() {
        const { comment, idPost, auth } = this.props;

        return (
            <div className="app-comment">
                <Link to={`/profile/${auth.user.id}`} className="comment-user">{ auth.user.name }</Link>
                <p className="comment-text">{ comment.text }</p>
                { comment.user === auth.user.id ? 
                    (<button type="button" className="comment-delete-btn" onClick={this.onDelete.bind(this, idPost, comment._id)}>Delete</button>)
                    : null
                }
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
