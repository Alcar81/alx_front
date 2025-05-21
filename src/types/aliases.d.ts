// 📁 src/types/aliases.d.ts

declare module "@/config/config" {
  import config from "../config/config";
  export default config;
}

declare module "@/config/configSchema" {
  export * from "../config/configSchema";
}

declare module "@/mocks/mockConfigs" {
  import mockConfigs from "../mocks/mockConfigs";
  export default mockConfigs;
}
