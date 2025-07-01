declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: string;
        readonly JWT_SECRET: string;
        readonly MONGODB_URI: string;
    }
}