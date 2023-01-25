export const decodeB64 = (str: string):string => Buffer.from(str, 'base64').toString('binary');
export const encodeB64 = (str: string):string => Buffer.from(str, 'binary').toString('base64');
