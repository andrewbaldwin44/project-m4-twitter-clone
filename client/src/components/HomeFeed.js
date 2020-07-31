import React, { useEffect } from 'react';
import Tweet from './Tweet/index';
import useFetch from '../hooks/useFetch.hook';
import { TweetProvider } from './Tweet/TweetContext';
import styled from "styled-components";

function HomeFeed() {
  const [homeFeed, setHomeFeed] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  useFetch('/api/me/home-feed', data => {
    setHomeFeed(data);
    setStatus('idle');
  });

  if (status === 'idle') {
    const { tweetIds, tweetsById } = homeFeed;

    console.log(tweetsById)

    return (
      <Tweets>
        {tweetIds.map(tweetID => {
          const {
            displayName,
            handle,
            avatarSrc
          } = tweetsById[tweetID].author;

          const {
            status,
            isLiked,
            isRetweeted,
            numLikes,
            numRetweets,
            timestamp
          } = tweetsById[tweetID];

          console.log(avatarSrc)

          return (
            <TweetProvider
              key={tweetID}
              displayName={displayName}
              handle={handle}
              avatarSrc={avatarSrc}
              tweetContent={status}
              timestamp={timestamp}
              isTweetLiked={isLiked}
              isTweetRetweeted={isRetweeted}
              numberLikes={numLikes}
              numberRetweets={numRetweets}
            >
              <Tweet />
            </TweetProvider>
          )
        })}
      </Tweets>
    )
  }
  else {
    return (<div>Loading</div>)
  }
}

const Tweets = styled.div`

`;

export default HomeFeed;
