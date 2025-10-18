import { RpcProvider, Account } from "starknet";
import {getCodespaceServiceUrl} from "./codespace-urlbuilder";

export async function getAccount() {
  // Katana RPC endpoint — must include protocol (http/https)
  const katanaRpcURL = getCodespaceServiceUrl(5050);

  // 1. Create provider
  const provider = new RpcProvider({ nodeUrl: katanaRpcURL });

  // 2. Katana pre-funded account
  const accountAddress = "0x0127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec"; 
  const privateKey = "0x0c5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912";

  // 3. Validation
  if (typeof accountAddress !== "string" || !accountAddress.startsWith("0x")) {
    throw new Error("Invalid or undefined account address");
  }
  if (typeof privateKey !== "string" || !privateKey.startsWith("0x")) {
    throw new Error("Invalid or undefined private key");
  }

  // 4. Create the Account instance
  const account = new Account({provider:provider, address:accountAddress,signer:privateKey});

  // 5. Optionally verify connection
  try {
    const chainId = await provider.getChainId();
    console.log("Connected to Katana chain:", chainId);
  } catch (err) {
    console.error("Failed to connect to Katana:", err);
  }

  return account;
}
