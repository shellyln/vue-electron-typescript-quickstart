
import { BrowserWindow } from 'electron';



const windowMap = new Map<symbol | BrowserWindow, BrowserWindow>();


export function registerWindow(key: symbol | BrowserWindow, wnd: BrowserWindow) {
    windowMap.set(key, wnd);
}


export function unregisterWindow(key: symbol | BrowserWindow) {
    return windowMap.delete(key);
}


export function isRegistered(key: symbol | BrowserWindow) {
    return windowMap.has(key);
}


export function getWindow(key: symbol | BrowserWindow) {
    return windowMap.get(key);
}
