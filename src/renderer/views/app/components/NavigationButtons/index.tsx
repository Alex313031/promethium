import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledContainer } from './style';
import store from '../../store';
import { ipcRenderer } from 'electron';
import { ToolbarButton } from '../ToolbarButton';
import {
  ICON_CLOSE,
  ICON_FORWARD,
  ICON_BACK,
  ICON_REFRESH,
  ICON_HOME,
} from '~/renderer/constants/icons';

const addNewTab = (url: string) => {
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url,
    active: true,
  });
  store.hide();
};

const onBackClick = () => {
  store.tabs.selectedTab.callViewMethod('goBack');
};

const onForwardClick = () => {
  store.tabs.selectedTab.callViewMethod('goForward');
};

const onRefreshClick = () => {
  if (store.tabs.selectedTab && store.tabs.selectedTab.loading) {
    store.tabs.selectedTab.callViewMethod('stop');
  } else {
    store.tabs.selectedTab.callViewMethod('reload');
  }
};

const onHomeClick = () => {
  addNewTab('https://www.google.com/')
};

export const NavigationButtons = observer(() => {
  const { selectedTab } = store.tabs;

  let loading = false;

  if (selectedTab) {
    loading = selectedTab.loading;
  }

  return (
    <StyledContainer>
      <ToolbarButton
        disabled={!store.navigationState.canGoBack}
        size={21}
        icon={ICON_BACK}
        title="Go Back"
        style={{ marginLeft: 6 }}
        onClick={onBackClick}
      />
      <ToolbarButton
        disabled={!store.navigationState.canGoForward}
        size={21}
        icon={ICON_FORWARD}
        title="Go Forward"
        onClick={onForwardClick}
      />
      <ToolbarButton
        size={21}
        title="Refresh"
        icon={loading ? ICON_CLOSE : ICON_REFRESH}
        onClick={onRefreshClick}
      />
      <ToolbarButton
        size={19}
        title="Home"
        icon={ICON_HOME}
        onClick={onHomeClick}
      />
    </StyledContainer>
  );
});
