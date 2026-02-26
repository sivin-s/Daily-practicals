import mongoose from 'mongoose';

declare global {
    namespace Express {
        interface User { // user is express child
            _id: mongoose.Types.ObjectId;   // MongoDB document ID
            googleId: string;               // Google OAuth ID
            displayName: string;
            accessToken?: string | null;
            refreshToken?: string | null;
            defaultSpreadSheetId?: string | null;  // saved sheet ID
            sheetRange?: string | null;             // saved sheet range
        }
    }
}

export { }; // make this a module so the global augmentation works
