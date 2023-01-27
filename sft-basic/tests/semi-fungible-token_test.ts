import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types,
} from "https://deno.land/x/clarinet@v1.0.3/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";
const errorInsufficientBalance = 101;
const errorInvalidSender = 102;
const contractName = "semi-fungible-token";
const transferFn = "transfer";
const transferManyFn = "transfer-many";
const transferMemoFn = "transfer-memo";
const transferManyMemoFn = "transfer-many-memo";
const craftingFn = "craft-item";
const levelUpFn = "level-up";
const acquisitionFn = "buy-item";
const getBalance = "get-balance";
const getOverallBalance = "get-overall-balance";
const getOverallSupply = "get-overall-supply";
const getDecimals = "get-decimals";
const getCraftingResources = "get-crafting-resources";
const getLevelUpResources = "get-level-up-resources";
const getAcquisitionResources = "get-acquisition-resources";
const mint = "mint";
const getTokenURI = "get-token-uri";
const setTokenURI = "set-token-uri";
const getTokenName = "get-token-name";
const setTokenName = "set-token-name";
const setLvlUpRes = "set-level-up-resources";
const setCraftingRes = "set-crafting-resources";
const setAcqRes = "set-acquisition-resources";
const setFightRes = "set-fight-needed-resources";
const setFightRewards = "set-fight-rewards";
const setSleepingRewards = "set-sleeping-rewards";
const startFight = "start-fight";
const rewardFighting = "reward-fighting";
const rewardSleeping = "reward-sleeping";
const gold = "1";
const energy = "2";
const wood = "3";
const iron = "4";
const woodenSword1 = "5";
const woodenSword2 = "6";
const woodenSword3 = "7";
const ironSword1 = "8";
const ironSword2 = "9";
const ironSword3 = "10";
const enhancedSword1 = "11";
const enhancedSword2 = "12";
const enhancedSword3 = "13";
const woodenArmor1 = "14";
const woodenArmor2 = "15";
const woodenArmor3 = "16";
const ironArmor1 = "17";
const ironArmor2 = "18";
const ironArmor3 = "19";
const enhancedArmor1 = "20";
const enhancedArmor2 = "21";
const enhancedArmor3 = "22";
const woodenShield1 = "23";
const woodenShield2 = "24";
const woodenShield3 = "25";
const ironShield1 = "26";
const ironShield2 = "27";
const ironShield3 = "28";
const enhancedShield1 = "29";
const enhancedShield2 = "30";
const enhancedShield3 = "31";
const woodenHelmet1 = "32";
const woodenHelmet2 = "33";
const woodenHelmet3 = "34";
const ironHelmet1 = "35";
const ironHelmet2 = "36";
const ironHelmet3 = "37";
const enhancedHelmet1 = "38";
const enhancedHelmet2 = "39";
const enhancedHelmet3 = "40";
const woodenShoes1 = "41";
const woodenShoes2 = "42";
const woodenShoes3 = "43";
const ironShoes1 = "44";
const ironShoes2 = "45";
const ironShoes3 = "46";
const enhancedShoes1 = "47";
const enhancedShoes2 = "48";
const enhancedShoes3 = "49";

