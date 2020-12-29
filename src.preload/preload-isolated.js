
{
    const { contextBridge, ipcRenderer } = require('electron');

    contextBridge.exposeInMainWorld(
        'myAppApi', {
            ping: async (value) => {
                return ipcRenderer.invoke('views:Home:message-foo', value);
            },
        }
    );
}
