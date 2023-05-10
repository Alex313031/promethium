import * as React from 'react';

import { Dropdown } from '~/renderer/components/Dropdown';
import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, Cloud } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { observer } from 'mobx-react-lite';
import { TopBarVariant } from '~/interfaces';
import { BLUE_500 } from '~/renderer/constants';
import { IDR_CLOUD } from '~/renderer/constants/imgs';

const onThemeChange = (value: string) => {
  if (value === 'auto') {
    store.settings.themeAuto = true;
  } else {
    store.settings.themeAuto = false;
    store.settings.theme = value;
  }

  store.save();
};

const ThemeVariant = observer(() => {
  const defaultValue = store.settings.theme;

  return (
    <Row>
      <Title>Theme variant</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.themeAuto ? 'auto' : defaultValue}
          onChange={onThemeChange}
        >
          <Dropdown.Item value="auto">Auto</Dropdown.Item>
          <Dropdown.Item value="promethium-light">Light</Dropdown.Item>
          <Dropdown.Item value="promethium-dark">Dark</Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

const onTopBarChange = (value: TopBarVariant) => {
  store.settings.topBarVariant = value;
  store.save();
};

const TopBarVariant = observer(() => {
  return (
    <Row>
      <Title>Top bar variant</Title>
      <Control>
        <Dropdown
          defaultValue={store.settings.topBarVariant}
          onChange={onTopBarChange}
        >
          <Dropdown.Item value="default">Full</Dropdown.Item>
          <Dropdown.Item value="compact">Compact</Dropdown.Item>
        </Dropdown>
      </Control>
    </Row>
  );
});

const WarnQuit = observer(() => {
  const { warnOnQuit } = store.settings;

  return (
    <Row onClick={onSwitchChange('warnOnQuit')}>
      <Title>Show warning dialog when closing multiple tabs</Title>
      <Control>
        <Switch value={warnOnQuit} />
      </Control>
    </Row>
  );
});

const MenuAnimations = observer(() => {
  const { animations } = store.settings;

  return (
    <Row onClick={onSwitchChange('animations')}>
      <Title>Menu animations</Title>
      <Control>
        <Switch value={animations} />
      </Control>
    </Row>
  );
});

const BookmarksBar = observer(() => {
  const { bookmarksBar } = store.settings;

  return (
    <Row onClick={onSwitchChange('bookmarksBar')}>
      <Title>Show bookmarks bar</Title>
      <Control>
        <Switch value={bookmarksBar} />
      </Control>
    </Row>
  );
});

export const Appearance = observer(() => {
  return (
    <>
      <Header>Appearance
        <Cloud><img width="36px" title="Web Cloud" alt="cloud.svg" className="cloud" src={IDR_CLOUD}></img></Cloud>
      </Header>
      <BookmarksBar />
      <WarnQuit />
      {/* <MenuAnimations /> */}
      <MenuAnimations />
      <ThemeVariant />
      <TopBarVariant />
    </>
  );
});