Clarinet.test({
  name: "Crafting Case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron shield

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    let balanceIron = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(admin.address)],
      admin.address
    );
    let balanceWood = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes1), types.principal(admin.address)],
      admin.address
    );

    balanceIron.result.expectOk().expectUint(0);
    balanceWood.result.expectOk().expectUint(0);
    balanceWoodenSword1.result.expectOk().expectUint(1);
    balanceIronSword1.result.expectOk().expectUint(1);
    balanceWoodenArmor1.result.expectOk().expectUint(1);
    balanceIronArmor1.result.expectOk().expectUint(1);
    balanceWoodenShield1.result.expectOk().expectUint(1);
    balanceIronShield1.result.expectOk().expectUint(1);
    balanceWoodenHelmet1.result.expectOk().expectUint(1);
    balanceIronHelmet1.result.expectOk().expectUint(1);
    balanceWoodenShoes1.result.expectOk().expectUint(1);
    balanceIronShoes1.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Level up case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword3.result.expectOk().expectUint(1);
    let balanceIronSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword3.result.expectOk().expectUint(1);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3.result.expectOk().expectUint(1);
    let balanceIronArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor3.result.expectOk().expectUint(1);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // // craft enhancedArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 18

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 36);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 19

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 20

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 21

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 22

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 44);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 23

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 24

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 48);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 49);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShield3.result.expectOk().expectUint(1);
    let balanceIronShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShield3.result.expectOk().expectUint(1);

    // mint 25

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 50);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 51);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 26

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 52);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 53);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 27

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 54);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 55);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 28

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 56);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 57);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 29

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 58);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 59);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 30

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 60);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 61);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 31

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 62);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 63);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 32

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 64);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 65);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 33

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 66);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 67);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenHelmet3.result.expectOk().expectUint(1);
    let balanceIronHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceIronHelmet3.result.expectOk().expectUint(1);

    // mint 34

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 68);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 69);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 35

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 70);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 71);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 36

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 72);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 73);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 37

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 74);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 75);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 38

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 76);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 77);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 39

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 78);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 79);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 40

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 80);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 81);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 41

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 82);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 83);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 42

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 84);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 85);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShoes3.result.expectOk().expectUint(1);
    let balanceIronShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShoes3.result.expectOk().expectUint(1);

    // mint 43

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 86);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 87);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 44

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 88);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 89);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 45

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 90);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 91);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Acquisition case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(40), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(400), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(670), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(370), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(25), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(120), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Crafting with more resources case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // mint phase

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron sword 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);

    // craft iron shield 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    let balanceGold = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(admin.address)],
      admin.address
    );
    let balanceEnergy = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(admin.address)],
      admin.address
    );
    let balanceIron = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(admin.address)],
      admin.address
    );
    let balanceWood = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes1), types.principal(admin.address)],
      admin.address
    );

    balanceGold.result.expectOk().expectUint(9999);
    balanceEnergy.result.expectOk().expectUint(9999);
    balanceIron.result.expectOk().expectUint(9986);
    balanceWood.result.expectOk().expectUint(9986);
    balanceWoodenSword1.result.expectOk().expectUint(1);
    balanceIronSword1.result.expectOk().expectUint(1);
    balanceWoodenArmor1.result.expectOk().expectUint(1);
    balanceIronArmor1.result.expectOk().expectUint(1);
    balanceWoodenShield1.result.expectOk().expectUint(1);
    balanceIronShield1.result.expectOk().expectUint(1);
    balanceWoodenHelmet1.result.expectOk().expectUint(1);
    balanceIronHelmet1.result.expectOk().expectUint(1);
    balanceWoodenShoes1.result.expectOk().expectUint(1);
    balanceIronShoes1.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Level up with more resources case ",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // mint phase

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword3.result.expectOk().expectUint(1);

    let balanceIronSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword3.result.expectOk().expectUint(1);

    // craft enhancedSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3.result.expectOk().expectUint(1);

    let balanceIronArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor3.result.expectOk().expectUint(1);

    // // craft enhancedArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShield3.result.expectOk().expectUint(1);

    let balanceIronShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShield3.result.expectOk().expectUint(1);

    // craft enhancedShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenHelmet3.result.expectOk().expectUint(1);

    let balanceIronHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceIronHelmet3.result.expectOk().expectUint(1);

    // craft enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 36);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 44);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShoes3.result.expectOk().expectUint(1);

    let balanceIronShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShoes3.result.expectOk().expectUint(1);

    // craft enhancedShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Acquisition with more resources case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Crafting with less resources case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // NO MINT == NO RESOURCE AT ALL

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NOT ENOUGH

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron sword 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NONE OF THE OTHERS

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [
          types.uint(woodenSword3),
          types.uint(2),
          types.principal(admin.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // try crafting enhanced sword 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // MINT TWO RESOURCES NONE OF THE THIRD

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [
          types.uint(woodenArmor3),
          types.uint(1),
          types.principal(admin.address),
        ],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironArmor3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // try crafting enhanced armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron shield

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    let balanceIron = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(admin.address)],
      admin.address
    );
    let balanceWood = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceEnhancedSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceEnhancedArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedArmor1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet1), types.principal(admin.address)],
      admin.address
    );
    let balanceWoodenShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes1), types.principal(admin.address)],
      admin.address
    );
    let balanceIronShoes1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes1), types.principal(admin.address)],
      admin.address
    );

    balanceIron.result.expectOk().expectUint(2);
    balanceWood.result.expectOk().expectUint(0);
    balanceWoodenSword1.result.expectOk().expectUint(0);
    balanceIronSword1.result.expectOk().expectUint(0);
    balanceEnhancedSword1.result.expectOk().expectUint(0);
    balanceWoodenArmor1.result.expectOk().expectUint(1);
    balanceIronArmor1.result.expectOk().expectUint(1);
    balanceEnhancedArmor1.result.expectOk().expectUint(0);
    balanceWoodenShield1.result.expectOk().expectUint(1);
    balanceIronShield1.result.expectOk().expectUint(1);
    balanceWoodenHelmet1.result.expectOk().expectUint(1);
    balanceIronHelmet1.result.expectOk().expectUint(1);
    balanceWoodenShoes1.result.expectOk().expectUint(1);
    balanceIronShoes1.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Level up with less resources case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // NO MINT == NO RESOURCE

    // craft woodenSword1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NONE OF THE OTHER 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT TWO RESOURCES NONE OF THE OTHER

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NOT ENOUGH

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // intermediate balance check

    let balanceWoodenSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword3.result.expectOk().expectUint(0);
    let balanceIronSword3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword3.result.expectOk().expectUint(0);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [
          types.uint(woodenSword3),
          types.uint(1),
          types.principal(admin.address),
        ],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironSword3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3.result.expectOk().expectUint(1);
    let balanceIronArmor3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor3.result.expectOk().expectUint(1);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // // craft enhancedArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 18

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 36);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 19

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 20

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 21

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 22

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 44);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 23

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 24

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 48);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 49);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShield3.result.expectOk().expectUint(1);
    let balanceIronShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShield3.result.expectOk().expectUint(1);

    // mint 25

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 50);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShield1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedShield1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 51);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 26

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 52);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 53);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 27

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 54);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 55);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 28

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 56);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 57);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 29

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 58);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 59);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 30

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 60);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 61);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 31

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 62);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 63);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 32

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 64);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 65);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 33

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 66);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 67);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenHelmet3.result.expectOk().expectUint(1);
    let balanceIronHelmet3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironHelmet3), types.principal(admin.address)],
      admin.address
    );
    balanceIronHelmet3.result.expectOk().expectUint(1);

    // mint 34

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 68);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 69);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 35

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 70);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 71);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 36

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 72);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 73);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 37

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 74);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 75);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 38

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 76);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 77);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 39

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 78);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 79);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 40

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 80);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 81);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 41

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 82);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 83);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 42

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 84);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 85);
    block.receipts[0].result.expectOk().expectBool(true);

    // intermediate balance check

    let balanceWoodenShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenShoes3.result.expectOk().expectUint(1);
    let balanceIronShoes3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShoes3), types.principal(admin.address)],
      admin.address
    );
    balanceIronShoes3.result.expectOk().expectUint(1);

    // mint 43

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 86);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShoes1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedShoes1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 87);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 44

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 88);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 89);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 45

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 90);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // level up enhancedShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(enhancedShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 91);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Acquisition with less resources case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    // NO MINT == NO RESOURCE

    // buy woodenSword1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NOT THE OTHER

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT 2 RESOURCE EACH ONE NOT ENOUGH

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(19), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NONE OF THE OTHER 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // MINT TWO RESOURCES NONE OF THE OTHER

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(400), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShield3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(670), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // buy enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedShield2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenHelmet3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironHelmet2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(370), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // buy enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedHelmet1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(25), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(120), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenShoes3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironShoes2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Getter read only functions test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;

    let craftingNoneList = [
      6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33,
      34, 36, 37, 39, 40, 42, 43, 45, 46, 48, 49,
    ];
    let levelupNoneList = [
      5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47,
    ];
    let acquisitionNoneList = [
      7, 8, 10, 11, 13, 15, 17, 19, 20, 22, 23, 24, 26, 28, 29, 31, 32, 33, 35,
      37, 39, 40, 41, 44, 46, 47, 48, 49,
    ];
    for (let i = 5; i < 50; i++) {
      let craftingResources = chain.callReadOnlyFn(
        contractName,
        getCraftingResources,
        [types.uint(i)],
        admin.address
      );
      let levelUpResources = chain.callReadOnlyFn(
        contractName,
        getLevelUpResources,
        [types.uint(i)],
        admin.address
      );
      let acquisitionResources = chain.callReadOnlyFn(
        contractName,
        getAcquisitionResources,
        [types.uint(i)],
        admin.address
      );
      if (craftingNoneList.indexOf(i) > -1) {
        craftingResources.result.expectOk().expectNone();
      } else {
        craftingResources.result.expectOk().expectSome();
      }
      if (levelupNoneList.indexOf(i) > -1) {
        levelUpResources.result.expectOk().expectNone();
      } else {
        levelUpResources.result.expectOk().expectSome();
      }
      if (acquisitionNoneList.indexOf(i) > -1) {
        acquisitionResources.result.expectOk().expectNone();
      } else {
        acquisitionResources.result.expectOk().expectSome();
      }
    }
  },
});

