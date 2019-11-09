import React, { useEffect, useState, Fragment } from 'react';
import { Title, Button, Box, Text, Grid, Flex } from '../../ui';
import { styles } from '../../ui/styles';
import Slider from 'rc-slider';
import ReactModal from 'react-modal';
import Select, { OptionTypeBase } from 'react-select';
import 'rc-slider/assets/index.css';
import logo from '../../assets/footPrint.svg';
import info from '../../assets/info.svg';
import leaf from '../../assets/leaf.svg';

export const Offset: React.FC = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const origin = new URL('package.json', 'http://localhost:8081/').toString();
  const snapId = `wallet_plugin_${origin}`;

  const [offsetPercentage, setOffsetPercentage] = useState<number>(0);
  const [footPrint, setFootPrint] = useState(0);
  const [beneficiary, setBeneficiary] = useState<OptionTypeBase>();
  const [offsetAmount, setOffsetAmount] = useState<number>();
  const [modalOpen, setModalOpen] = useState(false);
  const [tokensGained, setTokensGained] = useState(0);

  useEffect(() => {
    getAccumulatedGas();
  }, []);

  const getAccumulatedGas = async () => {
    try {
      const response = await (window as any).ethereum.send({
        method: snapId,
        params: [
          {
            method: 'getAccumulatedGas'
          }
        ]
      });
      setFootPrint(response);
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + err.message || err);
    }
  };

  const reduceAccumulatedGas = async (amount: number) => {
    try {
      const response = await (window as any).ethereum.send({
        method: snapId,
        params: [
          {
            method: 'reduceAccumulatedGas',
            params: [amount]
          }
        ]
      });
      return response;
    } catch (err) {
      console.error(err);
      alert('Problem happened: ' + err.message || err);
    }
  };

  const onBeneficiarySelected = (selectedOption: OptionTypeBase) => {
    setBeneficiary(selectedOption);
  };

  const onSliderChange = (value: number) => {
    setOffsetPercentage(value);
  };

  const onAfterChange = (value: number) => {
    console.log(value);
  };

  const formatNumber = (x: number) => {
    if (!x) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const sendOffset = async () => {
    // Send the eth to the proxy

    // Reduce the amount of accumelated Gas
    const reduceResult = await reduceAccumulatedGas(5000);
    setFootPrint(reduceResult);
    setTokensGained(5);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      <ReactModal
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }
        }}
        isOpen={modalOpen}
        onRequestClose={closeModal}
      >
        <Flex my={styles.space[3]}>
          <Box pr={styles.space[5]}>
            <img src={leaf} height={80} alt="footprint" />
          </Box>
          <Box>
            <Box>
              <Text color={styles.colors.main} fontSize={styles.fontSizes[6]}>
                Congratulations!
              </Text>
            </Box>
            <Box mt={styles.space[3]}>
              <Text color={styles.colors.gray[4]}>
                You have helped save the environment, reduced your carbon
                <br />
                footprint and gained <b>{tokensGained}</b> Guilt Free Tokens.
              </Text>
            </Box>
          </Box>
        </Flex>
      </ReactModal>
      <Box p={styles.space[5]}>
        <Box mb={styles.space[5]}>
          <Text color={styles.colors.gray[4]} fontSize={styles.fontSizes[9]}>
            Welcome to Carbon Guilt
          </Text>
        </Box>
        <Grid
          gridTemplateColumns="8fr 4fr"
          mb={styles.space[3]}
          p={styles.space[3]}
        >
          <Flex flexDirection="row" p={styles.space[3]} borderRadius={8}>
            <Box mr={styles.space[4]}>
              <img src={logo} height={80} alt="footprint" />
            </Box>
            <Box>
              <Box>
                <Text
                  color={styles.colors.gray[3]}
                  fontSize={styles.fontSizes[4]}
                >
                  Your current carbon footprint:
                </Text>
              </Box>
              <Flex mt={styles.space[3]} alignItems="baseline">
                <Box>
                  <Text
                    color={styles.colors.gray[3]}
                    fontSize={styles.fontSizes[8]}
                  >
                    {formatNumber(footPrint)}
                  </Text>
                </Box>
                <Box ml={styles.space[2]}>
                  <Text
                    color={styles.colors.gray[3]}
                    fontSize={styles.fontSizes[3]}
                  >
                    Kg CO2e
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Grid>
        <Flex
          borderColor={styles.colors.gray[2]}
          borderRadius={5}
          borderStyle="solid"
          border={2}
        >
          <Flex
            flexDirection="column"
            p={styles.space[3]}
            bg={styles.colors.gray[2]}
          >
            <img src={info} height={32} alt="footprint" />
          </Flex>
          <Box p={styles.space[3]}>
            <Text color={styles.colors.gray[3]} fontSize={styles.fontSizes[1]}>
              The Carbon Footprint indicator measures how your blockchain
              transactions impact the environment.
            </Text>
          </Box>
        </Flex>
        <Box mt={styles.space[5]}>
          <Text
            color={styles.colors.gray[3]}
            fontSize={styles.fontSizes[4]}
            bold
          >
            Select the amount you want to offset:
          </Text>
        </Box>
        <Flex mt={styles.space[3]} alignItems="baseline">
          <Box>
            <Text color={styles.colors.gray[3]} fontSize={styles.fontSizes[8]}>
              {formatNumber((offsetPercentage * footPrint) / 100)}
            </Text>
          </Box>
          <Box ml={styles.space[2]}>
            <Text color={styles.colors.gray[3]} fontSize={styles.fontSizes[3]}>
              ({`${offsetPercentage} %`})
            </Text>
          </Box>
        </Flex>
        <Box mt={styles.space[3]}>
          <Slider
            value={offsetPercentage}
            trackStyle={{ backgroundColor: styles.colors.main }}
            handleStyle={{ borderColor: styles.colors.main }}
            onChange={onSliderChange}
            onAfterChange={onAfterChange}
          />
        </Box>
        <Box mt={styles.space[5]}>
          <Box>
            <Text
              color={styles.colors.gray[3]}
              fontSize={styles.fontSizes[3]}
              bold
            >
              Select a Beneficiary:
            </Text>
          </Box>
          <Box mt={styles.space[2]}>
            <Select
              value={beneficiary}
              onChange={onBeneficiarySelected}
              options={options}
            />
          </Box>
        </Box>
        <Box mt={styles.space[5]}>
          <Box>
            <Text color={styles.colors.gray[3]} fontSize={styles.fontSizes[2]}>
              You are sending:
            </Text>
          </Box>
          <Box mt={styles.space[3]}>
            <Flex flexDirection="row" alignItems="baseline">
              <Text
                color={styles.colors.gray[3]}
                fontSize={styles.fontSizes[8]}
              >
                {offsetAmount ? offsetAmount : '-'}
              </Text>
              <Box ml={styles.space[2]}>
                <Text
                  color={styles.colors.gray[3]}
                  fontSize={styles.fontSizes[2]}
                >
                  ETH
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box mt={styles.space[3]}>
          <Button onClick={sendOffset}>Send</Button>
        </Box>
      </Box>
    </Fragment>
  );
};
