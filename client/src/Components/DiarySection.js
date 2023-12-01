import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

function DiarySection({ sectionData, handleShow, deleteSection, handleSectionDelete }) {
    return (
        <>
            <Row id="signup-background" className="sections">
                <Col sm={3}>
                    <h2>{sectionData.sectionTitle}</h2>
                    <div className="d-flex flex-column">
                        <div className="d-flex">
                            {/*<Button variant="outline-light" size="sm" className="small-button">Edit Section</Button>*/}
                            {/*<p></p>*/}
                            <Button variant="outline-light" size="sm" className="small-button" onClick={handleShow}>Delete Section</Button>
                        </div>
                    </div>
                </Col>
                <Col sm={8}>
                    <p>{sectionData.sectionContent}</p>
                </Col>
            </Row>
        </>
    );
}

export default DiarySection;