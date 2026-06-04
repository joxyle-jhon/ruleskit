import process from "node:process";

// Server-only configuration selector.
export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
  };
}
