import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SignUp(props) {
    const url = 'api'
    const navigate = useNavigate();
    let token;

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: '',
        email: '',
        token: ''
    })

    const handleInput = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        //prevents page from refreshing
        e.preventDefault();
        try {
            const response = await fetch(`${url}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(signUpData)
            })
            console.log(response)
            if (response.ok) {
                const result = await response.json();
                const newId = result.userId;
                const userInfoNoId = result.infoUser;
                userInfoNoId.id = newId;
                localStorage.setItem('userInfo', JSON.stringify(userInfoNoId))
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("User failed to be created", error.message)
        }
    }

    return (
        <div id="signUp-div">
            <h1 className="text-center">QuestLog</h1>
            <h2 className="text-center" id="tagline">A progress diary for gamers everywhere</h2>
            <Container id="form-container">
                <Row className="d-flex justify-content-md-center" id="form-row">
                    <Col sm={6}>
                        <div className="align-items-center" id="signup-background">
                            <h3 className="text-center">Sign up now!</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label className="white">Username</Form.Label>
                                    <Form.Control name="username" type="username" placeholder="Enter username" value={signUpData.username} onChange={handleInput}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="white">Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" value={signUpData.password} onChange={handleInput}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label className="white">Email address</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Enter email" value={signUpData.email} onChange={handleInput}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <div className="d-flex justify-content-md-center">
                                    <Button variant="primary" type="submit">
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp;
