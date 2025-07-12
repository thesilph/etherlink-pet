```
 _                 _    _      
| |__   __ _ _ __ | | _(_) ___ 
| '_ \ / _` | '_ \| |/ / |/ _ \
| |_) | (_| | | | |   <| |  __/
|_.__/ \__,_|_| |_|_|\_\_|\___|

        Etherlink Pet: Bankie
```
built chill, by silph <3

# Etherlink Pet: Bankie

Bankie is an on-chain NFT pet you can adopt, feed, and harvest rewards from. Each pet is unique, and you must care for it regularly or risk losing it forever!

---

## 🐾 Features

- **Adopt a Pet:** Pay the adoption fee to mint your own Bankie NFT.
- **Feed Your Pet:** Keep your pet alive by feeding it at least every 2 days.
- **Harvest Rewards:** After feeding your pet 100 times, you can harvest its "golden egg" (your money back).
- **Donation on Death:** If you forget to feed your pet for more than 2 days, it "runs away" and any unclaimed funds are donated to the protocol.

---

## 📝 Contract Functions

### `adopt(address player, string tokenURI)`
Adopt a new Bankie pet by paying the required adoption price. The NFT is minted to the specified address with the given metadata URI.

### `feedPet(uint256 tokenId)`
Feed your pet to keep it alive. You must feed it at least once every 2 days. If you forget, the pet "runs away" and any unclaimed rewards are donated to the protocol.

### `layGoldenEgg(uint256 tokenId)`
After feeding your pet 100 times, you can harvest its accumulated rewards.

### `withdraw()`
The contract owner can withdraw accumulated protocol profits (from adoption fees and unclaimed funds).

---

## 💸 Pet Lifecycle

1. **Adoption:** Pay the adoption fee to mint a new Bankie NFT.
2. **Care:** Feed your pet at least every 2 days to keep it alive.
3. **Harvest:** After 100 feedings, harvest your pet's rewards.
4. **Neglect:** If you fail to feed your pet for 2 days, it "runs away" and any unclaimed funds are donated to the protocol.

---

## 🚀 Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Run Tests

```sh
npx hardhat test
```

### 3. Deploy to Local Network

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

### 4. Deploy to Testnet/Mainnet

Update your `hardhat.config.ts` with the correct network and run:

```sh
npx hardhat run scripts/deploy.ts --network <network>
```

---

## 📁 Project Structure

- `contracts/Bankie.sol` — Main smart contract
- `test/Bankie.ts` — Hardhat/Chai test suite
- `scripts/deploy.ts` — Deployment script

---

## 🧑‍💻 Contributing

Feel free to open issues or PRs to improve Bankie!

---

##