
import { ZendeskUser } from "src/types";
import { createZendeskConnector } from "./connectors/zendesk";

const connector = createZendeskConnector<"users", ZendeskUser>({
  email: "teste@mail",
  subDomain: "d3v-matheus",
  token: "test-it",
  resource: "users",
});

async function run() {
  await connector.connect();
  await connector.fetchBatch();
}

run().catch((error) => {
  console.error("Error running the connector:", error);
});
