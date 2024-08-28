const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  console.log("Hi Solidity");
  // http://127.0.0.1:7545
  // EtherJS : https://docs.ethers.org/v6/
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, Please Wait...");
  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(1);
  // 2.4.5交易过程和交易回执
  // const deployementReceipt = await contract.deploymentTransaction().wait(1);
  // console.log("Here is deployment transaction:");
  // console.log(contract.deploymentTransaction());
  // console.log("Here is deployment receipt:");
  // console.log(deployementReceipt);

  // 2.4.6发送交易内容,发送raw交易
  // console.log("let's deploy with only transaction data!");
  // const nonce = await wallet.getNonce();//用于生成合约ID
  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null, // 创建合约
  //   value: 0, // 创建合约
  //   // SimpleStorage.sol 的二进制文件内容（前加0）
  //   data: "0x...",
  //   chainId: 1337,
  // };

  // // const signEdTxResponse = await wallet.signTransaction(tx);
  // // console.log(signEdTxResponse);

  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);

  // 2.4.7 通过etherjs与合约交互
  // console.log(contract);
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number:${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store("7");
  const trsnactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number:${updatedFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
