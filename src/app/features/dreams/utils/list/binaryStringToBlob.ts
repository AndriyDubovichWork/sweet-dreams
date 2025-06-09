function binaryStringToBlob(binaryString:string, mimeType:string)    {
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
}
export default binaryStringToBlob;