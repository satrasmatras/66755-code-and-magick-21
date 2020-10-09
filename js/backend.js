'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/code-and-magick`;
  const RESPONSE_TYPE = `json`;
  const TIMEOUT = 10000;
  const StatusCode = {
    OK: 200,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
  };

  const createXHR = (method, url, onLoad, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    xhr.addEventListener(`load`, function () {
      let error = ``;

      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;

        case StatusCode.NOT_AUTHORIZED:
          error = `Пользователь не авторизован`;
          break;

        case StatusCode.NOT_FOUND:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
          break;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    return xhr;
  };

  const load = (onLoad, onError) => {
    const xhr = createXHR(`GET`, `${URL}/data`, onLoad, onError);
    xhr.send();
  };

  const save = (data, onLoad, onError) => {
    const xhr = createXHR(`POST`, URL, onLoad, onError);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };
})();
