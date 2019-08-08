const dialogflow = require('dialogflow');
const uuid = require('uuid');

//async function runSample(item) {

function getFulfillmentText(){
    const promise = new Promise((resolve, reject)=>{
        //Prepares request
        projectId = 'convoautomationbot-suqoya'
        const sessionId = uuid.v4();
        const credentials_path = "C:\\Users\\emoses007\\Documents\\Experiments\\nodejTest\\convoautomationbot-suqoya-589dc30cacf1.json"
        const sessionClient = new dialogflow.SessionsClient({
        projectId,
        keyFilename:credentials_path,
        });
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        const request = {
        session: sessionPath,
        queryInput: {
            text: {
            text: item,
            languageCode: 'en-US',
            },
        },
    }
    try {
        const response = sessionClient.detectIntent(request);
        console.log("BIG WHOOOOPPP", response);
        resolve(response)
    } catch (error) {
        console.log("BIG OOOFFFFF", error);
        reject(error)
    }
    // End of Promise
    });
    return promise
}
    
    // NEED A PROMISE INSTEAD OF AWAIT
    
    // console.log(responses);
    //return responses
    // 
    // const result = responses[0].queryResult;
    // const resultantList = await parseResult(result);
    // return resultantList
function parseResult(response){
    //var entries = Object.entries(response);
    // Declare variables at the top
    let parsedResult = {}
    const queryResult = response[0].queryResult;

    parsedResult.fulfillmentText = queryResult.fulfillmentText;
    parsedResult.intent = queryResult.intent.displayName;
    console.log(parsedResult);
    return parsedResult
    // Return an object since you don't need ordering
    // Use an array if you have like items

    //fulfillmentText = `${response.fulfillmentText}`;
    //intent = `${response.intent}`;
    //var fulfilledResponse = [intent, fulfillmentText]
    //return fulfilledResponse
}
// module.exports.main = function(){
function main(){
    item = "Can you open mobile t&e?";
    let fulfilledResponse = getFulfillmentText(item);
    fulfilledResponse.then(value=>{
        try{
            let list = parseResult(value);
        } catch(error){
            console.log(error);
        }
    });
    fulfilledResponse.catch(error=>{
        console.log(error);
    });
}
main()