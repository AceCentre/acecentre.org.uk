const { createApiClient } = require("dots-wrapper");

const RETENTION_DAYS = 7;
const NAME_PREFIX = "github_generated_snapshot";

const backupDroplet = async (id) => {
  const dots = createApiClient({ token: process.env.DO_TOKEN });
  const {
    data: { snapshots },
  } = await dots.droplet.listDropletSnapshots({ droplet_id: id });

  console.log("");
  console.log("ALL SNAPSHOTS");
  console.log(snapshots);
  console.log("");

  let oldSnapshots = snapshots.filter((snapshot) => {
    let createdAt = new Date(snapshot.created_at);
    let currentDate = new Date();

    let dateDiffMs = currentDate - createdAt;
    let dateDiffDays = Math.round(Math.abs(dateDiffMs / (24 * 60 * 60 * 1000)));

    console.log(snapshot.name, dateDiffDays);

    return dateDiffDays > RETENTION_DAYS;
  });

  console.log("");
  console.log("OUT OF DATE SNAPSHOTS");
  console.log(oldSnapshots);

  const snapshotsToDelete = oldSnapshots.filter((snapshot) => {
    return snapshot.name.includes(NAME_PREFIX);
  });

  console.log("");
  console.log("SNAPSHOTS TO DELETE");
  console.log(snapshotsToDelete);

  for (const snapshot of snapshotsToDelete) {
    console.log("");
    console.log("DELETING", snapshot.id, snapshot.name);
    const { status } = await dots.snapshot.deleteSnapshot({
      snapshot_id: snapshot.id,
    });
    console.log("DELETED", status);
  }

  console.log("CREATE NEW SNAPSHOT");
  const {
    data: { action },
  } = await dots.droplet.snapshotDroplet({
    droplet_id: id,
    name: `${NAME_PREFIX}_${Date.now()}`,
  });
  console.log("Result", action);

  console.log("");
  console.log("=============================================");
  console.log("");
};

const script = async () => {
  await backupDroplet(335294617);
  await backupDroplet(402491167);
};

module.exports = script;
