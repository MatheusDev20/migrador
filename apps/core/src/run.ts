import { ConnectorOptions, ZendeskSourceOptions } from "src/types";
import { createZendeskConnector } from "./connectors/zendesk";
import { orchestrate } from "./connectors/zendesk/orchestrator";

const ticketsConnector: ConnectorOptions<ZendeskSourceOptions<"tickets">> = {
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
      name: "tickets",
      auth: {
        subDomain: "d3v-matheus",
        email: "mpaula@aktienow.com",
        token: "token",
      },
    },
  },
};

const connector = createZendeskConnector(ticketsConnector);

async function run() {
  orchestrate(connector);
}

run().catch((error) => {
  console.error("Error running the connector:", error);
});
