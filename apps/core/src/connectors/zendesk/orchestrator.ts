// Fetch a batch of resources from some source (Connector Instance) paginates through results and publish "n" messages

import { Connector } from "../../types";

// import { publish, Queues } from "./queues/sqs";

export async function orchestrate<T extends any[]>(source: Connector<T>) {
  let page = 1;

  while (true) {
    const batch = await source.list({ cursor: null, limit: 100 });
    const { items, nextCursor } = batch;

    if (items.length === 0) break;

    console.log(`Fetched ${items.length} records from page ${page}`);

    page++;
    if (nextCursor === null) break;
  }
}
