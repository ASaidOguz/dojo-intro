import manifest from '../contracts/manifest_dev.json' assert { type: 'json' };

const actionsContract = manifest.contracts.find((contract) => contract.tag === 'di-actions');
const VRF_PROVIDER_ADDRESS = '0x15f542e25a4ce31481f986888c179b6e57412be340b8095f72f75a328fbb27b';

const controllerOpts = {
  // Use the proxied path through your Vite server
  rpc: 'https://upgraded-funicular-r47v5g9gxpfxrvx-5173.app.github.dev/katana',
  
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