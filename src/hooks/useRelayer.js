import { useState, useEffect } from "react";
import { initSDK, createInstance, SepoliaConfig } from "@zama-fhe/relayer-sdk/bundle";

export function useRelayer(ethereum) {
  const [relayer, setRelayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initSDK();
        const config = { ...SepoliaConfig, network: ethereum };
        const instance = await createInstance(config);
        setRelayer(instance);
      } catch (err) {
        console.error("Failed to initialize Relayer SDK:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (ethereum) init();
  }, [ethereum]);

  return { relayer, loading, error };
}