Clarinet.test({
  name: "Transfer resources test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;

    // mint resources
    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);

    // transfer 100 gold from admin to user 1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(gold),
          types.uint(100),
          types.principal(admin.address),
          types.principal(user1.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 1st transfer
    let balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(900);

    let balanceIronUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );
    balanceIronUser1.result.expectOk().expectUint(100);

    // transfer 200 energy from admin to user 2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(energy),
          types.uint(200),
          types.principal(admin.address),
          types.principal(user2.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 2nd transfer
    let balanceEnergyAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(admin.address)],
      admin.address
    );
    balanceEnergyAdmin.result.expectOk().expectUint(800);

    let balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user2.address)],
      user2.address
    );
    balanceIronUser4.result.expectOk().expectUint(200);

    // transfer 300 wood from admin to user
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(wood),
          types.uint(300),
          types.principal(admin.address),
          types.principal(user3.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 3rd transfer
    balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(700);

    balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user3.address)],
      user1.address
    );
    balanceIronUser4.result.expectOk().expectUint(300);

    // transfer 400 iron from admin to user 4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(iron),
          types.uint(400),
          types.principal(admin.address),
          types.principal(user4.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 4th transfer
    balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(600);

    balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(user4.address)],
      user1.address
    );
    balanceIronUser4.result.expectOk().expectUint(400);

    // transfer 50 energy from user2 to user4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(energy),
          types.uint(50),
          types.principal(user2.address),
          types.principal(user4.address),
        ],
        user2.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 5th transfer
    balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(800);

    balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user2.address)],
      user1.address
    );
    balanceIronUser4.result.expectOk().expectUint(150);

    let balanceEnergyUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user4.address)],
      user4.address
    );
    balanceEnergyUser4.result.expectOk().expectUint(50);

    // transfer 50 gold from user1 to user2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(gold),
          types.uint(50),
          types.principal(user1.address),
          types.principal(user2.address),
        ],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 6th transfer
    balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(900);

    balanceIronUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );
    balanceIronUser1.result.expectOk().expectUint(50);

    balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user2.address)],
      user2.address
    );
    balanceIronUser4.result.expectOk().expectUint(50);

    // transfer 50 wood from user3 to user1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(wood),
          types.uint(50),
          types.principal(user3.address),
          types.principal(user1.address),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 6th transfer
    balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(700);

    balanceIronUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user1.address)],
      user1.address
    );
    balanceIronUser1.result.expectOk().expectUint(50);

    balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user3.address)],
      user3.address
    );
    balanceIronUser4.result.expectOk().expectUint(250);

    // transfer 50 iron from user4 to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(iron),
          types.uint(50),
          types.principal(user4.address),
          types.principal(user3.address),
        ],
        user4.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 6th transfer
    balanceIronAdmin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(admin.address)],
      admin.address
    );
    balanceIronAdmin.result.expectOk().expectUint(600);

    let balanceIronUser3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(user3.address)],
      user3.address
    );
    balanceIronUser3.result.expectOk().expectUint(50);

    balanceIronUser4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(user4.address)],
      user4.address
    );
    balanceIronUser4.result.expectOk().expectUint(350);
  },
});

