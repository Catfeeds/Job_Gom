const http_factory = (method) => {
  return async (apikey, optionjson) => {
    let params = optionjson.params;
    const reuqestOptions = {
      "method": method,
      "mode": optionjson.mode || 'cors',
      "Content-Type": optionjson["Content-Type"] || "application/json"
    }

    let url = 'http://10.112.170.139:9090/mock/59880fce588f7c09fde7578b';
    url += apikey;
    if(method.toUpperCase() === 'GET') {
      let paramStr = Object.keys(params).map((item, i) => {
        return item+'='+params[item]
      }).join('&');

      url += '?' + paramStr;
    } else {
      const form = new FormData();
      for(let key in params) {
        form.append(key, params[key]);
      }
      reuqestOptions.body = form;
    }
    // console.log(url)

    const send_request = () => {
      return new Promise((resolve, reject) => {
        fetch(url, reuqestOptions).then(response => {
          resolve(response);
        })
      })
    }

    const http_result = await send_request();

    try {
      const text = await http_result.text();
      const jsonPromise = JSON.parse(text);

      return jsonPromise;
    } catch (error) {
      console.error(error);
    }
  }
}

export const http_get = http_factory('GET');
export const http_post = http_factory('POST');
