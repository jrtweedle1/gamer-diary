import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import DiaryCard from "./DiaryCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    const [diaries, setDiaries] = useState([])

    const fetchDiaries = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const userId = userInfo.id;
            const result = await fetch(`/api/user/${userId}`)
            const user = await result.json();
            const diaryIdsFromUser = user.diaryIds
            if (diaryIdsFromUser != null) {
                const diaryPromises = diaryIdsFromUser.map(async (diaryId) => {
                    const diaryResponse = await fetch(`/api/diary/${diaryId}`);
                    return diaryResponse.json();
                });
                const diariesData = await Promise.all(diaryPromises);
                setDiaries(diariesData)
            }
        } catch (error) {
            console.error('Failed to fetch diaries:', error.message);
        }
    }

    useEffect(() => {
        fetchDiaries();
    }, []);
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
                    navigate(`/diary/${diaryId}`)
                }

            }
        } catch (error) {
            console.error("Diary and initial section failed to be created", error.message)
        }
    }

    return(
        <>
            <div><h1 className="text-center">Dashboard</h1></div>
            <Container fluid>
                <Row>
                <Col sm={4} className="d-flex justify-content-center">
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <div>
                                    <h2 className="text-center">Add New Diary</h2>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicGameTitle">
                                            <Form.Label >Game Title</Form.Label>
                                            <Form.Control name="gameTitle" type="gameTitle" placeholder="Enter game title" value={diaryData.gameTitle} onChange={handleDiaryInput}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicSectionTitle">
                                            <Form.Label>Section Title</Form.Label>
                                            <Form.Control name="sectionTitle" type="sectionTitle" placeholder="Enter section title" value={sectionData.sectionTitle} onChange={handleSectionInput}/>
                                            <Form.Text className="text-muted">
                                                Consider titling your first section "Current Progress".
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicSectionContent">
                                            <Form.Label>Section Content</Form.Label>
                                            <Form.Control name="sectionContent" type="sectionContent" placeholder="Enter section content" value={sectionData.sectionContent} onChange={handleSectionInput}/>
                                            <Form.Text className="text-muted">
                                                Consider writing a little bit about where you last left off in your game.
                                            </Form.Text>
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="primary" type="submit">
                                                New Diary
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col sm={8}>
                    <Container>
                        <div className="d-flex justify-content-center flex-column">
                            <h2 className="text-center">My Diaries</h2>
                            <Row>
                                {diaries.map((diary) => (
                                    <DiaryCard key={diary.id} diaryData={diary} />
                                ))}
                            </Row>
                        </div>
                    </Container>
                </Col>
                </Row>
            </Container>
        </>
    )

}

export default Dashboard;