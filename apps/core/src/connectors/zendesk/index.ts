import { Connector, ZendeskConnectorOptions } from "src/types";
import axios, { AxiosInstance } from "axios";
import { buildLogger } from "@repo/logger";

import {
  resourceMap,
  ResourceName,
  ZendeskResourceConfig,
} from "./resources-map";

export function createZendeskConnector<R extends ResourceName, Entity>(
  opts: ZendeskConnectorOptions & { resource: R },
): Connector<Entity> {
  let instance: AxiosInstance;
  const logger = buildLogger();

  const resourceConfiguration: ZendeskResourceConfig =
    resourceMap[opts.resource];

  return {
    async connect() {
      instance = axios.create({
        baseURL: `https://${opts.subDomain}.zendesk.com/api/v2`,
        headers: {
          Authorization: `Basic ${Buffer.from(`${opts.email}/token:${opts.token}`).toString("base64")}`,
        },
      });
    },

    async disconnect() {},

    async fetchBatch() {
      logger.info(`Fetching batch for resource: ${opts.resource}`);
      // const res = await instance.get<{ [k: string]: any }>(
      //   `/${resourceConfiguration.path}`,
      //   { params: { per_page: 100 } },
      // );
      // const list = res.data[resourceConfiguration.listField] as Entity[];
      // return list;
      return [] as Entity[];
    },
  };
}
