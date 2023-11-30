import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function DiaryCard( {diaryData} ) {
    return (
        <Col className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://i.pinimg.com/originals/4c/33/42/4c334214f0a9ea49c2468a23ff5596c0.jpg" />
                <Card.Body>
                    <Card.Title className="text-center">{diaryData.gameTitle}</Card.Title>
                    <Card.Text className="text-center">
                        Click to learn more!
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                        <a href={`/diary/${diaryData.id}`}> <Button variant="primary">Open Diary</Button></a>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default DiaryCard;