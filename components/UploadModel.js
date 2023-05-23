import React, { useState } from 'react';
import {
  apiToken,
  tenant,
  channelId,
  apiRootUrl,
  uploadFile,
  createARScene,
  createURL,
} from '../utils/Appearition';

import LoadingComponent from './LoadingComponent';

const UploadModel = ({
  arProvider,
  setArProvider,
  setModelUrl,
  setWebArURL,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const processUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoadingText('Uploading model');
    if (!file) return;

    if (!apiToken || !tenant || !channelId || !apiRootUrl) {
      return alert(
        'Please fill in the required fields in the utils/Appearition.js file.'
      );
    }

    try {
      const { fileUrl, contentItemKey, contentItemProviderName } =
        await uploadFile(file);
      console.log('url', fileUrl);
      setModelUrl(fileUrl);

      setLoadingText('Creating AR record');

      const { sceneData, arTargetId, arTargetKey } = await createARScene(
        name,
        description,
        description,
        fileUrl,
        arProvider,
        contentItemKey,
        contentItemProviderName
      );
      console.log('sceneData', sceneData);
      console.log('arTargetKey1', arTargetKey);
      const { text: sceneName, mediaType, arMediaId } = sceneData || {};

      console.log('sceneName', sceneName);
      console.log('mediaType', mediaType);

      const url = await createURL(arTargetId, arTargetKey, arProvider);
      console.log('url', url);
      setWebArURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent message={loadingText} />;

  return (
    <div className='h-screen overflow-auto bg-gray-100 py-2 sm:py-6 flex flex-col justify-center'>
      <div className='relative py-2 sm:py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-red-200 to-pink-300 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-2 sm:px-4 py-6 sm:py-10 bg-white shadow-lg sm:rounded-3xl'>
          <h1 className='text-center text-xl sm:text-2xl font-semibold mb-4 sm:mb-8'>
            Create AR experience
          </h1>
          <form onSubmit={processUpload}>
            <div className='form-group mb-2 sm:mb-4 px-2 sm:px-4'>
              <label htmlFor='name' className='block text-lg font-bold mb-2'>
                1. Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-full mt-1 py-1 px-1 sm:py-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='form-group mb-2 sm:mb-4 px-2 sm:px-4'>
              <label
                htmlFor='description'
                className='block text-lg font-bold mb-2'
              >
                2. Description:{' '}
                <span className='font-normal text-sm text-slate-600'>
                  (Optional)
                </span>
              </label>
              <input
                type='text'
                id='description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='block w-full mt-1 py-1 px-1 sm:py-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='form-group mb-2 sm:mb-4 px-2 sm:px-4'>
              <label
                htmlFor='ar-provider'
                className='block text-lg font-bold mb-2'
              >
                3. AR Provider:
              </label>
              <select
                id='ar-provider'
                name='ar-provider'
                value={arProvider}
                onChange={(e) => setArProvider(e.target.value)}
                className='block w-full mt-1 py-1 px-1 sm:py-2 border border-gray-300 rounded-md'
              >
                <option value='' disabled>
                  Select AR provider
                </option>
                <option value='8thWall'>8thWall</option>
                <option value='ModelViewer'>ModelViewer</option>
              </select>
            </div>
            <div className='form-group mb-2 sm:mb-4 px-2 sm:px-4'>
              <label
                htmlFor='model-file'
                className='block text-lg font-bold mb-2'
              >
                4. Select a .GLB file:
              </label>
              <input
                type='file'
                id='model-file'
                name='model-file'
                accept='.glb'
                onChange={handleFileChange}
                className='block w-full mt-1 py-1 px-1 sm:py-2 border border-gray-300 rounded-md'
              />
            </div>
            <button
              type='submit'
              id='upload-button'
              className='mt-2 sm:mt-4 w-full py-1 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <div className='mt-4 sm:mt-8 flex flex-col items-center'>
        <h2 className='text-center text-md sm:text-md font-normal'>
          Powered By:
        </h2>
        <img src='/appearition_logo.png' width={64} />
      </div>
    </div>
  );
};

export default UploadModel;
