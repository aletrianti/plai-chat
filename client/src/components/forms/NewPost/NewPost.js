import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/actionsPost';

import './NewPost.css';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            category: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // If there are errors, return them
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
            title: this.state.title,
            text: this.state.text,
            category: this.state.category
        }
        this.props.addPost(data, this.props.history);
    }

    render() {
        const { errors } = this.state;

        const options = [
            { label: '* Select a category', value: 0 },
            { label: 'Action', value: 'Action' },
            { label: 'Adventure', value: 'Adventure' },
            { label: 'Casual', value: 'Casual' },
            { label: 'Indie', value: 'Indie' },
            { label: 'MMO', value: 'MMO' },
            { label: 'Racing', value: 'Racing' },
            { label: 'RPG', value: 'RPG' },
            { label: 'Simulation', value: 'Simulation' },
            { label: 'Sports', value: 'Sports' },
            { label: 'Strategy', value: 'Strategy' },
            { label: 'Other', value: 'Other' },
        ];

        const selectOptions = options.map(option => (
            <option key={option.label} value={option.value}>
                {option.label}
            </option>
        ));

        return (
            <div className="app-create-post">
                <div className="form-text">
                    <h1>Create a new post</h1>
                </div>

                <form className="create-post-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" className={classnames('form-group-input', {'invalid': errors.title})} name="title" placeholder="Write a title..." value={this.state.title} onChange={this.onChange}/>
                        {errors.title && (<div className="form-error">{errors.title}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea type="text" className={classnames('form-group-input', {'invalid': errors.text})} name="text" placeholder="Write a post..." value={this.state.text} onChange={this.onChange}></textarea>
                        {errors.text && (<div className="form-error">{errors.text}</div>)}
                    </div>
                    <div className="form-group-category">
                        <select className={classnames('form-group-select', {'invalid': errors.category})} name="category" value={this.state.category} onChange={this.onChange}>
                            {selectOptions}
                        </select>
                        {errors.category && (<div className="form-error">{errors.category}</div>)}
                    </div>

                    <input className="form-button" type="submit" value="Create post"/>
                </form>
            </div>
        )
    }
}

NewPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    post: state.post,
    errors: state.errors
});

export default connect(stateProps, { addPost })(NewPost);
