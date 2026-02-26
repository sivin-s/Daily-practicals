import {google} from 'googleapis';

import User from '../models/User.js';

export const getGoogleSheetData = async (userId: string, spreadsheetId: string, range: string)=>{
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK_URL
    )
    // DB
    const user = await User.findById(userId);
    console.log("user from get sheets > ", user)
    if(!user) throw new Error("user not found");

    // set the credentials (access + refresh)
    oauth2Client.setCredentials({  
        // Notice: Providing refresh_token here allows the library to auto-refresh
        access_token: user.accessToken,
        refresh_token: user.refreshToken
    } as any)

    // Magic: Listen for the tokens event
    // This event fires automatically if the library refreshes the token
    oauth2Client.on("tokens", async(tokens)=>{
        if(tokens.access_token){
            console.log("auto-refreshed token received!")
            user.accessToken = tokens.access_token;
            await user.save();  // save new access token to DB
        }
        if(tokens.refresh_token){
            user.refreshToken = tokens.refresh_token;
            await user.save();
        }
    });

    // initialize sheets
    const sheets = google.sheets({version: "v4", auth: oauth2Client})
    // fetch data
    // if the access_token is expired, the library will: 
       // Detect the expiry
       // Automatically call google to refresh (using refresh_token)
       // Trigger the 'token' event above (to save to DB)
       // Retry the request with the new token

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    })
    // console.log(response.data.majorDimension)
    // console.log(response.data.range)
    return response.data.values
}