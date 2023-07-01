export const filtrarStringImg = (inputString:String)  => {
    const regex = /<img.*?src=["'](.*?)["']/;
    const match = inputString.match(regex);
    const src = match ? match[1] : null;
    return src;
}