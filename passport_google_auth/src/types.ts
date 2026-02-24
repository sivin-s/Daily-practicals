

declare global {
    namespace Express {  //  Notice: why we use 'namespace'. Because the Express is old one. Here we are merge new interface as a 'child'.
        interface User {
            id: string;
            displayName: string;
            emails?: { value: string }[];
            photos?: { value: string }[];
        }
    }
}