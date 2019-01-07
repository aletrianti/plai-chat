import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/actionsPost';
import Post from '../sub-components/Post/Post';
import NewComment from '../forms/NewComment/NewComment';
import Comments from '../sub-components/Comment/Comments';
import { Link } from 'react-router-dom';

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
                <div class="single-post-page">
                    <aside className="dashboard-aside">
                        <Link to="/new-post" className="dashboard-btn new-post-button">Create a new post</Link>
                        
                        <div className="category">
                            <img src="" alt="" />
                            <span className="dashboard-btn category-button">All</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/colt-m1911.png")} alt=""/>
                            <span className="dashboard-btn category-button">Action</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/warp-pipe.png")} alt=""/>
                            <span className="dashboard-btn category-button">Adventure</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/poker-hand.png")} alt=""/>
                            <span className="dashboard-btn category-button">Casual</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/person.png")} alt=""/>
                            <span className="dashboard-btn category-button">Indie</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/multiple-targets.png")} alt=""/>
                            <span className="dashboard-btn category-button">MMO</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/f1-car.png")} alt=""/>
                            <span className="dashboard-btn category-button">Racing</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/dragon-head.png")} alt=""/>
                            <span className="dashboard-btn category-button">RPG</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/control-tower.png")} alt=""/>
                            <span className="dashboard-btn category-button">Simulation</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/champions.png")} alt=""/>
                            <span className="dashboard-btn category-button">Sports</span>
                        </div>
                        <div className="category">
                            <img src={require("../../assets/images/barracks-tent.png")} alt=""/>
                            <span className="dashboard-btn category-button">Strategy</span>
                        </div>
                        <div className="category">
                            <img src="" alt=""/>
                            <span className="dashboard-btn category-button">Other</span>
                        </div>
                    </aside>


                    <div className="single-post-and-comments">
                        <Post post={post} showBtns={false} />
                        <NewComment idPost={post._id} />
                        <Comments idPost={post._id} comments={post.comments} />
                    </div>
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
