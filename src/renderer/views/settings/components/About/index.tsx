import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { BLUE_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';

import { APP_ICON } from '~/renderer/constants';

export const About = () => {
  return (
    <>
      <Header>About Promethium</Header>
      <Row>
        <Title>
          Promethium is a fork of <a rel="noopener" target="_blank" href="https://github.com/wexond">Wexond Browser</a> by <a rel="noopener" target="_blank" href="https://github.com/Alex313031">Alex313031</a>.
        </Title>
     </Row>
     <Row>      
        <p>
          Promethium is named after <a rel="noopener" target="_blank" href="https://en.wikipedia.org/wiki/Promethium">radioactive element &#8470; 61</a>.
          <br/>
          It uses <a rel="noopener" target="_blank" href="https://www.electronjs.org">Electron</a> as a base, and combines <a rel="noopener" target="_blank" href="https://react.dev">React.js</a> with <a rel="noopener" target="_blank" href="https://m1.material.io">Material Design</a> principles, and icons from <a rel="noopener" target="_blank" href="https://fonts.google.com/icons">Google's Library</a>.
          <br/>
          Wexond was originally developed by <a rel="noopener" target="_blank" href="https://github.com/sentialx">Eryk Rakowski</a>.
        </p>
     </Row>
     <Row>
       <p>&nbsp;&nbsp;
          <a rel="noopener" target="_blank" href="https://github.com/Alex313031/promethium">
         <img width="64px" title="Promethium Logo (Click Me!)" src={APP_ICON} className="appicon"></img></a>
       </p>
     </Row>
     <Row>
       <p>
         Version: 6.1.2
       </p>
     </Row>
    </>
  );
};
