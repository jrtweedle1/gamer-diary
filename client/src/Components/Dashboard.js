import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import DiaryCard from "./DiaryCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'

function Dashboard () {
    const url = 'api'
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [diaryToDelete, setDiaryToDelete] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (diaryId) => {
        setDiaryToDelete(diaryId);
        setShow(true);
    }
    const [diaryData, setDiaryData] = useState({
        gameTitle: ''
    })
    const [sectionData, setSectionData] = useState({
        sectionTitle: '',
        sectionContent: ''
    })
    const [diaries, setDiaries] = useState([])

    const deleteDiary = async (diaryId) => {
        try {
            const response = await fetch(`${url}/diary/${diaryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log("Deleting diary with ID:", diaryId);
                setDiaries(diaries.filter(diary => {
                    return diary.id !== diaryId
                }))
                await fetchDiaries()
                setDiaryToDelete(null);
                handleClose();
            } else {
                console.error('Failed to delete diary:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete diaries:', error.message);
        }
    }

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
        console.log(diaries)
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
            <div><h1 className="text-center heading">Dashboard</h1></div>
            <Container fluid>
                <Row>
                <Col sm={4} className="d-flex justify-content-center">
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <div id="signup-background">
                                    <h2 className="text-center russo">ADD NEW DIARY</h2>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicGameTitle">
                                            <Form.Label className="white russo">Game Title</Form.Label>
                                            <Form.Control name="gameTitle" type="gameTitle" placeholder="Enter game title" value={diaryData.gameTitle} onChange={handleDiaryInput}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicSectionTitle">
                                            <Form.Label className="white russo">Initial Section Title</Form.Label>
                                            <Form.Control name="sectionTitle" type="sectionTitle" placeholder="Enter section title" value={sectionData.sectionTitle} onChange={handleSectionInput}/>
                                            <Form.Text className="text-muted white">
                                                Consider titling your first section "Current Progress".
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicSectionContent">
                                            <Form.Label className="white russo">Initial Section Content</Form.Label>
                                            <Form.Control as="textarea" name="sectionContent" type="sectionContent" placeholder="Enter section content" value={sectionData.sectionContent} onChange={handleSectionInput} className="text-height"/>
                                            <Form.Text className="text-muted white">
                                                Consider writing a little bit about where you last left off in your game.
                                            </Form.Text>
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="outline-light" type="submit">
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
                        <Row>
                            <Col id="signup-background">
                                <h2 className="text-center">MY DIARIES</h2>
                                <div className="d-flex">
                                    {diaries.map((diary) => (
                                        <DiaryCard
                                            key={diary.id}
                                            diaryData={diary}
                                            deleteDiary={deleteDiary}
                                            handleShow={() => handleShow(diary.id)}
                                        />
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this diary?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action cannot be undone. Please press the "Confirm Delete" button if you would like to continue with deletion. </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteDiary(diaryToDelete)}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default Dashboard;