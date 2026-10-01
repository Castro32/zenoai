import { createGetDb } from "@agent-native/core/db";
import { registerIdentityColumns } from "@agent-native/core/org";

import * as schema from "../drizzle/schema.js";

registerIdentityColumns([
  {
    table: "tasks",
    column: "created_by",
    emailChange: "retain",
    offboard: "retain",
    reason: "Task creator attribution remains with published work history.",
  },
  {
    table: "user_profiles",
    column: "email",
    emailChange: "rekey",
    offboard: "delete",
    reason: "Freelancer profiles belong to the signed-in account.",
  },
]);

export const getDb = createGetDb(schema);
export { schema };
