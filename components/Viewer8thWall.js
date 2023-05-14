import { useEffect, useState, useRef } from 'react';
import { isAndroid } from 'react-device-detect';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Viewer8thWall = ({ url, closeViewer: closeViewer = () => {} }) => {
  const asset = useRef(null);
  const sceneRef = useRef(null);
  const [xrReady, setXrReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [firstAnim, setFirstAnim] = useState('');

  useEffect(() => {
    if (!xrReady) return;

    const handleLoad = () => {
      setMounted(true);
      sceneRef.current.setAttribute(
        'gltf-model',
        'dracoDecoderPath: https://www.gstatic.com/draco/v1/decoders/'
      );
    };

    const element = asset.current;
    element.addEventListener('loaded', handleLoad);

    return () => {
      element.removeEventListener('loaded', handleLoad);
    };
  }, [xrReady]);

  useEffect(() => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'
    );

    const gltf = new GLTFLoader();
    gltf.setDRACOLoader(dracoLoader);

    gltf.load(url, function (gltf) {
      setFirstAnim(gltf.animations[0].name);
    });
  }, [url]);

  useEffect(() => {
    const watchWindow = setInterval(() => {
      if (window.XR8 && window.AFRAME && window.XRExtras) {
        console.log('XR8 ready');
        setXrReady(true);
        clearInterval(watchWindow);
      } else {
        console.log('loading XR8');
      }
    }, 100);

    return () => clearInterval(watchWindow);
  }, []);

  if (xrReady) {
    return (
      <>
        <div
          id='popup'
          className='absolute w-screen h-1/2 flex items-center justify-center bottom-40 pointer-events-none animate-pulse z-50 invisible'
        >
          <img
            className='opacity-50 absolute max-w-4/5 m-0 top-50 left-50 transform translate-x-[-50%] translate-y-50'
            src='/assets/Popup.png'
            alt='popup'
          />
          <div className='absolute w-4/5 text-center text-sm m-0 bottom-[-8%] left-50 pl-10 pr-10 pb-10 transform translate-x-[-50%] translate-y-[-50%] text-white'>
            Tap on the floor to place the 3d model.
            <div className='text-white'>
              Once placed, you can reposition, rotate, rescale it.
            </div>
          </div>
        </div>
        {isAndroid && (
          <button
            className='absolute top-7 left-5 z-10 text-lg text-white'
            onClick={closeViewer}
          >
            X
          </button>
        )}
        <a-scene
          ref={sceneRef}
          // coaching-overlay
          xrextras-gesture-detector
          landing-page={`mediaSrc: ${url}; sceneEnvMap: pastel; logoSrc: /assets/appearition_logo.jpeg; logoAlt: appearition_logo;`}
          xrextras-loading=''
          xrextras-runtime-error
          renderer='colorManagement: true'
          xrweb=''
        >
          <a-assets ref={asset} id='mo'>
            <a-asset-item id='3dmodel' src={url}></a-asset-item>
          </a-assets>
          <a-camera
            id='camera'
            position='0 8 0'
            raycaster='objects: .cantap'
            cursor='fuse: false; rayOrigin: mouse;'
          ></a-camera>
          <a-ring
            id='ring'
            tap-place-cursor
            rotation='-90 0 0'
            material='shader: flat; color: #E25E2F'
            radius-inner='0.5'
            radius-outer='0.8'
          ></a-ring>
          <a-light type='ambient' intensity='1'></a-light>
          <a-entity
            light='
          type: directional;
          intensity: 0.8;
          castShadow: true;
          shadowMapHeight:2048;
          shadowMapWidth:2048;
          shadowCameraTop: 20;
          target: #model;
          shadowRadius: 12'
            xrextras-attach='target: model; offset: 8 15 4'
            position='1 4.3 2.5'
            shadow
          ></a-entity>
          {mounted && (
            <a-entity
              id='model'
              gltf-model='#3dmodel'
              class='cantap'
              xrextras-hold-drag=''
              xrextras-two-finger-rotate='factor: 8'
              xrextras-pinch-scale=''
              scale='10 10 10'
              shadow='receive: false'
              visible='false'
              animation-mixer={`clip: ${firstAnim}; loop: repeat; clampWhenFinished: true;`}
            ></a-entity>
          )}
          <a-plane
            id='ground'
            rotation='-90 0 0'
            width='2000'
            height='2000'
            material='shader: shadow'
            shadow
          ></a-plane>
        </a-scene>
      </>
    );
  } else {
    return null;
  }
};

export default Viewer8thWall;
