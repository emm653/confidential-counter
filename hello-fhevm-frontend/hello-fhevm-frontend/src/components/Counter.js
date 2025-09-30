import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ConfidentialCounterABI from "../abis/ConfidentialCounter.json";
import { initSDK, createInstance, SepoliaConfig } from "@zama-fhe/relayer-sdk/bundle";

const CONTRACT_ADDRESS = "0x91c5a918a9f056ce9596959e5ab15ffa474a73ff";

function Counter() {
  const [relayer, setRelayer] = useState(null);
  const [encryptedCounter, setEncryptedCounter] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const init = async () => {
      await initSDK(); // load TFHE WASM
      const instance = await createInstance({ ...SepoliaConfig, network: window.ethereum });
      setRelayer(instance);
    };
    init();
  }, []);

  const getCounter = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ConfidentialCounterABI.abi, provider);
    const value = await contract.getEncryptedCounter();
    setEncryptedCounter(value.toString());
  };

  const updateCounter = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    if (!relayer) return alert("Relayer not initialized!");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ConfidentialCounterABI.abi, signer);

    
      const encrypted = await relayer.setEncryptedCounter(inputValue, "uint256");

      const tx = await contract.updateCounter(encrypted);
      await tx.wait();
      alert("Counter updated confidentially!");
    } catch (err) {
      console.error("Failed to update counter:", err);
      alert("Failed to update counter");
    }
  };

  return (
    <div>
      <h2>Confidential Counter</h2>
      <p>Encrypted Counter Value: {encryptedCounter}</p>

      <input
        type="number"
        placeholder="Enter new value"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={updateCounter}>Update Counter Confidentially</button>
      <button onClick={getCounter}>Get Encrypted Counter</button>
    </div>
  );
}

export default Counter;
