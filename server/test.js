const { MongoClient } = require("mongodb");

const uri =
  "mongodb://harshshrivastav594_db_user:aryan123@ac-tkf4isf-shard-00-00.d2wodfh.mongodb.net:27017,ac-tkf4isf-shard-00-01.d2wodfh.mongodb.net:27017,ac-tkf4isf-shard-00-02.d2wodfh.mongodb.net:27017/?ssl=true&replicaSet=atlas-a7cy8p-shard-0&authSource=admin&appName=Cluster1";

const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("✅ Native driver connected!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();