import type { Config } from "vike/types";
import vikeVue from "vike-vue/config";

const config: Config = {
    title: "NKVTD",
    server: true,
    ssr: true,

    extends: [vikeVue],
};

export default config;
