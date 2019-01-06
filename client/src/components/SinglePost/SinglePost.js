import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/actionsPost';
import Post from '../sub-components/Post/Post';
import NewComment from '../forms/NewComment/NewComment';
import Comments from '../sub-components/Comment/Comments';

import './SinglePost.css';

class SinglePost extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        const { post } = this.props.post;
        let postContent;

        if (post === null || Object.keys(post).length === 0) {
            postContent = 'Loading...';
        } else {
            postContent = (
                <div>
                    <Post post={post} showBtns={false} />
                    <Comments idPost={post._id} comments={post.comments} />
                    <NewComment idPost={post._id} />
                </div>
            );
        }

        return (
            <div className="app-single-post">
                { postContent }
            </div>
        )
    }
}

SinglePost.propTypes = {
    getPost: PropTypes.func.isRequired
}

const stateProps = (state) => ({
    post: state.post
});

export default connect(stateProps, { getPost })(SinglePost);
