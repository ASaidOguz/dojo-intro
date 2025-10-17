use crate::systems::actions::Source;
use starknet::ContractAddress;


#[starknet::interface]
trait IVrfProvider<T> {
    fn request_random(self: @T, caller: ContractAddress, source: Source);
    fn consume_random(ref self: T, source: Source) -> felt252;
}
#[dojo::contract]
pub mod mock_vrf {
    use super::*;
    #[storage]
    pub struct Storage {}

    #[abi(embed_v0)]
    impl MockVrfImpl of IVrfProvider<ContractState> {
        fn request_random(self: @ContractState, caller: ContractAddress, source: Source) {
            // no-op
        }

        fn consume_random(ref self: ContractState, source: Source) -> felt252 {
           // return fixed value :) awesome entrophy
            let res=(1337_u256 % 4).try_into().unwrap();
            res
        }
    }
}
