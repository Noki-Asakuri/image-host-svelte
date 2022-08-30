export const genID = (fileExt: string, author: string, baseUrl: string, length = 20) => {
    let imageID = "";
    let invisibleID = "";

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const invisibleChars = "​​‌‍⁠";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        imageID += characters.charAt(Math.floor(Math.random() * charactersLength));
        invisibleID += invisibleChars.charAt(Math.floor(Math.random() * invisibleChars.length));
    }

    const file = `${imageID}.${fileExt}`;
    const path = `${author.split("#")[0]}/${imageID}.${fileExt}`;
    const publicUrl = `${baseUrl}${path}`;

    return { imageID, invisibleID, file, path, publicUrl };
};
