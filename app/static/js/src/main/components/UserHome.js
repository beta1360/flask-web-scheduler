import React, { Component } from 'react';
import { Nav, Tab, Col, Row } from 'react-bootstrap';
import MyInfoPage from './user/MyInfoPage';
import MinInfoPage from './user/MinInfoPage';
import DeleteInfoPage from './user/DeleteInfoPage';

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
                            <Nav variant="pills" defaultActiveKey="#min" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="min" href="#min">개요</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="me" href="#myinfo">상세정보</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="todo" href="#mytodo">Todo관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="group" href="#mygroup">그룹관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="modifyInfo" href="#modifyInfo">내 정보수정</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="deleteInfo" href="#deleteInfo">회원탈퇴</Nav.Link>
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
                                <Tab.Pane eventKey="todo">
                                    칭구들
                                </Tab.Pane>
                                <Tab.Pane eventKey="group">
                                    칭구
                                </Tab.Pane>
                                <Tab.Pane eventKey="modifyInfo">
                                    칭구들
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