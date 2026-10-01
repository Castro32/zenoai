import { createAuthPlugin } from "@agent-native/core/server";

const accountDeletionPlugin = {
  id: "zeno-account-deletion",
  init: () => ({
    options: {
      user: {
        deleteUser: {
          enabled: true,
        },
      },
    },
  }),
};

export default createAuthPlugin({
  rootAuth: false,
  workspaceAppPublicPaths: ["/"],
  betterAuth: {
    plugins: [accountDeletionPlugin],
  },
});
