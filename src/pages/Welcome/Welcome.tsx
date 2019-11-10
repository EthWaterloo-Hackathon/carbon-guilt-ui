import React, { useEffect, useState } from 'react';
import { Title, Button, Box, Text, Grid, Flex } from '../../ui';
import { styles } from '../../ui/styles';

export interface Props {
  onPluginConnected: () => void;
}

export const Welcome: React.FC<Props> = props => {
  const origin = new URL('package.json', 'http://localhost:8081/').toString();
  const snapId = `wallet_plugin_${origin}`;

  const { onPluginConnected } = props;

  const startConnection = async () => {
    await connect();
    // await send();
  };

  const connect = async () => {
    const rslt = await (window as any).ethereum.send({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {},
          [snapId]: {}
        }
      ]
    });
    console.log(rslt);
    if (rslt && rslt.length > 0 && rslt[0].id) {
      onPluginConnected();
    }
  };

  return (
    <Box p={styles.space[5]}>
      <Box mb={styles.space[3]}>
        <Text color={styles.colors.gray[4]} fontSize={styles.fontSizes[9]}>
          Welcome to Carbon Guilt
        </Text>
      </Box>
      <Box mt={styles.space[5]}>
        <Text color={styles.colors.gray[3]} fontSize={styles.fontSizes[4]}>
          Help the environment by being aware of your blockchain carbon
          footprint and offset it.
        </Text>
      </Box>
      <Box mt={styles.space[5]}>
        <Text color={styles.colors.gray[3]} fontSize={styles.fontSizes[4]}>
          You need to install and connect the Carbon Guilt MetaMask plugin in
          order to continue.
        </Text>
      </Box>
      <Box mt={styles.space[5]}>
        <Button onClick={startConnection} primary>
          Install & Connect
        </Button>
      </Box>
    </Box>
  );
};
