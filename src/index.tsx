/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom';
import ZoomMtgCm from '@zoomus/instantsdk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ZoomContext from './context/zoom-context';
import { devConfig } from './config/dev';
import { generateSignature } from './utils/util';

let meetingArgs: any = Object.fromEntries(new URLSearchParams(location.search));
if (
  !meetingArgs.sdkKey ||
  !meetingArgs.topic ||
  !meetingArgs.name ||
  !meetingArgs.signature
) {
  meetingArgs = devConfig;
}
if (!meetingArgs.signature && meetingArgs.sdkSecret && meetingArgs.topic) {
  meetingArgs.signature = generateSignature(
    meetingArgs.sdkKey,
    meetingArgs.sdkSecret,
    meetingArgs.topic,
    meetingArgs.password,
  );
}



const zmClient = ZoomMtgCm.createClient();

const leaveSession = () => {
  // e.preventDefault();
  alert("LeaveSession");
  zmClient.leave();
};

ReactDOM.render(
  <React.StrictMode>
    <ZoomContext.Provider value={zmClient}>
      <App meetingArgs={meetingArgs as any} />
      <button onClick={leaveSession}>Leave</button>
    </ZoomContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
