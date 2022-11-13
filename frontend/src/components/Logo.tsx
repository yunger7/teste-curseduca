import { Link } from 'react-router-dom';
import { Group, Text, ActionIcon, ThemeIcon } from '@mantine/core';
import { RiAliensFill as IconAlien } from 'react-icons/ri';

import type { MantineSize } from '@mantine/core';

type LogoProps = {
  fontSize?: number | MantineSize;
  iconSize?: number;
  variant?: 'default' | 'link';
};

export const Logo = (props: LogoProps) => {
  const { fontSize = 'lg', iconSize = 32, variant = 'default' } = props;

  switch (variant) {
    case 'default':
      return (
        <Group spacing={5}>
          <ThemeIcon variant="gradient" size={iconSize}>
            <IconAlien size={iconSize} />
          </ThemeIcon>
          <Text fw={700} size={fontSize} ml={4} variant="gradient">
            I.N.V.O.
          </Text>
        </Group>
      );
    case 'link':
      return (
        <Group spacing={5}>
          <ActionIcon component={Link} to="/" variant="gradient" size="lg">
            <IconAlien size={iconSize} />
          </ActionIcon>
          <Text fw={700} size={fontSize} ml={4} variant="gradient">
            I.N.V.O.
          </Text>
        </Group>
      );
  }
};
