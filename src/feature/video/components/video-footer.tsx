import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  MutableRefObject,
} from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import { message } from 'antd';
import ZoomContext from '../../../context/zoom-context';
import CameraButton from './camera';
import MicrophoneButton from './microphone';
import ScreenShareButton from './screen-share';
import ZoomMediaContext from '../../../context/media-context';
import { useUnmount } from '../../../hooks';
import './video-footer.scss';
interface VideoFooterProps {
  className?: string;
  shareRef?: MutableRefObject<HTMLCanvasElement | null>;
  sharing?: boolean;
}



const VideoFooter = (props: VideoFooterProps) => {
  const { className, shareRef, sharing } = props;

  const device:any = {
    speaker: null,
    mic: null,
    camera: null,
  };

  const [isStartedAudio, setIsStartedAudio] = useState(false);
  const [isStartedVideo, setIsStartedVideo] = useState(false);
  const [isStartedScreenShare, setIsStartedScreenShare] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { mediaStream } = useContext(ZoomMediaContext);
  const zmClient = useContext(ZoomContext);
  const onCameraClick = useCallback(async () => {
    console.log(device.camera);
    if (isStartedVideo) {
      await mediaStream?.stopVideo();
      setIsStartedVideo(false);
    } else {
      if(device.camera) await mediaStream?.switchCamera(device.camera.deviceId);
      await mediaStream?.startVideo();
      setIsStartedVideo(true);
    }
  }, [mediaStream, isStartedVideo, device]);

  const onMicrophoneClick = useCallback(async () => {

    if (isStartedAudio) {
      if (isMuted) {
        await mediaStream?.unmuteAudio();
        setIsMuted(false);
      } else {
        await mediaStream?.muteAudio();
        setIsMuted(true);
      }
    } else {
      if(device.mic) await mediaStream?.switchMicrophone(device.mic.deviceId);
      if(device.speaker) await mediaStream?.switchSpeaker(device.speaker.deviceId);
      await mediaStream?.startAudio();
      setIsStartedAudio(true);
    }
  }, [mediaStream, isStartedAudio, isMuted, device]);

  const onHostAudioMuted = useCallback((payload) => {
    const { action, source, type } = payload;
    if (action === 'join' && type === 'computer') {
      setIsStartedAudio(true);
    } else if (action === 'leave') {
      setIsStartedAudio(false);
    } else if (action === 'muted') {
      setIsMuted(true);
      if (source === 'passive(mute one)') {
        message.info('Host muted you');
      }
    } else if (action === 'unmuted') {
      setIsMuted(false);
      if (source === 'passive') {
        message.info('Host unmuted you');
      }
    }
  }, []);
  const onScreenShareClick = useCallback(async () => {
    if (!isStartedScreenShare && shareRef && shareRef.current) {
      await mediaStream?.startShareScreen(shareRef.current);
      setIsStartedScreenShare(true);
    } else if (isStartedScreenShare) {
      await mediaStream?.stopShareScreen();
      setIsStartedScreenShare(false);
    }
  }, [mediaStream, isStartedScreenShare, shareRef]);
  const onPassivelyStopShare = useCallback(({ reason }) => {
    console.log('passively stop reason:', reason);
    setIsStartedScreenShare(false);
  }, []);


  useEffect(() => {
    zmClient.on('current-audio-change', onHostAudioMuted);
    zmClient.on('passively-stop-share', onPassivelyStopShare);
    return () => {
      zmClient.off('current-audio-change', onHostAudioMuted);
      zmClient.off('passively-stop-share', onPassivelyStopShare);
    };
  }, [zmClient, onHostAudioMuted, onPassivelyStopShare]);


  useUnmount(() => {
    if (isStartedAudio) {
      mediaStream?.stopAudio();
    }
    if (isStartedVideo) {
      mediaStream?.stopVideo();
    }
    if (isStartedScreenShare) {
      mediaStream?.stopShareScreen();
    }
  });

  // console.log(mediaStream?.getCameraList());
  const cameraDeviceOptions = mediaStream?.getCameraList().map(e => {
    return {
      deviceId:e.deviceId,
      label:e.label,
      value:e.deviceId
    };
  });

  // console.log(mediaStream?.getMicList());
  const micDeviceOptions = mediaStream?.getMicList().map(e => {
    return {
      deviceId:e.deviceId,
      label:e.label,
      value:e.deviceId
    };
  });

  // console.log(mediaStream?.getSpeakerList());
  const speakerDeviceOptions = mediaStream?.getSpeakerList().map(e => {
    return {
      deviceId:e.deviceId,
      label:e.label,
      value:e.deviceId
    };
  });


  const onSpeakerChange = (inputValue: any): void => {
    // console.log(inputValue);
    device.speaker = inputValue;
  }

  const onMicChange = (inputValue: any): void => {
    // console.log(inputValue);
    device.mic = inputValue;
  }

  const onCameraChange = (inputValue: any): void => {
    // console.log(inputValue);
    device.camera = inputValue;
  }


  return (


    <div className={classNames('video-footer', className)}>

      <div className="select_device_list">
        <Select placeholder="Speaker" className="select_device select_speaker_device" options={speakerDeviceOptions} onChange={onSpeakerChange}/>
        <Select placeholder="Mic" className="select_device select_mic_device" options={micDeviceOptions}  onChange={onMicChange}/>
        <Select placeholder="Camera" className="select_device select_camera_device" options={cameraDeviceOptions}  onChange={onCameraChange}/>
      </div>

      <MicrophoneButton
        isStartedAudio={isStartedAudio}
        isMuted={isMuted}
        onMicrophoneClick={onMicrophoneClick}
      />
      <CameraButton isStartedVideo={isStartedVideo} onCameraClick={onCameraClick} />
      {sharing && (
        <ScreenShareButton
          isStartedScreenShare={isStartedScreenShare}
          onScreenShareClick={onScreenShareClick}
        />
      )}
    </div>
  );
};
export default VideoFooter;
