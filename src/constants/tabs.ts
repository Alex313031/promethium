import { getWebUIURL } from '~/common/webui';
import { ICON_NTP } from '~/renderer/constants/icons';

export const NEWTAB_URL = getWebUIURL('newtab');

export const defaultTabOptions: chrome.tabs.CreateProperties = {
  url: NEWTAB_URL,
  favicon: ICON_NTP,
  active: true,
};
