import React, { useState } from 'react';
import {
  createItem,
  uploadModel,
  getItem,
  apiToken,
  tenant,
  channelId,
  apiRootUrl,
} from '../utils/Appearition';

const UploadModel = () => {
  const [file, setFile] = useState(null);
  const [uploadButtonText, setUploadButtonText] = useState('Upload');
  const [retriveButtonText, setRetriveButtonText] = useState('Retrieve');
  const [retriveContainerVisible, setRetriveContainerVisible] = useState(false);
  const [retrievedModel, setRetrievedModel] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const processUpload = async (event) => {
    event.preventDefault();

    if (!file) return;

    if (!apiToken || !tenant || !channelId || !apiRootUrl) {
      return alert(
        'Please fill in the required fields in the utils/Appearition.js file.'
      );
    }

    setUploadButtonText('Uploading...');
    const item = {
      ProviderName: 'InternalContentLibrary',
      Key: null,
      Title: file.name,
      IsThumbnailPrivate: false,
    };

    const data = await createItem(item);

    const formData = new FormData();
    formData.append('file', file);

    const data2 = await uploadModel(formData);

    if (data2) setRetriveContainerVisible(true);
    setUploadButtonText('Upload');
  };

  const retriveItem = async (event) => {
    event.preventDefault();
    setRetriveButtonText('Retrieving...');
    const data = await getItem();

    let modelViewer = (
      <div className='flex justify-center items-center'>
        <model-viewer
          src={data.Data.Files[0].Url}
          ar
          camera-controls
          touch-action='pan-y'
          style={{ width: '100%', maxWidth: '500px', height: '500px' }}
        ></model-viewer>
      </div>
    );

    setRetrievedModel(modelViewer);
    setRetriveButtonText('Retrieve');
  };
  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-center text-2xl font-semibold mb-8'>
            Upload 3D Model
          </h1>
          <form onSubmit={processUpload}>
            <div className='form-group'>
              <label
                htmlFor='model-file'
                className='block text-lg font-bold mb-2'
              >
                Select a .GLB file:
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
              {uploadButtonText}
            </button>
          </form>
          {retriveContainerVisible && (
            <div className='mt-4'>
              <button
                type='submit'
                id='retrive-button'
                className='mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                onClick={retriveItem}
              >
                {retriveButtonText}
              </button>
              {retrievedModel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModel;
