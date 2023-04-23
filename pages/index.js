import Head from 'next/head';
import UploadModel from '@/components/UploadModel';

export default function Home() {
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
      <UploadModel />
    </>
  );
}
