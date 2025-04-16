const web3 = require("@solana/web3.js");
const fs = require("fs");

// Connect to local test validator
const connection = new web3.Connection("http://localhost:8899", "confirmed");

// Load your dummy keypair (the signer)
const secretKey = JSON.parse(fs.readFileSync("dummy.json", "utf8"));
const fromKeypair = web3.Keypair.fromSecretKey(Uint8Array.from(secretKey));

// Your deployed program's public key
const programId = new web3.PublicKey("9cquf8x7sV7YXNzRKpeVuizv7t8jqnPcnVmzh7fU866R"); // Change if needed

(async () => {
  console.log("Calling program...");

  // Create instruction (no data, no accounts)
  const instruction = new web3.TransactionInstruction({
    keys: [], // No accounts required
    programId,
    data: Buffer.alloc(0), // Empty instruction data
  });

  // Create and send transaction
  const tx = new web3.Transaction().add(instruction);
  const signature = await web3.sendAndConfirmTransaction(connection, tx, [fromKeypair]);

  console.log("✅ Transaction sent:", signature);
})();
