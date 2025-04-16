import NodeCache from "node-cache";

// TTL: 7200 seconds (2 hours)
const cache = new NodeCache({ stdTTL: 7200 });

export default cache;