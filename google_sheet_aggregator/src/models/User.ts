import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: true,
        unique: true
    },
    displayName: String,
    accessToken: String,
    refreshToken: String,
    defaultSpreadSheetId:{ // sheet
        type: String,
        default: null
    },
    sheetRange:{
        type: String,
        default: null
    }
})

export default mongoose.model('User', UserSchema)