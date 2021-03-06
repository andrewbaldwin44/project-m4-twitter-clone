import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from "styled-components";
import GlobalStyles from './GlobalStyles';

import Sidebar from './Sidebar';
import Headbar from "./Headbar";
import HomeFeed from './HomePage/HomeFeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import TweetDetails from './TweetDetails';
import Profile from './Profile/index';
import UserFeed from "./User/UserFeed";
import UserMedia from "./User/UserMedia";
import UserLikes from "./User/UserLikes";

import Spinner from './Spinner';
import Error from "./Error";

import { CurrentUserContext } from './CurrentUserContext';
import { COLORS, PAGE_DIMENSIONS } from "../constants";

const { borderColor } = COLORS;
const { mainWidth } = PAGE_DIMENSIONS;

function App() {
  const { status } = useContext(CurrentUserContext);
  const [header, setHeader] = useState('Home');

  if (status === 'idle') {
    return (
      <Main>
        <Router>
          <GlobalStyles />
          <Sidebar />
          <PageContainer>
            <Headbar header={header} />
            <PageContent>
              <Switch>
                <Route exact path='/' >
                  <HomeFeed setHeader={setHeader} />
                </Route>
                <Route exact path='/notifications' >
                  <Notifications setHeader={setHeader} />
                </Route>
                <Route exact path='/bookmarks' >
                  <Bookmarks setHeader={setHeader} />
                </Route>
                <Route exact path='/tweet/:tweetID' >
                  <TweetDetails setHeader={setHeader} />
                </Route>
                <Route exact path='/users/:profileID/feed' >
                  <Profile setHeader={setHeader} />
                  <UserFeed />
                </Route>
                <Route exact path='/users/:profileID/media' >
                  <Profile setHeader={setHeader} />
                  <UserMedia />
                </Route>
                <Route exact path='/users/:profileID/likes' >
                  <Profile setHeader={setHeader} />
                  <UserLikes />
                </Route>
                <Redirect from='/users/:profileID' to="/users/:profileID/feed" />
                  <Route path='/' >
                    <Error message={"Baaaaahhh you're lost!"} />
                  </Route>
              </Switch>
            </PageContent>
          </PageContainer>
        </Router>
      </Main>
    )
  }

  else if (status === 'loading') {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }
  else {
    return (
      <Error/>
    )
  }
}

const Main = styled.main`
  display: flex;
  margin-left: 5vw;
`;

const PageContainer = styled.div`
  margin-left: 18vw;
  border-left: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
  min-height: 100vh;
  height: 100%;
  width: ${mainWidth};
`;

const PageContent = styled.div`
  margin-top: 80px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  margin-top: 40px;
`;

export default App;