Clarinet.test({
  name: "Transfer crafted items test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [
          types.uint(woodenSword3),
          types.uint(1),
          types.principal(admin.address),
        ],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironSword3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // craft enhancedSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [
          types.uint(woodenArmor3),
          types.uint(1),
          types.principal(admin.address),
        ],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironArmor3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // craft enhancedArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(enhancedArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer 1 woodenSword1 from admin to user 1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenSword1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user1.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 1st transfer
    let balanceWoodenSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword1Admin.result.expectOk().expectUint(0);

    let balanceWoodenSword1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user1.address)],
      user1.address
    );
    balanceWoodenSword1User1.result.expectOk().expectUint(1);

    // transfer 1 ironSword1 from admin to user 2 xxx
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironSword1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user2.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 2nd transfer
    let balanceIronSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword1Admin.result.expectOk().expectUint(0);

    let balanceIronSword1User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(user2.address)],
      user2.address
    );
    balanceIronSword1User2.result.expectOk().expectUint(1);

    // transfer 1 enhancedSword1 from admin to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(enhancedSword1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user3.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 3rd transfer
    let balanceEnhancedSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword1), types.principal(admin.address)],
      admin.address
    );
    balanceEnhancedSword1Admin.result.expectOk().expectUint(0);

    let balanceEnhancedSword1User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword1), types.principal(user3.address)],
      user3.address
    );
    balanceEnhancedSword1User3.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor1 from admin to user 4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user4.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 4th transfer
    let balanceWoodenArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor1Admin.result.expectOk().expectUint(0);

    let balanceWoodenArmor1User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user4.address)],
      user4.address
    );
    balanceWoodenArmor1User4.result.expectOk().expectUint(1);

    // transfer 1 ironArmor1 from admin to user 5
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironArmor1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user5.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 5th transfer
    let balanceIronArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor1Admin.result.expectOk().expectUint(0);

    let balanceIronArmor1User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(user5.address)],
      user5.address
    );
    balanceIronArmor1User5.result.expectOk().expectUint(1);

    // transfer 1 enhancedArmor from admin to user 6
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(enhancedArmor1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user6.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 6th transfer
    let balanceEnhancedArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceEnhancedArmor1Admin.result.expectOk().expectUint(0);

    let balanceEnhancedArmor1User6 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedArmor1), types.principal(user6.address)],
      user6.address
    );
    balanceEnhancedArmor1User6.result.expectOk().expectUint(1);

    // transfer 1 woodenSword1 from user1 to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenSword1),
          types.uint(1),
          types.principal(user1.address),
          types.principal(user3.address),
        ],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 7th transfer
    balanceWoodenSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword1Admin.result.expectOk().expectUint(0);

    balanceWoodenSword1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user1.address)],
      user1.address
    );
    balanceWoodenSword1User1.result.expectOk().expectUint(0);

    let balanceWoodenSword1User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user3.address)],
      user3.address
    );
    balanceWoodenSword1User3.result.expectOk().expectUint(1);

    // transfer 1 ironSword1 from user2 to user4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironSword1),
          types.uint(1),
          types.principal(user2.address),
          types.principal(user4.address),
        ],
        user2.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 8th transfer
    balanceIronSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword1Admin.result.expectOk().expectUint(0);

    balanceIronSword1User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(user2.address)],
      user2.address
    );
    balanceIronSword1User2.result.expectOk().expectUint(0);

    let balanceIronSword1User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(user4.address)],
      user4.address
    );
    balanceIronSword1User4.result.expectOk().expectUint(1);

    // transfer 1 enhancedSword1 from user3 to user5
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(enhancedSword1),
          types.uint(1),
          types.principal(user3.address),
          types.principal(user5.address),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 9th transfer
    balanceEnhancedSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword1), types.principal(admin.address)],
      admin.address
    );
    balanceEnhancedSword1Admin.result.expectOk().expectUint(0);

    balanceEnhancedSword1User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword1), types.principal(user3.address)],
      user3.address
    );
    balanceEnhancedSword1User3.result.expectOk().expectUint(0);

    let balanceEnhancedSword1User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword1), types.principal(user5.address)],
      user5.address
    );
    balanceEnhancedSword1User5.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor1 from user4 to user6
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor1),
          types.uint(1),
          types.principal(user4.address),
          types.principal(user6.address),
        ],
        user4.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 10th transfer
    balanceWoodenArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor1Admin.result.expectOk().expectUint(0);

    balanceWoodenArmor1User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user4.address)],
      user4.address
    );
    balanceWoodenArmor1User4.result.expectOk().expectUint(0);

    let balanceWoodenArmor1User6 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user6.address)],
      user6.address
    );
    balanceWoodenArmor1User6.result.expectOk().expectUint(1);

    // transfer 1 ironArmor1 from user5 to user1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironArmor1),
          types.uint(1),
          types.principal(user5.address),
          types.principal(user1.address),
        ],
        user5.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 11th transfer
    balanceIronArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor1Admin.result.expectOk().expectUint(0);

    balanceIronArmor1User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(user5.address)],
      user5.address
    );
    balanceIronArmor1User5.result.expectOk().expectUint(0);

    let balanceIronArmor1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor1), types.principal(user1.address)],
      user1.address
    );
    balanceIronArmor1User1.result.expectOk().expectUint(1);

    // transfer 1 enhancedArmor from user6 to user2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(enhancedArmor1),
          types.uint(1),
          types.principal(user6.address),
          types.principal(user2.address),
        ],
        user6.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 12th transfer
    balanceEnhancedArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceEnhancedArmor1Admin.result.expectOk().expectUint(0);

    balanceEnhancedArmor1User6 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedArmor1), types.principal(user6.address)],
      user6.address
    );
    balanceEnhancedArmor1User6.result.expectOk().expectUint(0);

    let balanceEnhancedArmor1User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedArmor1), types.principal(user2.address)],
      user2.address
    );
    balanceEnhancedArmor1User2.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Transfer level-up items test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironSword3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        craftingFn,
        [types.uint(ironArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        levelUpFn,
        [types.uint(ironArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer 1 woodenSword3 from admin to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenSword3),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user3.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 1st transfer
    let balanceWoodenSword3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword3Admin.result.expectOk().expectUint(0);

    let balanceWoodenSword3User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(user3.address)],
      user3.address
    );
    balanceWoodenSword3User3.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor3 from admin to user 6
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor3),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user6.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 2nd transfer
    let balanceWoodenArmor3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3Admin.result.expectOk().expectUint(0);

    let balanceWoodenArmor3User6 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(user6.address)],
      user6.address
    );
    balanceWoodenArmor3User6.result.expectOk().expectUint(1);

    // transfer 1 ironSword3 from admin to user 2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironSword3),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user2.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 3rd transfer
    let balanceIronSword3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword3Admin.result.expectOk().expectUint(0);

    let balanceIronSword3User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(user2.address)],
      user2.address
    );
    balanceIronSword3User2.result.expectOk().expectUint(1);

    // transfer 1 ironArmor3 from admin to user 3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironArmor3),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user3.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 4th transfer
    let balanceIronArmor3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor3Admin.result.expectOk().expectUint(0);

    let balanceIronArmor3User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(user3.address)],
      user3.address
    );
    balanceIronArmor3User3.result.expectOk().expectUint(1);

    // transfer 1 woodenSword3 from user3 to user1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenSword3),
          types.uint(1),
          types.principal(user3.address),
          types.principal(user1.address),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 5th transfer
    balanceWoodenSword3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword3Admin.result.expectOk().expectUint(0);

    balanceWoodenSword3User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(user3.address)],
      user3.address
    );
    balanceWoodenSword3User3.result.expectOk().expectUint(0);

    let balanceWoodenSword3User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(user1.address)],
      user1.address
    );
    balanceWoodenSword3User1.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor3 from user6 to user2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor3),
          types.uint(1),
          types.principal(user6.address),
          types.principal(user2.address),
        ],
        user6.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 6th transfer
    balanceWoodenArmor3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3Admin.result.expectOk().expectUint(0);

    balanceWoodenArmor3User6 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(user6.address)],
      user6.address
    );
    balanceWoodenArmor3User6.result.expectOk().expectUint(0);

    let balanceWoodenArmor3User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(user2.address)],
      user2.address
    );
    balanceWoodenArmor3User2.result.expectOk().expectUint(1);

    // transfer 1 ironSword3 from user2 to user4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironSword3),
          types.uint(1),
          types.principal(user2.address),
          types.principal(user4.address),
        ],
        user2.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 7th transfer
    balanceIronSword3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword3Admin.result.expectOk().expectUint(0);

    balanceIronSword3User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(user2.address)],
      user2.address
    );
    balanceIronSword3User2.result.expectOk().expectUint(0);

    let balanceIronSword3User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword3), types.principal(user4.address)],
      user4.address
    );
    balanceIronSword3User4.result.expectOk().expectUint(1);

    // transfer 1 ironArmor3 from user3 to user5 XXXXXXXXXXXXX
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironArmor3),
          types.uint(1),
          types.principal(user3.address),
          types.principal(user5.address),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 4th transfer
    balanceIronArmor3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceIronArmor3Admin.result.expectOk().expectUint(0);

    balanceIronArmor3User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(user3.address)],
      user3.address
    );
    balanceIronArmor3User3.result.expectOk().expectUint(0);

    let balanceIronArmor3User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironArmor3), types.principal(user5.address)],
      user5.address
    );
    balanceIronArmor3User5.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Transfer acquisition items test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(40), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(ironSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(iron), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(enhancedSword2)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor1)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        acquisitionFn,
        [types.uint(woodenArmor3)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer 1 woodenSword1 from admin to user 1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenSword1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user1.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 1st transfer
    let balanceWoodenSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword1Admin.result.expectOk().expectUint(0);

    let balanceWoodenSword1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user1.address)],
      user1.address
    );
    balanceWoodenSword1User1.result.expectOk().expectUint(1);

    // transfer 1 ironSword2 from admin to user 2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironSword2),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user2.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 2nd transfer
    let balanceIronSword2Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword2), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword2Admin.result.expectOk().expectUint(0);

    let balanceIronSword2User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword2), types.principal(user2.address)],
      user2.address
    );
    balanceIronSword2User2.result.expectOk().expectUint(1);

    // transfer 1 enhancedSword2 from admin to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(enhancedSword2),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user3.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 3rd transfer
    let balanceEnhancedSword2Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword2), types.principal(admin.address)],
      admin.address
    );
    balanceEnhancedSword2Admin.result.expectOk().expectUint(0);

    let balanceEnhancedSword2User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword2), types.principal(user3.address)],
      user3.address
    );
    balanceEnhancedSword2User3.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor1 from admin to user 4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user4.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 4th transfer
    let balanceWoodenArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor1Admin.result.expectOk().expectUint(0);

    let balanceWoodenArmor1User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user4.address)],
      user4.address
    );
    balanceWoodenArmor1User4.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor3 from admin to user 5
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor3),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user5.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 5th transfer
    let balanceWoodenArmor3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3Admin.result.expectOk().expectUint(0);

    let balanceWoodenArmor3User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(user5.address)],
      user5.address
    );
    balanceWoodenArmor3User5.result.expectOk().expectUint(1);

    // transfer 1 woodenSword1 from user1 to user2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenSword1),
          types.uint(1),
          types.principal(user1.address),
          types.principal(user2.address),
        ],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 6th transfer
    balanceWoodenSword1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenSword1Admin.result.expectOk().expectUint(0);

    balanceWoodenSword1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user1.address)],
      user1.address
    );
    balanceWoodenSword1User1.result.expectOk().expectUint(0);

    let balanceWoodenSword1User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user2.address)],
      user2.address
    );
    balanceWoodenSword1User2.result.expectOk().expectUint(1);

    // transfer 1 ironSword2 from user2 to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(ironSword2),
          types.uint(1),
          types.principal(user2.address),
          types.principal(user3.address),
        ],
        user2.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 7th transfer
    balanceIronSword2Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword2), types.principal(admin.address)],
      admin.address
    );
    balanceIronSword2Admin.result.expectOk().expectUint(0);

    balanceIronSword2User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword2), types.principal(user2.address)],
      user2.address
    );
    balanceIronSword2User2.result.expectOk().expectUint(0);

    let balanceIronSword2User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword2), types.principal(user3.address)],
      user3.address
    );
    balanceIronSword2User3.result.expectOk().expectUint(1);

    // transfer 1 enhancedSword2 from user3 to user4
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(enhancedSword2),
          types.uint(1),
          types.principal(user3.address),
          types.principal(user4.address),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 8th transfer
    balanceEnhancedSword2Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword2), types.principal(admin.address)],
      admin.address
    );
    balanceEnhancedSword2Admin.result.expectOk().expectUint(0);

    balanceEnhancedSword2User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword2), types.principal(user3.address)],
      user3.address
    );
    balanceEnhancedSword2User3.result.expectOk().expectUint(0);

    let balanceEnhancedSword2User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedSword2), types.principal(user4.address)],
      user4.address
    );
    balanceEnhancedSword2User4.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor1 from user4 to user5
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor1),
          types.uint(1),
          types.principal(user4.address),
          types.principal(user5.address),
        ],
        user4.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 9th transfer
    balanceWoodenArmor1Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor1Admin.result.expectOk().expectUint(0);

    balanceWoodenArmor1User4 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user4.address)],
      user4.address
    );
    balanceWoodenArmor1User4.result.expectOk().expectUint(0);

    let balanceWoodenArmor1User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user5.address)],
      user5.address
    );
    balanceWoodenArmor1User5.result.expectOk().expectUint(1);

    // transfer 1 woodenArmor3 from user5 to user6 XXXXXXXXXXXXXXXXXXXXX
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [
          types.uint(woodenArmor3),
          types.uint(1),
          types.principal(user5.address),
          types.principal(user6.address),
        ],
        user5.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance after 5th transfer
    balanceWoodenArmor3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(admin.address)],
      admin.address
    );
    balanceWoodenArmor3Admin.result.expectOk().expectUint(0);

    balanceWoodenArmor3User5 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(user5.address)],
      user5.address
    );
    balanceWoodenArmor3User5.result.expectOk().expectUint(0);

    let balanceWoodenArmor3User6 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor3), types.principal(user6.address)],
      user6.address
    );
    balanceWoodenArmor3User6.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Fighting case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(2), types.uint(10), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(contractName, startFight, [types.uint(1)], user1.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(1), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);
  },
});

