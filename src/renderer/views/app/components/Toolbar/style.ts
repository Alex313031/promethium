import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { platform } from 'os';
import { TOOLBAR_HEIGHT } from '~/constants/design';

export const StyledToolbar = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-flow: row;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  -webkit-app-region: drag;
  height: ${TOOLBAR_HEIGHT}px;

  ${({ isFullscreen, theme }: { isFullscreen: boolean; theme: ITheme; }) => css`
    background-color: ${theme['toolbar.backgroundColor']};
    border-bottom: 1px solid ${theme['toolbar.bottomLine.backgroundColor']};
    padding-left: ${platform() === 'darwin' && !isFullscreen ? 78 : 4}px;
    &:before {
      -webkit-app-region: ${isFullscreen ? 'no-drag' : 'drag'};
    }
  `};

  transition: background-color 0.4s, color 0.4s;
  transition-timing-function: ease-out;
`;
