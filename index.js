const {Handleatcodercode} = require('./atcoder');
const {HandleGFGcode}=require('./GeeksForGeeks');

(async () => {
  const {linkGFG,timeGFG,nameGFG} =await HandleGFGcode()
  const { linkatcoder, nameatcoder, timeatcoder } = await Handleatcodercode();
  console.log(linkatcoder, nameatcoder, timeatcoder);
  console.log(linkGFG,timeGFG,nameGFG)
})();