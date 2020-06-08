import React from 'react';
import { Container, Card, Form, Button, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import api, { ApiResponse, saveToken,saveRefreshToken } from '../../api/api'; 
import { Redirect } from 'react-router-dom';


interface AdminLoginPageState {
    
    email: string;
    password: string;
    message: string;
    isLoggedIn: boolean;
    
}

export default class AdminLoginPage extends React.Component{
    state: AdminLoginPageState;
    setLoggedInState: any;

    constructor(props: Readonly<{}>){
        super(props);
    
        this.state={
            email:'',
            password: '',
            message:'',
            isLoggedIn: false,
        }
}


private handleFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let stateFieldName = '';

    if (event.target.id === 'email') {
        stateFieldName = 'email';
    } else if (event.target.id === 'password') {
        stateFieldName = 'password';
    }

    if (stateFieldName === '') {
        return;
    }

    const newState = Object.assign(this.state, {
        [ stateFieldName ]: event.target.value,
    });

    this.setState(newState);
}

/* 
private formInputChange(event: React.ChangeEvent<HTMLInputElement>){
    const newState= Object.assign(this.state, {
        [event.target.id]: event.target.value,
    });
    this.setState(newState);
} */

private setMessage(message: string){
    const newState = Object.assign(this.state, {
        errorMessage: message,
    });
    this.setState(newState);

}

private setLogginState(isLoggedIn: boolean){
    const newState = Object.assign(this.state, {
        isLoggedIn: isLoggedIn,
    });
    this.setState(newState);

}
private doLogin() {
    
    api('/auth/login', 'post', {
        email: this.state.email,
        password: this.state.password,
    })
    .then((res: ApiResponse) => {
        if (res.status === 'error') {
            this.setMessage('There was an error. Please try again!');
            return;
        }

        if (res.data.statusCode !== undefined) {
            switch (res.data.statusCode) {
                case -3001: this.setMessage('This user does not exist!'); break;
                case -3002: this.setMessage('Bad password!'); break;
            }
            return;
        }

        saveToken(res.data.token);
            saveRefreshToken(res.data.refreshToken);

            this.setLoggedInState(true);
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }
         return (
            <Container>
                <Col md={ { span: 6, offset: 3 } }>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={ faSignInAlt } /> User Login
                            </Card.Title>

                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="email">E-mail:</Form.Label>
                                    <Form.Control type="email" id="email"
                                                  value={ this.state.email }
                                                  onChange={ (event) => this.handleFormInputChange(event as any) } />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Password:</Form.Label>
                                    <Form.Control type="password" id="password"
                                                  value={ this.state.password }
                                                  onChange={ (event) => this.handleFormInputChange(event as any) } />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" block
                                            onClick={ () => this.doLogin() }>
                                        <FontAwesomeIcon icon={ faSignInAlt } /> Log in
                                    </Button>
                                </Form.Group>
                            </Form>

                            <Alert variant="danger"
                                   className={ this.state.message ? '' : 'd-none' }>
                                { this.state.message }
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}