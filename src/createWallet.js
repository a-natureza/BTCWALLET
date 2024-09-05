const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definir a rede Testnet
const network = bitcoin.networks.testnet;

// Caminho de derivação para P2PKH (Pay-to-PubKey-Hash)
const path = `m/49'/1'/0'/0`;

// Criar o mnemonic e seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criar a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Derivar a conta e o nó
let account = root.derivePath(path);
let node = account.derive(0);

// Gerar o endereço P2PKH
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço P2PKH: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);

// Gerar o endereço SegWit (opcional)
let segwitAddress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Endereço SegWit: ", segwitAddress);
