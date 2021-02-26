import React, { memo } from 'react';
import { Box, BoxProps, color, Flex, FlexProps, IconButton, Stack } from '@stacks/ui';
import { IconArrowLeft, IconDots } from '@tabler/icons';

import { StacksWalletLogo } from '@components/stacks-wallet-logo';
import { useAnalytics } from '@common/hooks/use-analytics';
import { useDrawers } from '@common/hooks/use-drawers';
import { NetworkModeBadge } from '@components/network-mode-badge';
import { ScreenPaths } from '@store/onboarding/types';
import { Title } from '@components/typography';

interface HeaderProps extends FlexProps {
  onClose?: () => void;
  hideActions?: boolean;
  title?: string;
}

const MenuButton: React.FC<BoxProps> = memo(props => {
  const { showSettings, setShowSettings } = useDrawers();
  return (
    <IconButton
      size="36px"
      iconSize="20px"
      onMouseUp={showSettings ? undefined : () => setShowSettings(true)}
      pointerEvents={showSettings ? 'none' : 'all'}
      color={color('text-caption')}
      _hover={{
        color: color('text-title'),
      }}
      icon={IconDots}
      {...props}
    />
  );
});

const HeaderTitle: React.FC<BoxProps> = props => (
  <Title fontSize="20px" lineHeight="28px" fontWeight={500} {...props} />
);

export const Header: React.FC<HeaderProps> = memo(props => {
  const { onClose, title, hideActions } = props;
  const { doChangeScreen } = useAnalytics();

  return (
    <Flex alignItems="flex-start" justifyContent="space-between" {...props}>
      {!title ? (
        <StacksWalletLogo pt="7px" onClick={() => doChangeScreen(ScreenPaths.HOME)} />
      ) : (
        <Box pt={onClose ? 'loose' : 'unset'}>
          {onClose ? (
            <IconButton
              top="base-tight"
              position="absolute"
              left="base"
              onClick={onClose}
              icon={IconArrowLeft}
            />
          ) : null}
          <HeaderTitle>{title}</HeaderTitle>
        </Box>
      )}
      <Stack alignItems="center" isInline>
        <NetworkModeBadge />
        {!hideActions && <MenuButton />}
      </Stack>
    </Flex>
  );
});