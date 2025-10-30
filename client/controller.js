import manifest from '../contracts/manifest_sepolia.json' assert { type: 'json' };

const actionsContract = manifest.contracts.find((contract) => contract.tag === 'di-actions');
const VRF_PROVIDER_ADDRESS = '0x051fea4450da9d6aee758bdeba88b2f665bcbf549d2c61421aa724e9ac0ced8f';

const controllerOpts = {
  // Use the proxied path through your Vite server
  chains: [{ rpcUrl: 'https://api.cartridge.gg/x/starknet/sepolia' }],
  // "KATANA"
  defaultChainId: '0x534e5f5345504f4c4941',
  policies: {
    contracts: {
      [actionsContract.address]: {
        name: 'Actions',
        description: 'Actions contract for player movement',
        methods: [
          {
            entrypoint: 'spawn',
          },
          {
            entrypoint: 'move',
          },
          {
            entrypoint: 'move_random',
          },
        ],
      },
      [VRF_PROVIDER_ADDRESS]: {
        methods: [
          { 
            entrypoint: 'request_random' 
          }
        ],
      },
    },
  },
};

export default controllerOpts;