import React, { Component } from 'react';
import { Nav, Tab, Col, Row } from 'react-bootstrap';
import MyInfoPage from './user/MyInfoPage';
import MinInfoPage from './user/MinInfoPage';
import DeleteInfoPage from './user/DeleteInfoPage';
import ModifyInfoPage from './user/ModifyInfoPage';

class UserHome extends Component {

    constructor(props, context){
        super(props, context);

    }

    render = () => {
        const { userId } = this.props;

        return (
            <div>
                <hr />

                <Tab.Container id="left-tabs-example" defaultActiveKey="min">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" defaultActiveKey="#min" 
                                className="flex-column">
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="min" 
                                        href="#min">개요</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="me" 
                                        href="#myinfo">상세정보</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="modifyInfo" 
                                        href="#modifyInfo">내 정보수정</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link 
                                        eventKey="deleteInfo" 
                                        href="#deleteInfo">회원탈퇴</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="min">
                                    <MinInfoPage userId={userId} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="me">
                                    <MyInfoPage userId={userId} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="modifyInfo">
                                    <ModifyInfoPage userId={userId} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="deleteInfo">
                                    <DeleteInfoPage userId={userId} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}

export default UserHome;