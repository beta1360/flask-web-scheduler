import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import GroupTableContainer from './group/GroupTable';
import MyGroupLabelContainer from './group/MyGroupLabel';
import SearchGroupLabelContainer from './group/SearchGroupLabel';
import CreateGroupBtnContainer from './group/CreateGroupBtn';

class GroupHome extends Component {

    constructor(props, context){
        super(props, context);
    
    }

    render = () => {
        const { userId, userName, groupNum, groupName } = this.props;

        return (
            <div>
                <hr/>
                    <MyGroupLabelContainer 
                        userId={userId} userName={userName} 
                        groupNum={groupNum} groupName={groupName}/>
                <hr/>
                    <SearchGroupLabelContainer 
                        userId={userId} userName={userName} 
                        groupNum={groupNum} groupName={groupName}/>
                <hr/>
                <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h3> <b>그룹 리스트 </b> </h3> 
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <GroupTableContainer 
                            userId={userId} userName={userName} groupNum={groupNum}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
                
                <hr/>
                <CreateGroupBtnContainer userId={userId} userName={userName} groupNum={groupNum}/>
            </div>
        );
    }
}

export default GroupHome;