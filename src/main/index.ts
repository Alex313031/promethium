import { ipcMain, app, components, webContents } from 'electron';
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

// Enable experimental web features
//app.commandLine.appendSwitch('enable-experimental-web-platform-features');
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
// Enable Zero Copy for GPU memory associated with Tiles
app.commandLine.appendSwitch('enable-zero-copy');
// Inform GPU process that GPU context will not be lost in power saving modes
// Useful for fixing blank or pink screens/videos upon system resume, etc
app.commandLine.appendSwitch('gpu-no-context-lost');
// Enable all WebGL Features
app.commandLine.appendSwitch('enable-webgl-draft-extensions');
// Transparent overlays for Promethium UI
app.commandLine.appendSwitch('enable-transparent-visuals');

// Enable native CPU-mappable GPU memory buffer support on Linux
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
}

// Enable useful features
if (process.platform === 'linux') {
  app.commandLine.appendSwitch(
  'enable-features','CanvasOopRasterization,CSSColorSchemeUARendering,ImpulseScrollAnimations,ParallelDownloading,Portals,StorageBuckets,JXL,VaapiVideoDecoder,VaapiVideoEncoder',
  );
}
// VAAPI is only applicable on linux so copy above without vaapi flags
if (process.platform === 'win32' || process.platform === 'darwin') {
  app.commandLine.appendSwitch(
  'enable-features','CanvasOopRasterization,CSSColorSchemeUARendering,ImpulseScrollAnimations,ParallelDownloading,Portals,StorageBuckets,JXL',
  );
}

if (process.env.NODE_ENV === 'development') {
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
}

ipcMain.setMaxListeners(0);

// app.setAsDefaultProtocolClient('http');
// app.setAsDefaultProtocolClient('https');

const application = Application.instance;
(async () => {
  await application.start();
})()

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
    try {
      const wc = webContents.fromId(webContentsId);
      const result = (wc as any)[method](...args);

      if (result) {
        if (result instanceof Promise) {
          return await result;
        }

        return result;
      }
    } catch (e) {
      console.error(e);
    }
  },
);

// We need to prevent extension background pages from being garbage collected.
const backgroundPages: Electron.WebContents[] = [];

app.on('web-contents-created', (e, webContents) => {
  if (webContents.getType() === 'backgroundPage')
    backgroundPages.push(webContents);
});
