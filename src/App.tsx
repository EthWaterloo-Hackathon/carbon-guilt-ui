import React, { useEffect, useState } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import { Title, Button, Box, Text, Grid, Flex } from './ui';
import { styles } from './ui/styles';
import { Welcome } from './pages/Welcome';
import { Offset } from './pages';

const App: React.FC = () => {
  const origin = new URL('package.json', 'http://localhost:8081/').toString();
  const snapId = `wallet_plugin_${origin}`;

  const [pluginConnected, setPluginConnected] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    checkPlugin();
  }, []);

  const isConnected = async () => {
    try {
      const response = await (window as any).ethereum.send({
        method: snapId,
        params: [
          {
            method: 'isPluginConnected'
          }
        ]
      });
      console.log(response);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const checkPlugin = async () => {
    if (await isConnected()) {
      setPluginConnected(1);
    } else {
      setPluginConnected(2);
    }
  };

  return (
    <Grid gridTemplateColumns="7fr 5fr" minHeight="100vh" position="relative">
      {pluginConnected === 0 && <Box>Checking</Box>}
      {pluginConnected === 1 && <Offset />}
      {pluginConnected === 2 && (
        <Welcome
          onPluginConnected={() => {
            setPluginConnected(1);
          }}
        />
      )}
      <Flex
        bg="#eeeeee"
        flexDirection="column"
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Flex alignItems="center" justifyContent="center">
          <Box pt={styles.space[5]}>
            <Box>
              <img src={logo} className="App-logo" alt="logo" />
            </Box>
            <Box>
              <Title>Carbon Guilt</Title>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default App;
