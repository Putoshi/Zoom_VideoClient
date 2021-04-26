/* eslint-disable no-restricted-globals */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';
import { IconFont } from '../../component/icon-font';
import './home.scss';

const { Meta } = Card;
const Home: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { history } = props;
  const onCardClick = (type: string) => {
    history.push(`/${type}${location.search}`);
  };
  const featureList = [
    {
      key: 'video',
      icon: 'icon-meeting',
      title: 'Audio, video and share',
      description:
        'Gallery Layout, Start/Stop Audio, Mute/Unmute, Start/Stop Video, Start/Stop Screen Share',
    },
    {
      key: 'chat',
      icon: 'icon-chat',
      title: 'Session chat',
      description: 'Session Chat, Chat Priviledge',
    },
  ];
  return (
    <div>
      <div className="flex fixed nav">
        <a href="/" className="h-full flex items-center router-active navhome">
          <img src="./logo.svg" alt="Home" className="h-20px" />
          <span className="text-second pl-4 ml-4 border-l border-line weak-hidden sm:inline-block">
            VideoSDK
          </span>
        </a>

        <a
          href="https://marketplace.zoom.us/docs/sdk/video/web/reference"
          className="h-full flex items-center router-active navdoc"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-second pl-4 ml-4 border-l border-line weak-hidden sm:inline-block">
            API Reference
          </span>
        </a>

        <a
          href="https://marketplace.zoom.us/docs/sdk/video/web/essential"
          className="h-full flex items-center router-active navdoc"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-second pl-4 ml-4 border-l border-line weak-hidden sm:inline-block">
            Doc
          </span>
        </a>
      </div>

      <div className="home">
        <h1>Zoom Video SDK feature</h1>
        <div className="feature-entry">
          {featureList.map((feature) => {
            const { key, icon, title, description } = feature;
            return (
              <Card
                cover={<IconFont style={{ fontSize: '72px' }} type={icon} />}
                hoverable
                style={{ width: 320 }}
                className="entry-item"
                key={key}
                onClick={() => onCardClick(key)}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
