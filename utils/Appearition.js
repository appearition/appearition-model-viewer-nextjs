export const apiToken = '2bf70a83-1e78-461d-8ff5-3ee302415a40'; // Authentication token from project dashboard // apiToken
export const tenant = 'arcms08'; // Tenant ID of the tenant you want to upload to
export const channelId = '26'; // Channel ID of the channel you want to upload to
export const apiRootUrl = 'api.appearition.com'; // API root URL

let providerName;
let itemKey;
const apiUrl = `https://${apiRootUrl}/${tenant}/api`;

export const createItem = async (item) => {
  if (!apiToken || !tenant || !channelId || !apiRootUrl)
    throw new Error(
      'Please provide all required parameters. (apiToken, tenant, channelId, apiRootUrl)'
    );

  const provider = await fetch(`${apiUrl}/Content/Providers/${channelId}`, {
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': apiToken,
      'api-version': 2,
    },
  });

  const providerData = await provider.json();

  if (providerData.Data.length === 0) {
    throw new Error(
      'Please enable InternalContentLibrary provider in the tenant settings.'
    );
  } else {
    providerName = providerData.Data[0].ProviderName;
  }

  const addNewItemAPI = `${apiUrl}/ContentManager/AddNewItem/${channelId}?providerName=${providerName}`;

  const res = await fetch(addNewItemAPI, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': apiToken,
      'api-version': 2,
    },
  });
  const data = await res.json();
  itemKey = data.Data.Key;
  return data;
};

export const uploadModel = async (modelData, key) => {
  const uploadNewFileIntoItemAPI = `${apiUrl}/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}`;
  const res = await fetch(uploadNewFileIntoItemAPI, {
    method: 'POST',
    body: modelData,
    headers: {
      'authentication-token': apiToken,
      'api-version': 2,
    },
  });

  const data = await res.json();
  return data;
};

export const uploadImage = async (imageData, key) => {
  const uploadNewFileIntoItemAPI = `${apiUrl}/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}`;
  const res = await fetch(uploadNewFileIntoItemAPI, {
    method: 'POST',
    body: imageData,
    headers: {
      'authentication-token': apiToken,
      'api-version': 2,
    },
  });

  const data = await res.json();
  return data;
};

export const uploadThumbnail = async (thumbnailData, key) => {
  const uploadNewThumbnailIntoItemAPI = `${apiUrl}/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}&isThumbnailImage=true`;
  const res = await fetch(uploadNewThumbnailIntoItemAPI, {
    method: 'POST',
    body: thumbnailData,
    headers: {
      'authentication-token': apiToken,
      'api-version': 2,
    },
  });

  const data = await res.json();
  return data;
};

export const getItem = async () => {
  const getItemAPI = `${apiUrl}/Content/Item/${channelId}?providerName=${providerName}&itemKey=${itemKey}`;
  const res = await fetch(getItemAPI, {
    headers: {
      'authentication-token': apiToken,
      'api-version': 2,
    },
  });
  const data = await res.json();
  return data;
};
