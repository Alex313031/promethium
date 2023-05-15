import * as React from 'react';

import { Title, Row, Control, Header } from '../App/style';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { Switch } from '~/renderer/components/Switch';
import { NormalButton } from '../App';
import { ipcRenderer } from 'electron';

export const General = observer(() => {
  const { defaultBrowser } = store.settings;
  return (
    <>
      <Header>Default Browser</Header>
      <Row>
        <div>
          <Title>Set Promethium as the Default Browser</Title>
        </div>
        <Control>
          <Switch
            value={defaultBrowser}
            onClick={async () => {
              await ipcRenderer.invoke('set-default-browser');
              store.settings.defaultBrowser = !store.settings.defaultBrowser;
              store.save();
            }}
          />
        </Control>
      </Row>
    </>
  );
});
