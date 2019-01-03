import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dashboardPosts } from '../../actions/actionsDashboard';

import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        this.props.dashboardPosts();
    }

    render() {
        //const { user } = this.props.auth;

        return (
            <div className="app-dashboard">
                
            </div>
        )
    }
}

Dashboard.propTypes = {
    dashboardPosts: PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    dashboard: state.dashboard,
    auth: state.auth
});

export default connect(stateProps, { dashboardPosts })(Dashboard);
