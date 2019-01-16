
import { ipcMain } from 'electron';
import { createSubWindow } from '../windows/SubWindow';
import { createUserContentWindow } from '../windows/UserContentWindow';



ipcMain.on('views:Home:message-foo', (event: any, arg: any) => {
    // tslint:disable-next-line:no-console
    console.log(arg);

    switch (arg) {
    case 'ping':
        createSubWindow();
        createUserContentWindow();
        break;
    }
    event.sender.send('views:Home:message-foo', 'pong');
});
