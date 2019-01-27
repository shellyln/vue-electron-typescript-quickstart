
import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';



export const appConfig = JSON.parse(
    fs.readFileSync(path.join(app.getAppPath(), 'config/app-config.json')).toString());
