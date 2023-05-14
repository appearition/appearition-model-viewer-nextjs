import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script
          type='module'
          defer
          src='https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js'
        ></script>
                 <script
            defer
            src='//cdn.8thwall.com/web/aframe/8frame-1.1.0.min.js'
          ></script>
          {/* <script
            defer
            src='//cdn.8thwall.com/web/landing-page/landing-page.js'
          ></script> */}
          <script
            defer
            src='//cdn.8thwall.com/web/xrextras/xrextras.js'
          ></script>
          <script
            defer
            src='//cdn.8thwall.com/web/aframe/ammo.wasm.js'
          ></script>
          <script
            defer
            src='//cdn.8thwall.com/web/aframe/aframe-physics-system-4.0.1.min.js'
          ></script>
          <script
            defer
            src='//cdn.8thwall.com/web/aframe/aframe-extras-6.1.1.min.js'
          ></script>
          {/* <script
            defer
            src='//cdn.8thwall.com/web/aframe/aframe-chromakey-material-1.1.1.min.js'
          ></script> */}

          <script
            async
            src='//apps.8thwall.com/xrweb?appKey=t2DWZuH8Pymvww8XdymtPUgD6FEXtsdBfd5AOxJL8JyFK7eniJDVSsB0cUccK1zp3qZpy'
          ></script>
          <script defer src='/js/draco_encoder.js'></script>
          <script defer src='/js/draco_decoder.js'></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
