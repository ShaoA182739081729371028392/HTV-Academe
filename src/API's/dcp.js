async function activate_dcp(func, args) {
    const { init } = require('dcp-client');

    await init('https://scheduler.distributed.computer');
    const compute = require('dcp/compute');

    const job = compute.for(args, func);
    const results = await job.exec();
    console.log(Array.from(results));
    
}