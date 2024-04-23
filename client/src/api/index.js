export const register = async(credentials)=> {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const json = await response.json();
  if(response.ok){
    window.localStorage.setItem('token', json.token);
    return attemptLoginWithToken();
  }
  else {
    throw json;
  }
};





export const login = async(credentials)=> {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if(response.ok){
      window.localStorage.setItem('token', json.token);
      return attemptLoginWithToken();
    }
    else {
      throw json;
    }
  };

  export const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  export const attemptLoginWithToken = async()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await fetch(`/api/me`, {
        headers: {
          authorization: token
        }
      });
      const json = await response.json();
      return json;
    }
  };