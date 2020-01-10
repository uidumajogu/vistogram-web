
export const AuthCode = length => {
    let code = "";
    let result = "";
    let chuncks = "";
    let char = "3456789ABCDEFGHJMNPRSTUVWXZ";
    for (var i = 0; i < length - 13; i++) {
          result += char[Math.floor(Math.random() * char.length)];
      }
    
    chuncks = (Date.now()+result).match(/.{1,4}/g);
    code = chuncks.join("-");
    return code;
  }


export const VistocodeSKU = length => {
    let result = "";
    let char = "8MNPRS5GHJ6ABCDEFTUVW79XZ34";
    for (var i = 0; i < length; i++) {
          result += char[Math.floor(Math.random() * char.length)];
      }
    return result;
  }