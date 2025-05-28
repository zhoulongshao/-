import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UniHelperComponents from "@uni-helper/vite-plugin-uni-components";
import { WotResolver } from "@uni-helper/vite-plugin-uni-components/resolvers";

import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UniHelperComponents({
      resolvers: [WotResolver()],
      dts: "src/components.d.ts",
      directoryAsNamespace: true,
    }),
    uni(),
    AutoImport({
      imports: [
        "vue",
        "uni-app",
        {
          from: "uni-mini-router",
          imports: ["createRouter", "useRouter", "useRoute"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/stores"],
      vueTemplate: true,
    }),
  ],
});
