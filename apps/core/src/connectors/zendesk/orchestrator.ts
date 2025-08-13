// Fetch a batch of resources from some source (Connector Instance) paginates through results and publish "n" messages

import { Connector } from "../../types";
// G82koFwzNTCKrSfpRnnVsm3lE43vS9mJ9ryEGW8X
// import { publish, Queues } from "./queues/sqs";

export async function orchestrate<T>(source: Connector<T>) {
  source.connect();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let cursor: string | null = null;
  let page = 1;

  while (true) {
    const batch = await source.list({ cursor });
    const { items, meta, nextCursor } = batch;

    if (items.length === 0) break;

    console.log(`Fetched ${items.length} records from page ${page}`);

    page++;
    cursor = nextCursor;
    if (!meta.has_more) break;
  }
}
