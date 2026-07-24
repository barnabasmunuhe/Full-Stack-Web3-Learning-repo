# What we are making?
-minimal HTML&JS site
-has the following buttons which map to the solidity smart contract
.Connect✅
.Buy Coffee✅
-call a function on a smart contract✅
-Have a test blockchain that we can call!✅
.Get Balance✅
.Withdraw
-Typescript(superset for js)- Adds strong typing mechanisms.
.websites read javaScript NOT typescript.
.A work around for that is to write in jtypescript, compile to javascript the use that file.
.pnpm tsc index-ts.ts -> compiles the file into index-ts.js






## Files Notes
.fundme-anvil.json -> Represents the entire state of a fake blockchain with our fundme contract deployed to it.
-You can now run a blockchain node connected to the fundme-anvil.json file and get a dummy blockchain that gets populated with the contract already deployed to it.
-Install anvil through foundrybook documentation
-Add a custom network to connect to the local anvil blockchain
-Populate anvil with the contents of the fundme-anvil.json by running
            anvil --load-state fundme-anvil.json