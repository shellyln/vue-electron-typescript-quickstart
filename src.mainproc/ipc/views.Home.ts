
import { ipcMain } from 'electron';
import { createSubWindow } from '../windows/SubWindow';
import { createUserContentWindow } from '../windows/UserContentWindow';



ipcMain.handle('views:Home:message-foo', (event: any, message: string) => {
    // tslint:disable-next-line:no-console
    console.log(message);

    switch (message) {
    case 'ping':
        createSubWindow();
        // TODO: BUG: MainWindow and SubWindow's devtools can't open by CSP if UserContentWindow is created.
        createUserContentWindow();
        break;
    }
    return 'pong';
});
