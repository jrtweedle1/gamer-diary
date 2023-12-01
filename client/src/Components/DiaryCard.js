import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function DiaryCard( {diaryData, deleteDiary, handleShow} ) {
    return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://media.accobrands.com/media/560-560/451449.jpg" />
                <Card.Body>
                    <Card.Title className="text-center">{diaryData.gameTitle}</Card.Title>
                    <div className="d-flex justify-content-around">
                        <a href={`/diary/${diaryData.id}`}>
                            <Button variant="primary">Open Diary</Button></a>
                            <Button
                                onClick={handleShow}
                                variant="danger"
                               >Delete Diary</Button>
                    </div>
                </Card.Body>
            </Card>
    );
}

export default DiaryCard;