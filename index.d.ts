export declare const urlHandler: (targetPath: string) => string;
export declare const hostHandler: (targetHost: string) => string;
export declare const createUrl: (host: string, paths: any[]) => string;
export declare const addQueryAttacher: (url: string) => string;
export declare const parseQuery: (url: string) => {
    [key: string]: any;
};
export declare const addQuery: (url: string, queryObj: {
    [key: string]: any;
}) => string;