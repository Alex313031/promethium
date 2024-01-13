import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { ICON_SHIELD } from '~/renderer/constants/icons';
import { BLUE_500, BLUEGREEN } from '~/renderer/constants';
import { onSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';

const ClearBrowsingDataButton = observer(() => {
  const onClearBrowsingData = () => {
    // store.clear();
    console.log('Not implemented yet...');
    // store.dialogContent = 'privacy';
    // TODO: ipcRenderer.send('clear-browsing-data');
  };

  return (
      <Title>
        <a
          href="promethium://history"
          onClick={(e) => e.stopPropagation()}
        >Clear Browsing Data
        {/* <Button
          type="outlined"
          foreground={BLUE_500}
          background={BLUEGREEN}
          onClick={onClearBrowsingData}
        >
          Clear Browsing Data
        </Button> */}
        </a>
      </Title>
  );
});

const DoNotTrackToggle = observer(() => {
  const { doNotTrack } = store.settings;

  return (
    <Row onClick={onSwitchChange('doNotTrack')}>
      <Title>
        Send a{' '}&quot;
        <a
          href="https://www.w3.org/TR/tracking-dnt/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Do Not Track
        </a>&quot;{' '}
        request with your browsing traffic
      </Title>
      <Control>
        <Switch value={doNotTrack} />
      </Control>
    </Row>
  );
});

const GlobalPrivacyControlToggle = observer(() => {
  const { globalPrivacyControl } = store.settings;

  return (
    <Row onClick={onSwitchChange('globalPrivacyControl')}>
      <Title>
        Send a{' '}&quot;
        <a
          href="https://globalprivacycontrol.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Global Privacy Control
        </a>&quot;{' '}
        request with your browsing traffic
      </Title>
      <Control>
        <Switch value={globalPrivacyControl} />
      </Control>
    </Row>
  );
});

const AdBlockInfo = observer(() => {
  return (
    <Row>
      <p>
        You can toggle the Ad Blocker by clicking on the <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><title>Shield Icon</title><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/><path d="M0 0h24v24H0z" fill="none"/></svg> icon in the address bar.
        <br/>
        <br/>
        You can test both of these settings by visiting <a rel="noopener" target="_blank" href="https://browserleaks.com/donottrack">this website</a>.
        <br/>
        <br/>
        Ad blocking is provided by Cliqz via <a rel="noopener" target="_blank" href="https://www.npmjs.com/package/@cliqz/adblocker-electron">this npm package</a>.
      </p>
    </Row>
  );
});

export const Privacy = () => {
  return (
    <>
      <Header>Privacy</Header>
      <ClearBrowsingDataButton />
      <DoNotTrackToggle />
      <GlobalPrivacyControlToggle />
      <AdBlockInfo />
    </>
  );
};
