import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/actionsPost';
import Posts from '../sub-components/Post/Posts';
import { Link } from 'react-router-dom';

import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const { posts } = this.props.post;
        let postContent;

        if (posts === null) {
            postContent = 'No posts yet...'
        } else {
            postContent = <Posts posts={posts}/>
        }

        return (
            <div className="app-dashboard">
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

                <div className="dashboard-content">
                    { postContent }
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    post: state.post,
    errors: state.errors
});

export default connect(stateProps, { getPosts })(Dashboard);
