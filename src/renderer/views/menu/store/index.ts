import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public alwaysOnTop = false;

  public updateAvailable = false;

  public constructor() {
    super();

    makeObservable(this, {
      alwaysOnTop: observable,
      updateAvailable: observable,
    });

    this.init();

    ipcRenderer.on('update-available', () => {
      this.updateAvailable = true;
    });
  }

  public async init() {
    if (remote.getCurrentWindow()) {
      this.alwaysOnTop = remote.getCurrentWindow().isAlwaysOnTop();
    }

    // TODO: Reenable auto updates
    // this.updateAvailable = await ipcRenderer.invoke('is-update-available');
  }

  public async save() {
    ipcRenderer.send('save-settings', {
      settings: JSON.stringify(this.settings),
    });
  }
}

export default new Store();
