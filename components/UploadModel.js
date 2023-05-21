import React, { useState } from 'react';
import {
  createItem,
  uploadModel,
  getItem,
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

    const item = {
      ProviderName: 'InternalContentLibrary',
      Key: null,
      Title: file.name,
      IsThumbnailPrivate: false,
    };

    // const data = await createItem(item);

    // const formData = new FormData();
    // formData.append('file', file);

    // const data2 = await uploadModel(formData);
    // console.log('data2', data2);
    // const data3 = await getItem();
    // console.log('data3', data3);
    // setLoadingText('Creating AR record');
    // setModelUrl(data3.Data.Files[0].Url);

    const { fileUrl, contentItemKey, contentItemProviderName } =
      await uploadFile(file);
    console.log('url', fileUrl);
    setModelUrl(fileUrl);

    const { sceneData, arTargetKey } = await createARScene(
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
    setLoading(false);

    const url = await createURL(arMediaId, arTargetKey);
    console.log('url', url);
    setWebArURL(url);
  };

  if (loading) return <LoadingComponent message={loadingText} />;

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-center text-2xl font-semibold mb-8'>
            Create AR experience
          </h1>
          <form onSubmit={processUpload}>
            <div className='form-group mb-4'>
              <label htmlFor='name' className='block text-lg font-bold mb-2'>
                1. Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='form-group mb-4'>
              <label
                htmlFor='description'
                className='block text-lg font-bold mb-2'
              >
                2. Description:
              </label>
              <input
                type='text'
                id='description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='form-group mb-4'>
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
                className='block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md'
              >
                <option value='' disabled>
                  Select an AR provider
                </option>
                <option value='8thWall'>8thWall</option>
                <option value='ModelViewer'>ModelViewer</option>
              </select>
            </div>
            <div className='form-group mb-4'>
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
                className='block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md'
              />
            </div>
            <button
              type='submit'
              id='upload-button'
              className='mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600'
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModel;
