import React from "react";
import {Field, reduxForm} from "redux-form";

class CommentForm extends React.Component {

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    renderInput = ({input, meta}) => {
        return (
            <div className = {`field ${meta.error && meta.touched ? 'error' : ''}`}>
                <textarea {...input} style={{marginTop: "0px", marginBottom: "0px", height: "112px"}}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit =(formValues) => {
        this.props.reset();
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <div>
                <form className="ui reply form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="comment"  component={this.renderInput} />
                    <button className="ui blue labeled submit icon button">
                        <i className="icon edit"/>{this.props.buttonText}</button>
                </form>
            </div>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.comment) {
        errors.comment ='You must enter a comment to submit'
    }
    return errors;
};

export default reduxForm({
    form: 'commentForm',
    validate: validate
})(CommentForm);
