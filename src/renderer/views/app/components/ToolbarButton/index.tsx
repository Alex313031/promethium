import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { transparency } from '~/renderer/constants/transparency';
import { Button, Icon, Badge, PreloaderBg } from './style';
import { BLUE_500, BLUEGREEN, DARK_GREEN } from '~/renderer/constants';
import { Preloader } from '~/renderer/components/Preloader';

interface Props {
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  size?: number;
  style?: any;
  icon: string;
  divRef?: (ref: HTMLDivElement) => void;
  disabled?: boolean;
  className?: string;
  children?: any;
  title: any;
  opacity?: number;
  autoInvert?: boolean;
  badgeBackground?: string;
  inhertTextColor?: boolean;
  badge?: boolean;
  badgeTextColor?: string;
  badgeText?: string;
  badgeTop?: number;
  badgeRight?: number;
  preloader?: boolean;
  value?: number;
  toggled?: boolean;
  dense?: boolean;
  iconStyle?: any;
  id?: string;
}

export const ToolbarButton = observer(
  ({
    icon,
    onClick,
    onMouseDown,
    size,
    disabled,
    className,
    divRef,
    children,
    title,
    opacity,
    autoInvert,
    style,
    badgeText,
    badgeBackground,
    badge,
    badgeTextColor,
    badgeTop,
    badgeRight,
    value,
    preloader,
    onContextMenu,
    onMouseUp,
    toggled,
    dense,
    iconStyle,
    inhertTextColor,
    id,
  }: Props) => {
    style = { ...style };

    return (
      <Button
        id={id}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className={className}
        style={style}
        toggled={toggled}
        title={title}
        dense={dense}
        ref={divRef && divRef}
        disabled={disabled}
      >
        <Icon
          style={{ backgroundImage: `url(${icon})`, ...iconStyle }}
          inhertTextColor={inhertTextColor}
          size={size}
          dense={dense}
          disabled={disabled}
          opacity={opacity}
          autoInvert={autoInvert}
        />
        {badge && (
          <Badge
            right={badgeRight}
            top={badgeTop}
            background={badgeBackground}
            color={badgeTextColor}
          >
            {badgeText}
          </Badge>
        )}
        {preloader && value > 0 && (
          <>
            <PreloaderBg></PreloaderBg>
            <Preloader
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%)`,
                pointerEvents: 'none',
              }}
              thickness={3}
              size={36}
              value={value}
            />
          </>
        )}
        {children}
      </Button>
    );
  },
);

(ToolbarButton as any).defaultProps = {
  size: 20,
  opacity: transparency.icons.active,
  autoInvert: true,
  badgeBackground: DARK_GREEN,
  badgeTextColor: 'white',
  badgeTop: 4,
  badgeRight: 4,
};
