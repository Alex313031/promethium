import { Menu, webContents, app, BrowserWindow, MenuItem } from 'electron';
import { defaultTabOptions } from '~/constants/tabs';
import { viewSource, saveAs, printPage } from './common-actions';
import { WEBUI_BASE_URL, WEBUI_URL_SUFFIX } from '~/constants/files';
import { AppWindow } from '../windows';
import { Application } from '../application';
import { showMenuDialog } from '../dialogs/menu';
import { getWebUIURL } from '~/common/webui';
import { resolve, join } from 'path';

const isWin = process.platform === 'win32';
const isMac = process.platform === 'darwin';

const createMenuItem = (
  shortcuts: string[],
  action: (
    window: AppWindow,
    menuItem: MenuItem,
    shortcutIndex: number,
  ) => void,
  label: string = null,
) => {
  const result: any = shortcuts.map((shortcut, key) => ({
    accelerator: shortcut,
    visible: label != null && key === 0,
    label: label != null && key === 0 ? label : '',
    click: (menuItem: MenuItem, browserWindow: BrowserWindow) =>
      action(
        Application.instance.windows.list.find(
          (x) => x.win.id === browserWindow.id,
        ),
        menuItem,
        key,
      ),
  }));

  return result;
};

export const getMainMenu = () => {
  const template: any = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    {
      label: 'File',
      submenu: [
        ...createMenuItem(
          ['CmdOrCtrl+N'],
          () => {
            Application.instance.windows.open();
          },
          'New window',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+Shift+N'],
          () => {
            Application.instance.windows.open(true);
          },
          'New incognito window',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+T'],
          (window) => {
            window.viewManager.create(defaultTabOptions);
          },
          'New tab',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+Shift+T'],
          (window) => {
            window.send('revert-closed-tab');
          },
          'Revert closed tab',
        ),
        {
          type: 'separator',
        },
        ...createMenuItem(
          ['CmdOrCtrl+Shift+W'],
          (window) => {
            window.win.close();
          },
          'Close window',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+W', 'CmdOrCtrl+F4'],
          (window) => {
            window.send('remove-tab', window.viewManager.selectedId);
          },
          'Close tab',
        ),
        {
          type: 'separator',
        },
        ...createMenuItem(
          ['CmdOrCtrl+S'],
          async () => {
            await saveAs();
          },
          'Save webpage as...',
        ),
        {
          type: 'separator',
        },
        ...createMenuItem(
          ['CmdOrCtrl+P'],
          () => {
            printPage();
          },
          'Print',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+Shift+Q'],
          (window) => {
            app.quit();
          },
          'Quit Promethium',
        ),

        // ...(!isMac ? [{ role: 'quit' }] : [{}]),

        // Hidden items

        // Focus address bar
        ...createMenuItem(
          ['Ctrl+Space', 'CmdOrCtrl+L', 'Alt+D', 'F6'],
          async () => {
            await Application.instance.dialogs
              .getPersistent('search')
              .show(Application.instance.windows.current.win);
          },
        ),

        // Toggle menu
        ...createMenuItem(['Alt+F', 'Alt+E'], () => {
          Application.instance.windows.current.send('show-menu-dialog');
        }),
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
        { type: 'separator' },
        ...createMenuItem(
          ['CmdOrCtrl+F'],
          () => {
            Application.instance.windows.current.send('find');
          },
          'Find in page',
        ),
      ],
    },
    {
      label: 'View',
      submenu: [
        ...createMenuItem(
          ['CmdOrCtrl+R', 'F5'],
          () => {
            Application.instance.windows.current.viewManager.selected.webContents.reload();
          },
          'Reload',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+Shift+R', 'Shift+F5'],
          () => {
            Application.instance.windows.current.viewManager.selected.webContents.reloadIgnoringCache();
          },
          'Reload ignoring cache',
        ),
      ],
    },
    {
      label: 'History',
      submenu: [
        // TODO: Homepage - Ctrl+Shift+H
        ...createMenuItem(
          isMac ? ['Cmd+[', 'Cmd+Left'] : ['Alt+Left'],
          () => {
            const { selected } =
              Application.instance.windows.current.viewManager;
            if (selected) {
              selected.webContents.goBack();
            }
          },
          'Go back',
        ),
        ...createMenuItem(
          isMac ? ['Cmd+]', 'Cmd+Right'] : ['Alt+Right'],
          () => {
            const { selected } =
              Application.instance.windows.current.viewManager;
            if (selected) {
              selected.webContents.goForward();
            }
          },
          'Go forward',
        ),
        // { type: 'separator' }
        // TODO: list last closed tabs
        // { type: 'separator' }
        // TODO: list last visited
        { type: 'separator' },
        ...createMenuItem(
          isMac ? ['Cmd+Y'] : ['Ctrl+H'],
          () => {
            Application.instance.windows.current.viewManager.create({
              url: getWebUIURL('history'),
              active: true,
            });
          },
          'Manage history',
        ),
      ],
    },
    {
      label: 'Bookmarks',
      submenu: [
        ...createMenuItem(
          isMac ? ['Cmd+Option+B'] : ['CmdOrCtrl+Shift+O'],
          () => {
            Application.instance.windows.current.viewManager.create({
              url: getWebUIURL('bookmarks'),
              active: true,
            });
          },
          'Manage bookmarks',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+Shift+B'],
          async () => {
            const { bookmarksBar } = Application.instance.settings.object;
            await Application.instance.settings.updateSettings({
              bookmarksBar: !bookmarksBar,
            });
          },
          'Toggle bookmarks bar',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+D'],
          () => {
            Application.instance.windows.current.webContents.send(
              'show-add-bookmark-dialog',
            );
          },
          'Add this website to bookmarks',
        ),
        // { type: 'separator' }
        // TODO: list bookmarks
      ],
    },
    {
      label: 'Tools',
      submenu: [
        ...createMenuItem(
          ['CmdOrCtrl+U'],
          async () => {
            await viewSource();
          },
          'View source',
        ),
        ...createMenuItem(
          ['CmdOrCtrl+Shift+I', 'CmdOrCtrl+Shift+J'],
          () => {
            setTimeout(() => {
              Application.instance.windows.current.viewManager.selected.webContents.toggleDevTools();
            });
          },
          'Developer Tools',
         ),
         // Developer tools (current webContents) (detach)
         ...createMenuItem(['F12', 'CmdOrCtrl+Shift+F12'], () => {
             setTimeout(() => {
               webContents
               .getFocusedWebContents()
               .openDevTools({ mode: 'detach' });
             });
           },
           'Developer Tools (Detached)',
          ),
          // Open Chromium GPU page to check hardware acceleration
          ...createMenuItem(['CmdOrCtrl+Alt+G'], () => {
               setTimeout(() => {
                 const gpuWindow = new BrowserWindow({width: 1024, height: 768, title: "GPU Internals"});
                 gpuWindow.loadURL('chrome://gpu');
               });
            },
            'Open chrome://gpu',
           ),
          // Open Chromium Media Internals page to check Codec/Widevine support
          ...createMenuItem(['CmdOrCtrl+Alt+M'], () => {
               setTimeout(() => {
                 const gpuWindow = new BrowserWindow({width: 1024, height: 768, title: "Media Internals"});
                 gpuWindow.loadURL('chrome://media-internals');
               });
            },
            'Open chrome://media-internals',
           ),
        ],
      },
    {
      label: 'Tab',
      submenu: [
        ...createMenuItem(
          isMac ? ['Cmd+Option+Right'] : ['Ctrl+Tab', 'Ctrl+PageDown'],
          () => {
            Application.instance.windows.current.webContents.send(
              'select-next-tab',
            );
          },
          'Select next tab',
        ),
        ...createMenuItem(
          isMac ? ['Cmd+Option+Left'] : ['Ctrl+Shift+Tab', 'Ctrl+PageUp'],
          () => {
            Application.instance.windows.current.webContents.send(
              'select-previous-tab',
            );
          },
          'Select previous tab',
        ),
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'togglefullscreen' },
        { role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' },
            ]
          : [{ role: 'close', accelerator: '' }]),
        { type: 'separator' },
        {
          label: 'Always on top',
          type: 'checkbox',
          checked: false,
          click(menuItem: MenuItem, browserWindow: BrowserWindow) {
            browserWindow.setAlwaysOnTop(!browserWindow.isAlwaysOnTop());
            menuItem.checked = browserWindow.isAlwaysOnTop();
          },
        },
      ],
    },
    {
      label: 'About',
      submenu: [
        ...createMenuItem(['CmdOrCtrl+Shift+Alt+A'], () => {
               setTimeout(() => {
                 const AboutWindow = new BrowserWindow({
                   width: 308,
                   height: 232,
                   useContentSize: true,
                   title: "About Promethium",
                   icon: isWin ? resolve(app.getAppPath(),`static/icons/icon.ico`) : resolve(app.getAppPath(),`static/icons/icon.png`),
                   webPreferences: {
                     nodeIntegration: false,
                     nodeIntegrationInWorker: false,
                     contextIsolation: false,
                     sandbox: false,
                     experimentalFeatures: true,
                     webviewTag: true,
                     devTools: true,
                     preload: resolve(app.getAppPath(),`static/pages/client-preload.js`),
                   }
                 });
                 require('@electron/remote/main').enable(AboutWindow.webContents);
                 const AboutHTML = resolve(app.getAppPath(),`static/pages/about.html`);
                 AboutWindow.loadFile(AboutHTML);
               });
            },
            'About App',
           ),
      ],
    },
  ];

  // Ctrl+1 - Ctrl+8
  template[0].submenu = template[0].submenu.concat(
    createMenuItem(
      Array.from({ length: 8 }, (v, k) => k + 1).map((i) => `CmdOrCtrl+${i}`),
      (window, menuItem, i) => {
        Application.instance.windows.current.webContents.send(
          'select-tab-index',
          i,
        );
      },
    ),
  );

  // Ctrl+9
  template[0].submenu = template[0].submenu.concat(
    createMenuItem(['CmdOrCtrl+9'], () => {
      Application.instance.windows.current.webContents.send('select-last-tab');
    }),
  );

  // Ctrl+numadd - Ctrl+=
  template[0].submenu = template[0].submenu.concat(
    createMenuItem(['CmdOrCtrl+numadd', 'CmdOrCtrl+='], () => {
      Application.instance.windows.current.viewManager.changeZoom('in');
    }),
  );

  // Ctrl+numsub - Ctrl+-
  template[0].submenu = template[0].submenu.concat(
    createMenuItem(['CmdOrCtrl+numsub', 'CmdOrCtrl+-'], () => {
      Application.instance.windows.current.viewManager.changeZoom('out');
    }),
  );

  // Ctrl+0
  template[0].submenu = template[0].submenu.concat(
    createMenuItem(['CmdOrCtrl+0', 'CmdOrCtrl+num0'], () => {
      Application.instance.windows.current.viewManager.resetZoom();
    }),
  );

  return Menu.buildFromTemplate(template);
};
