import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function Diary () {
    const url = 'api'
    const navigate = useNavigate();

    const [sectionData, setSectionData] = useState({
        sectionTitle: '',
        sectionContent: ''
    })

    const handleSectionInput = (e) => {
        setSectionData({
            ...sectionData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        //prevents page from refreshing
        e.preventDefault();
        try {
            const sectionResponse = await fetch(`${url}/section`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sectionData)
            })
            if (sectionResponse.ok) {
                const sectionResult = await sectionResponse.json()
                console.log('sectionResult', sectionResult)
                const diaryId = diaryResult.id;
                //INSERT REFRESH HERE
            }
        } catch (error) {
            console.error("Diary and initial section failed to be created", error.message)
        }
    }

    return(
        <>
            <div><h1>INSERT DIARY NAME HERE</h1></div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicSectionTitle">
                    <Form.Label>Section Title</Form.Label>
                    <Form.Control name="sectionTitle" type="sectionTitle" placeholder="Enter section title" value={sectionData.sectionTitle} onChange={handleSectionInput}/>
                </Form.Group>
                <Form.Text className="text-muted">
                    Consider titling your first section "Current Progress".
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicSectionContent">
                    <Form.Label>Section Content</Form.Label>
                    <Form.Control name="sectionContent" type="sectionContent" placeholder="Enter section content" value={sectionData.sectionContent} onChange={handleSectionInput}/>
                    <Form.Text className="text-muted">
                        Consider writing a little bit about where you last left off in your game.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    New Diary
                </Button>
            </Form>
        </>
    )

}

export default Dashboard;