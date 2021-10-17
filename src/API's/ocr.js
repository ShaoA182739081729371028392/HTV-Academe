async function detect(){
    const vision = require('@google-cloud/vision');
    let text = ''
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';

    // Performs text detection on the local file

    const request = {
        image: {
        content: Buffer.from(text, 'base64')
        }
    };

    const [result] = await client.textDetection(request);
    console.log(result.textAnnotations);
    console.log(result.fullTextAnnotation);
}
detect();