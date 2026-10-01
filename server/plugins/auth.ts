import { createAuthPlugin } from "@agent-native/core/server";

export default createAuthPlugin({
  rootAuth: false,
  workspaceAppPublicPaths: ["/"],
});
