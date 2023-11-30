import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DiarySection from "./DiarySection";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Diary () {
    const url = 'api'
    const navigate = useNavigate();
    const { diaryId } = useParams();
    const [diary, setDiary] = useState(null);
    const [sections, setSections] = useState([]);

    const fetchSectionsForDiary = async () => {
        try {
            const diaryResponse = await fetch(`/api/diary/${diaryId}`);
            const diaryData = await diaryResponse.json();
            const sectionIds = diaryData.sections;
            setDiary(diaryData);
            const sectionPromises = sectionIds.map(async (sectionId) => {
                const sectionResponse = await fetch(`/api/section/${sectionId}`);
                return sectionResponse.json();
            });
            const sectionsData = await Promise.all(sectionPromises);
            setSections(sectionsData);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        }
    };

    useEffect(() => {
        fetchSectionsForDiary();
    }, [diaryId]);

    // useEffect(() => {
    //     console.log('Updated sections:', sections);
    // }, [sections]);


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
            const sectionDataWithDiaryId = {
                ...sectionData,
                diaryId: diaryId
            };
            const sectionResponse = await fetch(`http://localhost:3000/api/section`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sectionDataWithDiaryId) // Send section data with diaryId
            });
            console.log(sectionResponse)
            if (sectionResponse.ok) {
                const sectionResult = await sectionResponse.json()
                console.log('sectionResult', sectionResult)
                await fetchSectionsForDiary();
            }
        } catch (error) {
            console.error("Diary and initial section failed to be created", error.message)
        }
    }

    return(
        <>
            <div><h1 className="text-center">{diary ? diary.gameTitle : 'Loading diary...'}</h1></div>
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <Container>
                            <Row className="d-flex justify-content-center">
                                <Col md="auto" className="d-flex justify-content-center">
                                    <div>
                                        <h2 className="text-center">Add New Section</h2>
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
                            {sections.map((section) => (
                                <DiarySection key={section.id} sectionData={section} />
                            ))}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Diary;