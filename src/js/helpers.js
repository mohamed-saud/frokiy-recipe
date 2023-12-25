import { TIME_RECUEST_SC, API_URL } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const ferPro = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    const data = await ferPro.json();

    if (!ferPro.ok) {
      throw Error(`${data.message} ${ferPro.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
