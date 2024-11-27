import {jwtDecode} from "jwt-decode";

// Utility to get vw units
export function GetVw(px: number): string {
    return `${Math.round((px / window.innerWidth) * 100)}vw`;
}

// Utility to get vh units
export function GetVh(px: number): string {
    return `${Math.round((px / window.innerHeight) * 100)}vh`;
}

// Utility to calculate responsive font sizes
// export function GetResponsiveFontSize(basePx: number, minPx: number, maxPx: number): string {
//     const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

//     const baseRem = basePx / rootFontSize;

//     const minRem = minPx / rootFontSize; // Corrected from `baseRem`
//     const maxRem = maxPx / rootFontSize; // Corrected from `baseRem`

//     const vwSize = (basePx / window.innerWidth) * 100;

//     return `clamp(${minRem}rem, ${vwSize}vw, ${maxRem}rem)`;
// }

// Token utilities with type annotations
export const getToken = (): string | null => {
    return localStorage.getItem('token');
}

export const removeToken = (): void => {
    localStorage.removeItem('token');
}

export const setToken = (val: string): void => {
    localStorage.setItem('token', val);
}

export const decodeToken = <T>(): T | null => {
    const token = getToken();
    return token ? jwtDecode<T>(token) : null;
}
