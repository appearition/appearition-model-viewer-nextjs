import React from 'react';

const ModelViewerComponent = ({
  modelUrl = 'https://cdn.glitch.com/5a4e620e-8d0d-4d82-a44f-08f272f0dd9d%2FBenzGLB3.glb?v=1616183257719',
  arProvider,
}) => {
  console.log(arProvider);
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
            bottom: '48px',
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
    </div>
  );
};

export default ModelViewerComponent;
