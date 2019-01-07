import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/actionsPost';

import './NewComment.css';

class NewComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
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

        const { idPost } = this.props;

        const data = {
            text: this.state.text
        }
        this.props.addComment(idPost, data);
        this.setState({ text: '' });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="app-create-comment">
                <form className="create-comment-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea type="text" className={classnames('form-group-input', {'invalid': errors.text})} name="text" placeholder="Write a comment..." value={this.state.text} onChange={this.onChange}></textarea>
                        {errors.text && (<div className="form-error">{errors.text}</div>)}
                    </div>

                    <input className="form-button" type="submit" value="Comment"/>
                </form>
            </div>
        )
    }
}

NewComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    idPost: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const stateProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(stateProps, { addComment })(NewComment);
