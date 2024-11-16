import { jwtDecode } from "jwt-decode";

export function GetVw(px){
    return `${Math.round((px / window.innerWidth) * 100)}vw`;
};

export function GetVh(px){
    return `${Math.round((px / window.innerHeight) * 100)}vh`;
};

export function GetResponsiveFontSize(basePx, minPx, maxPx) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    const baseRem = basePx / rootFontSize;
  
    const minRem = minPx / baseRem;
    const maxRem = maxPx / baseRem;
  
    const vwSize = (basePx / window.innerWidth) * 100;
  
    return `clamp(${minRem}rem, ${vwSize}vw, ${maxRem}rem)`;
  }


  //token stuff

export const getToken = () => {
    return localStorage.getItem('token');
}
export const removeToken = () => {
    localStorage.removeItem('token');
}
export  const setToken = (val) => {
    localStorage.setItem('token', val);
}

export const decodeToken = () => {
    const token = getToken();
    return token ? jwtDecode(token) : null;
}
