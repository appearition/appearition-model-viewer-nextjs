import { useState } from 'react';
import Head from 'next/head';
import UploadModel from '@/components/UploadModel';
import ModelViewerComponent from '@/components/ModelViewerComponent';

export default function Home() {
  const [modelUrl, setModelUrl] = useState(null);
  const [arProvider, setArProvider] = useState('');
  const [webArURL, setWebArURL] = useState('');
  return (
    <>
      <Head>
        <title>Appearition Model Viewer</title>
        <meta
          name='description'
          content='Sample demonstrating use of Appearition platform modules for webAR'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {modelUrl && arProvider ? (
        <ModelViewerComponent
          modelUrl={modelUrl}
          arProvider={arProvider}
          webArURL={webArURL}
        />
      ) : (
        <UploadModel
          setModelUrl={setModelUrl}
          arProvider={arProvider}
          setArProvider={setArProvider}
          setWebArURL={setWebArURL}
        />
      )}
    </>
  );
}
