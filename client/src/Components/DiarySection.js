import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DiarySection({ sectionData }) {
    return (
        <>
            <Row>
                <Col sm={3}>
                  <h2>{sectionData.sectionTitle}</h2>
                </Col>
                <Col sm={8}>
                    <p>{sectionData.sectionContent}</p>
                </Col>
            </Row>
        </>
    );
}

export default DiarySection;