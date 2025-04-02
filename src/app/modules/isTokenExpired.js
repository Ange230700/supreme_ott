// src\app\modules\isTokenExpired.js

function isTokenExpired(token) {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration", error);
    return true;
  }
}

export default isTokenExpired;

