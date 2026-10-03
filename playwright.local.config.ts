import { defineConfig } from "@playwright/test";
import deployedConfig from "./playwright.config";

export default defineConfig({
	...deployedConfig,
	use: { ...deployedConfig.use, baseURL: "http://127.0.0.1:3000" },
	webServer: {
		command: "pnpm run dev --hostname 127.0.0.1 --port 3000",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: false,
	},
});
