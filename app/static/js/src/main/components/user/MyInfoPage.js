import React, { Component } from 'react';
import { Spinner, Badge } from 'react-bootstrap';
import { Map } from 'immutable';
import axios from 'axios';

import ProgressProgressBar from './MyInfo/ProgressProgressBar';
import PrivacyProgressBar from './MyInfo/PrivacyProgressBar';
import LevelProgressBar from './MyInfo/LevelProgressBar';

class MyInfoPage extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            visible: false,
            data: Map({
                user: Map({
                    userId: '',
                    userName: '',
                    userRank: '',
                })
                , todo: Map({
                    num: Map({
                        progress: Map({
                            todo: 0,
                            doing: 0,
                            done: 0
                        }),
                        privacy: Map({
                            public: 0,
                            private: 0
                        }),
                        level: Map({
                            one: 0,
                            two: 0,
                            three: 0,
                            four: 0,
                            five: 0,
                        })
                    })
                })
                , group: Map({
                    groupNum: 0,
                    groupName: '',
                    groupCode: '',
                    groupPrivacy: ''
                })
            })
        }
    }

    showPage = () => {
        this.setState({visible: true});
    }

    loadingPage = () => {
        this.setState({visible: false});
    }

    requestDetailInfo = () => {
        return axios.get('http://localhost:13609/info/detail');
    }

    getGroupBadge = (groupPrivacy) => (groupPrivacy == "public"?
        <Badge variant="primary">public</Badge>
        :<Badge variant="secondary">private</Badge>
    )

    getGroupInfo = () => {
        const { data } = this.state;
        const groupNum = data.getIn(['group', 'groupNum']);
        const groupName = data.getIn(['group', 'groupName']);
        const groupCode = data.getIn(['group', 'groupCode']);
        const groupPrivacy = data.getIn(['group', 'groupPrivacy']);

        if(groupNum == 1)
            return "소속 그룹 없음.";

        else {
            return (
                <div>
                    {this.getGroupBadge(groupPrivacy)} {groupName} (#{groupNum})
                    <br />(<b>그룹코드:</b> {groupCode})  
                </div>
            );
        }
    }

    getDetailInfo = async () => {
        this.loadingPage();

        const response = await this.requestDetailInfo();
        const { user, todo, group } = response.data;
        const { user_id, user_name, user_rank } = user;
        const { progress, privacy, level } = todo.num;
        const { to_do, doing, done } = progress;
        const { _public, _private } = privacy;
        const { one, two, three, four, five } = level;
        const { group_num, group_name, group_code, group_privacy } = group;

        const { data } = this.state;
        this.setState({
            data: data.setIn(['user'], {
                    userId: user_id,
                    userName: user_name,
                    userRank: user_rank
                }).setIn(['todo', 'num', 'progress'], {
                    todo: to_do,
                    doing: doing,
                    done: done
                }).setIn(['todo', 'num', 'privacy'], {
                    public: _public,
                    private: _private
                }).setIn(['todo', 'num', 'level'], {
                    one: one,
                    two: two,
                    three: three,
                    four: four,
                    five: five
                }).setIn(['group'], {
                    groupNum: group_num,
                    groupName: group_name,
                    groupCode: group_code,
                    groupPrivacy: group_privacy
                })
        })

        this.showPage();
    }

    drawDetailInfoPage = () => {
        const { data } = this.state;
        const userName = data.getIn(['user', 'userName']);
        const userId = data.getIn(['user', 'userId']);
        const userRank = data.getIn(['user', 'userRank']);

        const progressTodo = data.getIn(['todo', 'num', 'progress', 'todo']);
        const progressDoing = data.getIn(['todo', 'num', 'progress', 'doing']);
        const progressDone = data.getIn(['todo', 'num', 'progress', 'done']);

        const publicTodo = data.getIn(['todo', 'num', 'privacy', 'public']);
        const privateTodo = data.getIn(['todo', 'num', 'privacy', 'private']);

        const levelOne = data.getIn(['todo', 'num', 'level', 'one']);
        const levelTwo = data.getIn(['todo', 'num', 'level', 'two']);
        const levelThree = data.getIn(['todo', 'num', 'level', 'three']);
        const levelFour = data.getIn(['todo', 'num', 'level', 'four']);
        const levelFive = data.getIn(['todo', 'num', 'level', 'five']);

        return (
            <div>
                <h3><b>유저 기본 정보</b></h3>
                <hr />

                <h4><b>유저명 (ID)</b></h4>
                <hr />
                {userName} ({userId})
                <br /><br />

                <h4><b>소속 그룹</b></h4>
                <hr />
                {this.getGroupInfo()}
                <br /><br />

                <h4><b>직책</b></h4>
                <hr />
                {userRank}
                <br /><br />

                <h3><b>Todo 리스트 개요</b></h3>
                <hr />
              
                <h4><b>진행 상황</b></h4>
                <hr/>
                <b>- 할 것(TODO): </b>{progressTodo}개<br />
                   <b>- 진행중(DOING): </b>{progressDoing}개<br />
                   <b>- 완료(DONE): </b>{progressDone}개
                   <br /><br />
                <div>
                <ProgressProgressBar 
                    progressTodo={progressTodo}
                    progressDoing={progressDoing}
                    progressDone={progressDone}/>
                </div>
                <br /><br />

                <h4><b>공개 여부</b></h4>
                <hr />
                   <b>- 공개 (public):    </b>{publicTodo}개<br />
                   <b>- 비공개 (private): </b>{privateTodo}개
                   <br /><br />
                <div>
                <PrivacyProgressBar 
                    publicTodo={publicTodo}
                    privateTodo={privateTodo}/>
                </div>
                <br /><br />

                <h4><b>우선 순위</b></h4>
                <hr />
                <b>- (1)순위: </b>{levelOne}개<br />
                <b>- (2)순위: </b>{levelTwo}개<br />
                <b>- (3)순위: </b>{levelThree}개<br />
                <b>- (4)순위: </b>{levelFour}개<br />
                <b>- (5)순위: </b>{levelFive}개
                <br/><br/>
                <LevelProgressBar 
                    levelOne={levelOne}
                    levelTwo={levelTwo}
                    levelThree={levelThree}
                    levelFour={levelFour}
                    levelFive={levelFive}/>
                <br/><br/>
            </div>
        );
    }

    componentDidMount = () => {
        this.getDetailInfo();
    }

    render = () => {
        const { visible } = this.state;

        if(visible) 
            return this.drawDetailInfoPage();
        else
            return <Spinner animation="border" />;
    }
}

export default MyInfoPage;
