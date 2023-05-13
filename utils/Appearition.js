export const apiToken = process.env.NEXT_PUBLIC_ApiToken; // Authentication token from project dashboard // apiToken
export const tenant = process.env.NEXT_PUBLIC_Tenant; // Tenant ID of the tenant you want to upload to
export const channelId = process.env.NEXT_PUBLIC_ChannelId; // Channel ID of the channel you want to upload to
export const apiRootUrl = process.env.NEXT_PUBLIC_ApiRootUrl; // API root URL

let providerName;
let itemKey;
let arTargetId;
const apiUrl = `https://${apiRootUrl}/${tenant}/api`;

export const uploadFile = async (file) => {
  if (!file || !apiToken || !tenant || !channelId || !apiRootUrl) {
    throw new Error(
      'Please provide all required parameters. (file, apiToken, tenant, channelId, apiRootUrl)'
    );
  }

  const getProvider = async () => {
    try {
      const response = await fetch(`${apiUrl}/Content/Providers/${channelId}`, {
        headers: {
          'Content-Type': 'application/json',
          'authentication-token': apiToken,
          'api-version': 2,
        },
      });

      const providerData = await response.json();

      if (providerData.Data.length === 0) {
        throw new Error(
          'Please enable InternalContentLibrary provider in the tenant settings.'
        );
      }

      return providerData.Data[0].ProviderName;
    } catch (error) {
      console.error('Error fetching provider data:', error);
      throw error;
    }
  };

  const createNewItem = async (provider, fileName) => {
    try {
      const item = {
        ProviderName: provider,
        Key: null,
        Title: fileName,
        IsThumbnailPrivate: false,
      };

      const addNewItemUrl = `${apiUrl}/ContentManager/AddNewItem/${channelId}?providerName=${provider}`;

      const response = await fetch(addNewItemUrl, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          'authentication-token': apiToken,
          'api-version': 2,
        },
      });

      const data = await response.json();
      return data.Data.Key;
    } catch (error) {
      console.error('Error creating new item:', error);
      throw error;
    }
  };

  const uploadFileIntoItem = async (provider, itemKey, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const requestUrl = `${apiUrl}/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${provider}&itemKey=${itemKey}`;

      const requestOptions = {
        method: 'POST',
        body: formData,
        headers: {
          'authentication-token': apiToken,
          'api-version': 2,
        },
      };

      const response = await fetch(requestUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error uploading file to item:', error);
      throw error;
    }
  };

  const getItemData = async (provider, itemKey) => {
    try {
      const getItemAPI = `${apiUrl}/Content/Item/${channelId}?providerName=${provider}&itemKey=${itemKey}`;

      const response = await fetch(getItemAPI, {
        headers: {
          'authentication-token': apiToken,
          'api-version': 2,
        },
      });

      const responseData = await response.json();
      return responseData.Data.Files[0].Url;
    } catch (error) {
      console.error('Error fetching item data:', error);
      throw error;
    }
  };

  try {
    const provider = await getProvider();
    const itemKey = await createNewItem(provider, file.name);
    await uploadFileIntoItem(provider, itemKey, file);
    return {
      fileUrl: await getItemData(provider, itemKey),
      contentItemKey: itemKey,
      contentItemProviderName: provider,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// export const uploadThumbnail = async (thumbnailData, key) => {
//   const uploadNewThumbnailIntoItemAPI = `${apiUrl}/ContentManager/UploadNewFileIntoItem/${channelId}?providerName=${providerName}&itemKey=${itemKey}&isThumbnailImage=true`;
//   const res = await fetch(uploadNewThumbnailIntoItemAPI, {
//     method: 'POST',
//     body: thumbnailData,
//     headers: {
//       'authentication-token': apiToken,
//       'api-version': 2,
//     },
//   });

//   const data = await res.json();
//   return data;
// };

export const createARScene = async (
  name,
  shortDescription,
  longDescription,
  url,
  type,
  contentItemKey,
  contentItemProviderName
) => {
  const createARRecord = async (name, shortDescription, longDescription) => {
    if (name === null || name.length == 0) {
      console.error('Please name your experience');
      return;
    }

    const record = {
      productId: channelId,
      name: name,
      shortDescription: shortDescription || '',
      longDescription: longDescription || '',
    };

    const requestUrl = `${apiUrl}/ArTarget/Create/${channelId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authentication-token': apiToken,
        'api-version': 1,
      },
      body: JSON.stringify(record),
    };

    try {
      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data.Data.arTargetId;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const createMedia = async (
    name,
    url,
    type,
    arTargetId,
    itemKey,
    providerName
  ) => {
    const media = {
      text: name,
      url: url,
      mediaType: type,
      isPrivate: false,
      contentItemProviderName: providerName,
      contentItemKey: itemKey,
    };

    const requestUrl = `${apiUrl}/ArTarget/CreateMedia/${channelId}?arTargetId=${arTargetId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authentication-token': apiToken,
        'api-version': 2,
      },
      body: JSON.stringify(media),
    };

    try {
      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating media:', error);
      return null;
    }
  };

  try {
    const arTargetId = await createARRecord(
      name,
      shortDescription,
      longDescription
    );
    if (arTargetId === null) {
      throw new Error('Error creating AR record');
    }

    const mediaData = await createMedia(
      name,
      url,
      type,
      arTargetId,
      contentItemKey,
      contentItemProviderName
    );
    if (mediaData === null) {
      throw new Error('Error creating media');
    }
    return mediaData.Data;
  } catch (error) {
    console.error('Error creating AR scene:', error);
    return null;
  }
};

export const createArRecord = async (
  name,
  shortDescription,
  longDescription
) => {
  if (name === null || name.length == 0) {
    console.error('Please name your experience');
    return;
  }

  const record = {
    productId: channelId,
    name: name,
    shortDescription: shortDescription || '',
    longDescription: longDescription || '',
  };

  const requestUrl = `${apiUrl}/ArTarget/Create/${channelId}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': apiToken,
      'api-version': 1,
    },
    body: JSON.stringify(record),
  };

  try {
    const response = await fetch(requestUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    arTargetId = data.Data.arTargetId;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const createMedia = async (name, url, type) => {
  const media = {
    text: name,
    url: url,
    mediaType: type,
    isPrivate: false,
    contentItemProviderName: providerName,
    contentItemKey: itemKey,
  };

  const requestUrl = `${apiUrl}/ArTarget/CreateMedia/${channelId}?arTargetId=${arTargetId}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': apiToken,
      'api-version': 2,
    },
    body: JSON.stringify(media),
  };

  try {
    const response = await fetch(requestUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const addProperty = async (key, value) => {
  const requestUrl = `${apiUrl}/ArTarget/AddProperty/${channelId}?arTargetId=${arTargetId}}`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': apiToken,
      'api-version': 2,
    },
    body: JSON.stringify({ key, value }),
  };

  try {
    const response = await fetch(requestUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getProperties = async () => {
  const requestUrl = `${apiUrl}/ArTarget/GetProperties/${channelId}?arTargetId=${arTargetId}}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authentication-token': apiToken,
      'api-version': 2,
    },
  };

  try {
    const response = await fetch(requestUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
