import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="new-user-form">
                <div className="new-user-container">
                    <h2>create account</h2>
                    <input
                        type="text"
                        className="create-username"
                        placeholder="username"
                        onChange={e => {this.props.registerNewUsername(e)}}
                    />
                    <input
                        type="text"
                        className="new-user-email"
                        placeholder="email"
                        onChange={e => {this.props.registerNewEmail(e)}}
                    />
                    <input
                        type="password"
                        className="create-password"
                        placeholder="password"
                        onChange={e => {this.props.registerNewPassword(e)}}
                    />
                    <input
                        type="password"
                        className="create-password-check"
                        placeholder="confirm password"
                        onChange={e => {this.props.registerConfirmNewPassword(e)}}
                    />
                    <button 
                        className="register-new-user-btn"
                        onClick={() => {this.props.register()}}
                    >submit</button>
                </div>
            </div>
        );
    };
};

export default Register;