Clarinet.test({
  name: "Sleeping case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardSleeping,
        [types.uint(10), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);
  },
});

Clarinet.test({
  name: "Get-Set Functions Case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    for (let i = 1; i <= 49; i++) {
      let block = chain.mineBlock([
        Tx.contractCall(
          contractName,
          setTokenURI,
          [types.uint(i), types.ascii(`${i}`)],
          admin.address
        ),
      ]);
      assertEquals(block.receipts.length, 1);
      assertEquals(block.height, 3 * i - 1);
      block.receipts[0].result.expectOk().expectBool(true);

      let tokenURI = chain.callReadOnlyFn(
        contractName,
        getTokenURI,
        [types.uint(i)],
        admin.address
      );
      tokenURI.result.expectOk().expectSome(`${i}`);

      block = chain.mineBlock([
        Tx.contractCall(
          contractName,
          setTokenName,
          [
            types.uint(i),
            types.tuple({
              name: types.ascii(`${i}`),
              type: types.ascii(`${i}`),
              values: types.tuple({
                defense: types.uint(i),
                dmg: types.uint(i),
                health: types.uint(i),
              }),
            }),
          ],
          admin.address
        ),
      ]);
      assertEquals(block.receipts.length, 1);
      assertEquals(block.height, 3 * i);
      block.receipts[0].result.expectOk().expectBool(true);

      // let tokenName = chain.callReadOnlyFn(
      //   contractName,
      //   getTokenName,
      //   [types.uint(i)],
      //   admin.address
      // );
      block = chain.mineBlock([
        Tx.contractCall(
          contractName,
          getTokenName,
          [types.uint(i)],
          admin.address
        ),
      ]);
      assertEquals(block.receipts.length, 1);
      assertEquals(block.height, 3 * i + 1);
      block.receipts[0].result.expectOk();
      assertEquals(
        block.receipts[0].result,
        `(ok (some {name: "${i}", type: "${i}", values: {defense: u${i}, dmg: u${i}, health: u${i}}}))`
      );
    }

    // block = chain.mineBlock([
    //   Tx.contractCall(
    //     contractName,
    //     rewardFighting,
    //     [types.uint(1), types.principal(user1.address)],
    //     admin.address
    //   ),
    // ]);
    // assertEquals(block.receipts.length, 1);
    // assertEquals(block.height, 4);
    // block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setLvlUpRes,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              "resource-id": types.uint(2),
              "resource-qty": types.uint(4),
            }),
            types.tuple({
              "resource-id": types.uint(4),
              "resource-qty": types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 149);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setCraftingRes,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              "resource-id": types.uint(2),
              "resource-qty": types.uint(4),
            }),
            types.tuple({
              "resource-id": types.uint(4),
              "resource-qty": types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 150);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setAcqRes,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              "resource-id": types.uint(2),
              "resource-qty": types.uint(4),
            }),
            types.tuple({
              "resource-id": types.uint(4),
              "resource-qty": types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 151);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setFightRes,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              "resource-id": types.uint(2),
              "resource-qty": types.uint(4),
            }),
            types.tuple({
              "resource-id": types.uint(4),
              "resource-qty": types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 152);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setFightRewards,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              "resource-id": types.uint(2),
              "resource-qty": types.uint(4),
            }),
            types.tuple({
              "resource-id": types.uint(4),
              "resource-qty": types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 153);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setSleepingRewards,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              "resource-id": types.uint(2),
              "resource-qty": types.uint(4),
            }),
            types.tuple({
              "resource-id": types.uint(4),
              "resource-qty": types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 154);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Transfer case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    // transfer many

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferManyFn,
        [
          types.list([
            types.tuple({
              "token-id": types.uint(gold),
              amount: types.uint(1),
              sender: types.principal(admin.address),
              recipient: types.principal(user1.address),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [
          types.uint(woodenArmor1),
          types.uint(1),
          types.principal(admin.address),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer memo

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferMemoFn,
        [
          types.uint(woodenArmor1),
          types.uint(1),
          types.principal(admin.address),
          types.principal(user3.address),
          types.buff("abc"),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer many memo

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferManyMemoFn,
        [
          types.list([
            types.tuple({
              "token-id": types.uint(1),
              amount: types.uint(1),
              sender: types.principal(admin.address),
              recipient: types.principal(user1.address),
              memo: types.buff("ascjhasjh"),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
  },
});

Clarinet.test({
  name: "Balances Case",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get("deployer")!;
    const user1 = accounts.get("wallet_1")!;
    const user2 = accounts.get("wallet_2")!;
    const user3 = accounts.get("wallet_3")!;
    const user4 = accounts.get("wallet_4")!;
    const user5 = accounts.get("wallet_5")!;
    const user6 = accounts.get("wallet_6")!;

    // overall balance

    let overallBalance = chain.callReadOnlyFn(
      contractName,
      getOverallBalance,
      [types.principal(admin.address)],
      admin.address
    );

    overallBalance.result.expectOk().expectUint(0);

    // overall supply

    let overallSupply = chain.callReadOnlyFn(
      contractName,
      getOverallSupply,
      [],
      admin.address
    );

    overallSupply.result.expectOk().expectUint(0);

    // decimals

    let decimals = chain.callReadOnlyFn(
      contractName,
      getDecimals,
      [types.uint(woodenArmor1)],
      admin.address
    );

    decimals.result.expectOk().expectUint(0);
  },
});
