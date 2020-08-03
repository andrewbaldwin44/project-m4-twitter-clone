import React, { useContext } from "react";
import styled from 'styled-components';

import { TweetContext } from './TweetContext';

import { Wrapper as UserInfo } from "./Header";
import { DisplayName } from "./Header";
import { Username } from "./Header";

function DetailedHeader() {
  const {
    avatarSrc,
    displayName,
    handle,
  } = useContext(TweetContext);

  return (
    <UserInfo>
      <Avatar src={avatarSrc} />
      <Name>
        <DisplayName>{displayName}</DisplayName>
        <Username>@{handle}</Username>
      </Name>
    </UserInfo>
  )
}

export const Avatar = styled.img`
  min-width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default DetailedHeader;
