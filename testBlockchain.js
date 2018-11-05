const BlockchainClasses = require('./simpleChain.js');

const Block = BlockchainClasses.Block;
const Blockchain = BlockchainClasses.Blockchain;


//add "i" blocks to chain
async function createChain(n) {
  let newBlock = new Block("Test Block - " + (n + 1));
  await blockchain.addBlock(newBlock);
  if (n < 10) {
    await createChain(n+1);
  }
}


//print chain
async function printChain(n) {
  let val = await blockchain.getBlock(n);
  console.log(val);
  if (n < 10) {
    await printChain(n+1);
  }
}

async function modifyBlock() {
  const key = 1;
  let block = await blockchain.getBlock(key);
  block.body = "Modified Data";
  await blockchain.putBlock(key, block);
}
/*=====  Testing the functionality =========================|
| add 10 new blcoks to chain                                |
| print the chain value                                     |
| validate chain                                            |
| modify data in block 1                                    |
| revalidate chain                                          |
|+=====  Testing the functionality ========================*/

//init block chain with genesis block
const blockchain = new Blockchain();

setTimeout(async () => {
  await createChain(0);
  console.log('');
  console.log('Block chain created');
  console.log('');
  console.log('Printing block chain data...');
  console.log('');
  await printChain(0);
  console.log('');
  console.log('Validating blockchain....');
  console.log('');
  await blockchain.validateChain();
  console.log('');
  console.log('Modifying data in block 1...');
  console.log('data before modification...');
  console.log(await blockchain.getBlock(1));
  console.log('');
  await modifyBlock();
  console.log("data after modification...");
  console.log(await blockchain.getBlock(1));
  console.log('');
  console.log('Validating blockchain after modification...')
  await blockchain.validateChain();
}, 10000);

