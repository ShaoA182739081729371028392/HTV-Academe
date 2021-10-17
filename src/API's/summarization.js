async function process() {
    let api_key = "f2809028934e58e16e73ca6107bebcbca5dae636";
    // Example directly sending a text string:

    const NLPCloudClient = require('nlpcloud');

    const client = new NLPCloudClient('bart-large-cnn', api_key)
    // Returns an Axios promise with the results.
    // In case of success, results are contained in `response.data`. 
    // In case of failure, you can retrieve the status code in `err.response.status` 
    // and the error message in `err.response.data.detail`.
    let output = await client.summarization(`One month after the United States began what has become a 
    troubled rollout of a national COVID vaccination campaign, the effort is finally 
    gathering real steam. Close to a million doses -- over 951,000, to be more exact -- 
    made their way into the arms of Americans in the past 24 hours, the U.S. Centers 
    for Disease Control and Prevention reported Wednesday. That s the largest number 
    of shots given in one day since the rollout began and a big jump from the 
    previous day, when just under 340,000 doses were given, CBS News reported. 
    That number is likely to jump quickly after the federal government on Tuesday 
    gave states the OK to vaccinate anyone over 65 and said it would release all 
    the doses of vaccine it has available for distribution. Meanwhile, a number 
    of states have now opened mass vaccination sites in an effort to get larger 
    numbers of people inoculated, CBS News reported.`)

    console.log(output);
}
process();