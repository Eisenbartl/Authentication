import React from 'react';
import SignIn from './SignIn.jsx';
import Register from './Register.jsx';
import Axios from 'axios';

class Authentication extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginUsername: '',
            loginPassword: '',
            registerUsername: '',
            registerEmail: '',
            registerPassord: '',
            registerConfirmPassword: ''
        };
        // login functions
        this.username = this.username.bind(this);
        this.password = this.password.bind(this);
        this.login = this.login.bind(this);

        // registration functions
        this.registerNewUsername = this.registerNewUsername.bind(this);
        this.registerNewEmail = this.registerNewEmail.bind(this);
        this.registerNewPassword = this.registerNewPassword.bind(this);
        this.registerConfirmNewPassword = this.registerConfirmNewPassword.bind(this);
        this.register = this.register.bind(this);
    };

    // login events
    username(e) {
        this.setState({ loginUsername: e.target.value });
    }

    password(e) {
        this.setState({ loginPassword: e.target.value });
    }

    login() {
        Axios.post('/login', { username: this.state.loginUsername, password: this.state.loginPassword })
            .then(res => console.log(res.data))
            .then(() => this.setState({ loginUsername: '' }))
            .then(() => this.setState({ loginPassword: '' }))
            .catch(err => console.log('Error: ', err));
    }

    // registration events
    registerNewUsername(e) {
        this.setState({ registerUsername: e.target.value });
    }

    registerNewEmail(e) {
        this.setState({ registerEmail: e.target.value });
    }

    registerNewPassword(e) {
        this.setState({ registerPassord: e.target.value });
    }

    registerConfirmNewPassword(e) {
        this.setState({ registerConfirmPassword: e.target.value });
    }

    register() {
        let newUser = {
            username: this.state.registerUsername,
            email: this.state.registerEmail,
            password: this.state.registerPassord,
            password2: this.state.registerConfirmPassword
        };

        Axios.post('/register', {newUser})
            .then(res => console.log(res))
            .then(() => this.setState({ registerUsername: '' }))
            .then(() => this.setState({ registerEmail: '' }))
            .then(() => this.setState({ registerPassord: '' }))
            .then(() => this.setState({ loginUsername: '' }))
            .catch(err => console.log('Error ', err));
    }

    render() {
        return (
            <div className="login-signup" >
                {/* sign-in */}
                <SignIn 
                    username={this.username} 
                    password={this.password}
                    login={this.login}
                />
                {/* sign-up */}
                <Register 
                    registerNewUsername={this.registerNewUsername}
                    registerNewEmail={this.registerNewEmail}
                    registerNewPassword={this.registerNewPassword}
                    registerConfirmNewPassword={this.registerConfirmNewPassword}
                    register={this.register}
                />
                {/* homepage */}
            </div>
        )
    };
};

export default Authentication;