import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

function Dashboard () {
    const url = 'api'
    const navigate = useNavigate();

    const [diaryData, setDiaryData] = useState({
        gameTitle: ''
    })

    const [sectionData, setSectionData] = useState({
        sectionTitle: '',
        sectionContent: ''
    })

    const handleDiaryInput = (e) => {
        setDiaryData({
            ...diaryData,
            [e.target.name]: e.target.value
        })
    }

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
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo.token;
            console.log(token)
            // if (!userId) {
            //     console.error('User ID not found in localStorage');
            //     return;
            // }
            const diaryResponse = await fetch(`${url}/diary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(diaryData)
            })

            if (diaryResponse.ok) {
                const diaryResult = await diaryResponse.json()
                console.log('diaryResult', diaryResult)
                const diaryId = diaryResult.id;

                const sectionDataWithDiaryId = {
                    ...sectionData,
                    diaryId: diaryId
                };
                const sectionResponse = await fetch(`${url}/section`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sectionDataWithDiaryId) // Send section data with diaryId
                });
                if (sectionResponse.ok) {
                    const sectionResult = await sectionResponse.json()
                    console.log('sectionResult', sectionResult)
                    navigate(`/diary/${diaryId}`)
                }

            }
        } catch (error) {
            console.error("Diary and initial section failed to be created", error.message)
        }
    }

    return(
        <>
            <div><h1>Dashboard</h1></div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicGameTitle">
                    <Form.Label>Game Title</Form.Label>
                    <Form.Control name="gameTitle" type="gameTitle" placeholder="Enter game title" value={diaryData.gameTitle} onChange={handleDiaryInput}/>
                </Form.Group>
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