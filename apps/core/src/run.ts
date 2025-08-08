import { ConnectorOptions, ZendeskSourceOptions } from "src/types";
import { createZendeskConnector } from "./connectors/zendesk";

const zendeskConnectorOptions: ConnectorOptions<ZendeskSourceOptions<"users">> =
  {
    destination: {
      type: "zendesk",
      auth: {
        subDomain: "d3v",
        email: "later",
        token: "later",
      },
    },
    source: {
      type: "zendesk",
      options: {
        name: "users",
        auth: {
          subDomain: "d3v-matheus",
          email: "mpaula@aktienow.com",
          token: "",
        },
      },
    },
  };

const connector = createZendeskConnector(zendeskConnectorOptions);

async function run() {
  await connector.connect();
  const count = await connector.count();
  console.log(`Total users: ${count}`);
}

run().catch((error) => {
  console.error("Error running the connector:", error);
});
