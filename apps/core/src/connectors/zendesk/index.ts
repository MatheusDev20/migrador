import {
  Connector,
  ConnectorOptions,
  ZendeskSourceOptions,
  ZendeskResourceTypeMap,
  ListResult,
  ListParams,
} from "src/types";
import axios, { AxiosInstance } from "axios";
import { buildLogger } from "@repo/logger";

import { resourceMap, ZendeskResourceConfig } from "./resources-map";
import { decode, encode } from "src/utils";

export function createZendeskConnector<T extends keyof ZendeskResourceTypeMap>(
  options: ConnectorOptions<ZendeskSourceOptions<T>>,
): Connector<ZendeskResourceTypeMap[T]> {
  let instance: AxiosInstance;
  const logger = buildLogger();
  const { source } = options;

  const { options: sourceOptions } = source;

  const resourceConfiguration: ZendeskResourceConfig =
    resourceMap[source.options.name];

  return {
    async connect() {
      instance = axios.create({
        baseURL: `https://${source.options.auth.subDomain}.zendesk.com/api/v2`,
        headers: {
          Authorization: `Basic ${Buffer.from(`${sourceOptions.auth.email}/token:${sourceOptions.auth.token}`).toString("base64")}`,
        },
      });
    },

    async disconnect() {},

    async count() {
      try {
        logger.info(
          `Counting records for resource: ${sourceOptions.name.toLocaleLowerCase()}`,
        );

        const res = await instance.get<{ count: number }>(
          `/${resourceConfiguration.path}`,
          { params: { per_page: 1 } },
        );

        return res.data.count;
      } catch (err) {
        logger.error(
          `Error counting records for resource ${sourceOptions.name}: ${err}`,
        );
        throw err;
      }
    },

    async list({
      limit = 100,
      cursor,
    }: ListParams): Promise<ListResult<ZendeskResourceTypeMap[T]>> {
      type C = { next?: string };

      const c = decode<C>(cursor);

      const url = c?.next ?? `/${resourceConfiguration.path}`;
      const res = await instance.get(url, {
        params: c?.next ? {} : { per_page: limit },
      });

      const items = res.data[
        resourceConfiguration.listField
      ] as ZendeskResourceTypeMap[T][];

      const next = res.data?.next_page as string | null | undefined;
      return {
        items,
        nextCursor: next ? encode({ next }) : undefined,
      };
    },
  };
}
