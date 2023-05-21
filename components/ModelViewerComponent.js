import React, { useState } from 'react';
import Viewer8thWall from './Viewer8thWall';
import { isMobile } from 'react-device-detect';
import { QRCode } from 'react-qrcode-logo';

const ModelViewerComponent = ({
  modelUrl = 'https://cdn.glitch.com/5a4e620e-8d0d-4d82-a44f-08f272f0dd9d%2FBenzGLB3.glb?v=1616183257719',
  arProvider,
  webArURL,
}) => {
  const [initate8thWall, setInitate8thWall] = useState(false);
  const handleAR = () => {
    setInitate8thWall(true);
  };

  if (initate8thWall) {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Viewer8thWall
          url={modelUrl}
          closeViewer={() => setInitate8thWall(!initate8thWall)}
        />
      </div>
    );
  }

  const qrClass = isMobile
    ? 'absolute top-0 right-0 mt-4 mr-4 z-10'
    : 'absolute bottom-0 mb-20 right-0 mr-20 z-10';

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-80'>
      <model-viewer
        src={modelUrl}
        ar
        camera-controls
        touch-action='pan-y'
        style={{ width: '100%', height: '100%' }}
      >
        <button
          slot='ar-button'
          className='bg-white rounded-none border-none absolute bottom-0 mb-20 transform -translate-x-1/2 left-1/2 z-10 py-2 px-4 text-lg'
          // style={{
          //   backgroundColor: 'white',
          //   borderRadius: '4px',
          //   border: 'none',
          //   position: 'absolute',
          //   bottom: '0',
          //   marginBottom: '10vh',
          //   left: '50%',
          //   transform: 'translateX(-50%)',
          //   zIndex: 1000,
          //   padding: '8px 16px',
          //   fontSize: '16px',
          // }}
        >
          Launch AR
        </button>
      </model-viewer>
      {arProvider === '8thWall' && isMobile && (
        <button
          className='bg-white rounded-none border-none absolute bottom-0 mb-20 transform -translate-x-1/2 left-1/2 z-10 py-2 px-4 text-lg'
          // style={{
          //   backgroundColor: 'white',
          //   borderRadius: '4px',
          //   border: 'none',
          //   position: 'absolute',
          //   bottom: '0',
          //   marginBottom: '10vh',
          //   left: '50%',
          //   transform: 'translateX(-50%)',
          //   zIndex: 1000,
          //   padding: '8px 16px',
          //   fontSize: '16px',
          // }}
          onClick={handleAR}
        >
          Launch AR
        </button>
      )}
      {webArURL && (
        <div className={qrClass}>
          <div>
            <QRCode
              value={webArURL}
              size={isMobile ? 100 : 192}
              logoImage='/appearition_logo.jpeg'
              logoOpacity={1}
              removeQrCodeBehindLogo={true}
              qrStyle='dots'
              eyeRadius={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewerComponent;
