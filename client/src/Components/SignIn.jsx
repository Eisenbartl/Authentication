import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="sign-in-form">
                <div className="sign-in-container">
                    <h2>sign in</h2>
                    <input 
                        type="text"
                        className="username-sign-in"
                        placeholder="username"
                        onChange={e => {this.props.username(e)}}
                    />
                    <input
                        type="password"
                        className="password-sign-in"
                        placeholder="password"
                        onChange={e => {this.props.password(e)}}
                    />
                    <button className="sign-in-btn"
                        onClick={() => {this.props.login()}}
                    >sign in</button>
                </div>
            </div>
        )
    };
};

export default SignIn;