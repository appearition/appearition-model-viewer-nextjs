import React, {useState, useEffect} from 'react';
import Viewer8thWall from './Viewer8thWall';

const ModelViewerComponent = ({
  modelUrl = 'https://cdn.glitch.com/5a4e620e-8d0d-4d82-a44f-08f272f0dd9d%2FBenzGLB3.glb?v=1616183257719',
  arProvider,
}) => {

  const [initate8thWall, setInitate8thWall] = useState(false);
  const handleAR = () => {
    setInitate8thWall(true);
  }

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
          style={{
            backgroundColor: 'white',
            borderRadius: '4px',
            border: 'none',
            position: 'absolute',
            bottom: '0',
            marginBottom: '10vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '8px 16px',
            fontSize: '16px',
          }}
        >
          Launch AR
        </button>
      </model-viewer>
      <button
        style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          border: 'none',
          position: 'absolute',
          bottom: '0',
          marginBottom: '10vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '8px 16px',
          fontSize: '16px',
        }}
        onClick={handleAR}
      >
        Launch AP
      </button>
    </div>
  );
};

export default ModelViewerComponent;
