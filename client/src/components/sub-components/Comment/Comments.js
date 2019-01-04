import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends Component {
    render() {
        const { comments, idPost } = this.props;

        return comments.map(comment => <Comment key={comment._id} comment={comment} idPost={idPost}/>);
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    idPost: PropTypes.string.isRequired
}

export default Comments;

