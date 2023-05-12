import store from '../store';

export const loadURL = async (url: string) => {
  const tab = store.tabs.selectedTab;

  if (!tab) {
    await store.tabs.addTab({ url, active: true });
  } else {
    tab.url = url;
    try {
      await tab.callViewMethod('loadURL', url);
    } catch (err) {
      console.error(err);
    }
  }
};
