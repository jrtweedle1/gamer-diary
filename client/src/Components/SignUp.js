import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import React, {useState} from "react";

function SignUp() {

    const [signUpData, setSignUpData] = useState({
        username: '',
        password: '',
        email: ''
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
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData)
            })

            if (response.ok) {
                const result = await response.json();
                console.log(result)
            }
        } catch {
            console.error("User failed to be created.")
        }
    }

    return (
        <div>
            <h1>QuestLog</h1>
            <h2>A progress diary for gamers everywhere</h2>
            <h3>Sign up now!</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="username" placeholder="Enter username" value={signUpData.username} onChange={handleInput}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={signUpData.password} onChange={handleInput}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={signUpData.email} onChange={handleInput}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SignUp;
