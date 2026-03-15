import { trpc } from "./src/trpc/server";

async function test() {
  const options = trpc.file.list.queryOptions();
  console.log("Query Key:", options.queryKey);
  console.log("Query Fn type:", typeof options.queryFn);
  
  if (options.queryFn) {
    try {
      // @ts-ignore
      const result = await options.queryFn();
      console.log("Result success");
    } catch (e) {
      console.error("Query Fn failed:", e);
    }
  }
}

test();
