import express, { type NextFunction, type Request, type Response } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getGoogleSheetData } from '../services/googleSheetsService.js';
import User from '../models/User.js';
import { filterUnCompletedOnes } from '../helper/filterUncompletedOnes.js';


const sheetRouter = express.Router();


sheetRouter.get('/save-sheet', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    // TODO: change this to a form (post)
    try {
        // dashboard form submit.
        // TODO: Extract the spreadsheetId and range from the form (url)
        // TODO: Extract the sheet name also
    
        const userId = req.user!._id;

        const temp_url = "https://docs.google.com/spreadsheets/d/1l5kbr6AokdCyHhcHbxI-snp92y-MxK9YkRxLVKdSkjE/edit?gid=800067380#gid=800067380"


        // Note:  if the sheet name space is present '' is needed eg: "'habit trackers'!A2:AA29"
        //  if it isn't   'Sheet1!A2:AA30' and '!' is name along with ranges.

        //  id extract from url
         const spreadsheetIdMatch = temp_url.match(/\/d\/([a-zA-Z0-9-_]+)/);
         const sheetRange =  "'Habit Tracker'!A1:AA29"
        //  console.log("spreadsheetIdMatch > ",spreadsheetIdMatch[1])
        //  console.log("sheetRange > ",sheetRange)

        // const { spreadsheetId, range } = req.body;  // user sends ID in the body
        // if (!spreadsheetId) {
        //     return res.status(400).send("Spreadsheet ID is required")
        // }
        // update the user in the Database
      const d =   await User.findByIdAndUpdate(userId, {
            defaultSpreadSheetId: spreadsheetIdMatch ? spreadsheetIdMatch[1] : '',
            sheetRange: sheetRange
        },{new:true})
      console.log("ids.... > ",d)
        res.json({ message: 'Spreadsheet ID saved successfully!!!' })
    } catch (error) {
        next(error)
    }
})

sheetRouter.get('/data', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!._id;
        if (!userId) {
            return res.status(400).send("userId is missing!!")
        }
        const user = await User.findById(userId)
        console.log("user from /data > ", user)
        if (!user) {
            return res.status(404).send("User not found!!")
        }

        const { defaultSpreadSheetId, sheetRange } = user;

        if (!defaultSpreadSheetId) {
            return res.status(400).send("Spreadsheet ID is required. Please use /api/save-sheet endpoint first")
        }

        if (!sheetRange) {
            return res.status(400).send("Sheet range is required. Please use /api/save-sheet endpoint first")
        }

        const data = await getGoogleSheetData(userId.toString(), defaultSpreadSheetId, sheetRange)
        const reShapedData =    filterUnCompletedOnes(data)

        return res.status(200).json(reShapedData)
    } catch (error) {
        next(error)
    }
})



export default sheetRouter