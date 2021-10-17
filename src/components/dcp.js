export async function main(func, args) {
    const compute = require('dcp/compute');
    job.computeGroups = [{ joinKey: 'hackathon', joinSecret: 'dcp2021' }];
    const job = compute.for(args, func );
    const results = await job.exec();
    return Array.from(results);
}
require('dcp-client').init('https://scheduler.distributed.computer')