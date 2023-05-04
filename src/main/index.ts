import { ipcMain, app, webContents } from 'electron';
import { setIpcMain } from '@wexond/rpc-electron';
setIpcMain(ipcMain);

require('@electron/remote/main').initialize();

if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install();
}

import { platform } from 'os';
import { Application } from './application';

export const isNightly = app.name === 'promethium-nightly';

app.allowRendererProcessReuse = true;
app.name = isNightly ? 'Promethium Nightly' : 'Promethium';

(process.env as any)['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

app.commandLine.appendSwitch('--enable-transparent-visuals');
// Enable useful features
app.commandLine.appendSwitch(
  'enable-features',
  'CSSColorSchemeUARendering, ImpulseScrollAnimations, ParallelDownloading',
);

// Enable experimental web features
app.commandLine.appendSwitch('enable-experimental-web-platform-features');
// Including new Canvas2D APIs
app.commandLine.appendSwitch('new-canvas-2d-api');
// These two allow easier local web development
// Allow file:// URIs to read other file:// URIs
app.commandLine.appendSwitch('allow-file-access-from-files');
// Enable local DOM to access all resources in a tree
app.commandLine.appendSwitch('enable-local-file-accesses');
// Enable QUIC for faster handshakes
app.commandLine.appendSwitch('enable-quic');
// Enable inspecting ALL layers
app.commandLine.appendSwitch('enable-ui-devtools');
// Force enable GPU acceleration
app.commandLine.appendSwitch('ignore-gpu-blocklist');
// Force enable GPU rasterization
app.commandLine.appendSwitch('enable-gpu-rasterization');
// Enable OOP Rasterization for Canvas layers
app.commandLine.appendSwitch('enable-features', 'CanvasOopRasterization');

if (process.env.NODE_ENV === 'development') {
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
}

ipcMain.setMaxListeners(0);

// app.setAsDefaultProtocolClient('http');
// app.setAsDefaultProtocolClient('https');

const application = Application.instance;
application.start();

process.on('uncaughtException', (error) => {
  console.error(error);
});

app.on('window-all-closed', () => {
  if (platform() !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('get-webcontents-id', (e) => {
  e.returnValue = e.sender.id;
});

ipcMain.on('get-window-id', (e) => {
  e.returnValue = (e.sender as any).windowId;
});

ipcMain.handle(
  `web-contents-call`,
  async (e, { webContentsId, method, args = [] }) => {
    const wc = webContents.fromId(webContentsId);
    const result = (wc as any)[method](...args);

    if (result) {
      if (result instanceof Promise) {
        return await result;
      }

      return result;
    }
  },
);

// We need to prevent extension background pages from being garbage collected.
const backgroundPages: Electron.WebContents[] = [];

app.on('web-contents-created', (e, webContents) => {
  if (webContents.getType() === 'backgroundPage')
    backgroundPages.push(webContents);
});
