'use strict';

(function () {

  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var TIMEOUT = 10000;

  var OK_STATUS = 200;
  /**
   * генерирует сообщение об ошибке
   *
   * @param {number} error - xhr.status ошибки
   * @return {string} строка с сообщением об ошибке
   */
  function getErrorMesage(error) {
    switch (error) {
      case 500:
        return 'Ошибка ' + error + ': ' + 'Internal Server Error — произошла внутренняя ошибка';
      case 404:
        return 'Ошибка ' + error + ': ' + 'Not Found — запрашиваемый ресурс не найден';
      case 400:
        return 'Ошибка ' + error + ': ' + 'Bad Request — неправильный запрос';
      case 301:
        return 'Ошибка ' + error + ': ' + 'Moved Permanently — ресурс переехал навсегда';
      case 307:
        return 'Ошибка ' + error + ': ' + 'Temporary Redirect — ресурс переехал временно';
      default:
        return 'Ошибка загрузки объявления';
    }
  }
  /**
   * создает запрос на сервер
   *
   * @param {string} method - GET или POST
   * @param {function} onLoad - действие в случае успеха
   * @param {number} onError - действие в случае ошибки
   * @return {object} xhr объект запроса
   */
  function createRequest(method, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(getErrorMesage(xhr.status));
      }
    });
    xhr.addEventListener('error', function () {
      onError(getErrorMesage(xhr.status));
    });

    xhr.addEventListener('timeout', function () {
      onError(getErrorMesage(xhr.status));
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, Url[method]);

    return xhr;
  }

  window.backend = {
    /**
     * создает GET запрос на сервер
     *
     * @param {function} onLoad - действие в случае успеха
     * @param {function} onError - действие в случае ошибки
    */
    load: function (onLoad, onError) {
      var xhr = createRequest('GET', onLoad, onError);
      xhr.send();
    },
    /**
     * создает POST запрос на сервер
     *
     * @param {object} data - объект с данными для сервера
     * @param {function} onLoad - действие в случае успеха
     * @param {function} onError - действие в случае ошибки
    */
    save: function (data, onLoad, onError) {
      var xhr = createRequest('POST', onLoad, onError);
      xhr.send();
    }
  };

})();
