import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
const errOwnerOnly = 100;
const errorInsufficientBalance = 101;
const errorInvalidSender = 102;
const errNotSome = 103;
const errInvalidDestinationContract = 104;
const errInexistentItem = 105;
const errAlreadyClaimed = 106;
const contractName = 'main-sc';
const transferFn = 'transfer-wrapper';
const craftingFn = 'craft-item';
const levelUpFn = 'level-up';
const acquisitionFn = 'buy-item';
const getBalance = 'get-balance-wrapper';
const getCraftingResources = 'get-crafting-resources';
const getLevelUpResources = 'get-level-up-resources';
const getAcquisitionResources = 'get-acquisition-resources';
const mintWrapper = 'mint-wrapper';
const mintWrapperUser = 'mint-wrapper-user';
const mintAdmin = 'mint-wrapper-admin';
const burnWrapper = 'burn-wrapper';
const startFight = 'start-fight';
const rewardFighting = 'reward-fighting';
const rewardSleeping = 'reward-sleeping';
const rewardMining = 'reward-mining';
const rewardHarvesting = 'reward-harvesting';
const isOwnedNeededWrapper = 'is-owned-needed-wrapper';
const transferWrapper = 'transfer-wrapper';
const setLvlUp = 'set-level-up-resources';
const setCrafting = 'set-crafting-resources';
const setAcquisition = 'set-acquisition-resources';
const setFightResources = 'set-fight-needed-resources';
const setFightRewards = 'set-fight-rewards';
const setSleepingRewards = 'set-sleeping-rewards';
const setMiningRewards = 'set-mining-rewards';
const setHarvestingRewards = 'set-harvesting-rewards';
const claimStarterKit = 'claim-starter-kit';
const getStarterKitStatus = 'get-starter-kit-status';
const getAllTokenName = 'get-all-token-name-data';
const getAllLevelUpData = 'get-all-level-up-data';
const getAllCraftingData = 'get-all-crafting-data';
const getAllAcquisitionData = 'get-all-acquisition-data';
const getAllFightResourcesData = 'get-all-fight-resources-data';
const getAllFightRewardsData = 'get-all-fight-rewards-data';
const getAllSleepingRewardsData = 'get-all-sleeping-rewards-data';
const getAllMiningRewardsData = 'get-all-mining-rewards-data';
const getAllHarvestingRewardsData = 'get-all-harvesting-rewards-data';
const allBalancesUser = 'all-balances-user';
const fight1 = '1';
const fight2 = '2';
const fight3 = '3';
const fight4 = '4';
const fight5 = '5';
const fight6 = '6';
const fight7 = '7';
const fight8 = '8';
const fight9 = '9';
const fight10 = '10';
const gold = '1';
const energy = '2';
const wood = '3';
const iron = '4';
const woodenSword1 = '5';
const woodenSword2 = '6';
const woodenSword3 = '7';
const ironSword1 = '8';
const ironSword2 = '9';
const ironSword3 = '10';
const enhancedSword1 = '11';
const enhancedSword2 = '12';
const enhancedSword3 = '13';
const woodenArmor1 = '14';
const woodenArmor2 = '15';
const woodenArmor3 = '16';
const ironArmor1 = '17';
const ironArmor2 = '18';
const ironArmor3 = '19';
const enhancedArmor1 = '20';
const enhancedArmor2 = '21';
const enhancedArmor3 = '22';
const woodenShield1 = '23';
const woodenShield2 = '24';
const woodenShield3 = '25';
const ironShield1 = '26';
const ironShield2 = '27';
const ironShield3 = '28';
const enhancedShield1 = '29';
const enhancedShield2 = '30';
const enhancedShield3 = '31';
const woodenHelmet1 = '32';
const woodenHelmet2 = '33';
const woodenHelmet3 = '34';
const ironHelmet1 = '35';
const ironHelmet2 = '36';
const ironHelmet3 = '37';
const enhancedHelmet1 = '38';
const enhancedHelmet2 = '39';
const enhancedHelmet3 = '40';
const woodenShoes1 = '41';
const woodenShoes2 = '42';
const woodenShoes3 = '43';
const ironShoes1 = '44';
const ironShoes2 = '45';
const ironShoes3 = '46';
const enhancedShoes1 = '47';
const enhancedShoes2 = '48';
const enhancedShoes3 = '49';
const goldBar = '50';
const ruby = '51';
const ironAxe = '52';
const goldAxe = '53';
const rubyAxe = '54';
const ironPickaxe = '55';
const goldPickaxe = '56';
const rubyPickaxe = '57';

Clarinet.test({
  name: 'Main-SC: Crafting Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 2

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron shield

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
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
  name: 'Main-SC: Level-Up Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // // craft enhancedArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 18

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 19

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 20

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 21

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 22

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 44);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 23

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 24

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 48);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 50);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 51);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 26

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 53);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 27

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 55);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 28

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 56);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 57);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 29

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 58);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 59);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 30

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 60);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 61);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 31

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 62);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 63);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 32

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 64);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 65);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 33

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 66);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 68);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 69);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 35

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 71);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 36

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 73);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 37

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 74);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 75);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 38

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 76);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 77);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 39

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 78);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 79);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 40

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 80);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 81);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 41

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 82);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 83);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 42

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 84);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 86);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 87);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 44

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 89);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 45

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 91);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Acquisition Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(40), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedSword2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(400), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(12), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedArmor2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(670), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedShield2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(370), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedHelmet1)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(25), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(120), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Crafting with more resources Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint phase

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);

    // craft iron shield 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
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
  name: 'Main-SC: Level-Up with more resources Case ',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint phase

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword3)], admin.address)]);
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor3)], admin.address)]);
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield3)], admin.address)]);
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet3)], admin.address)]);
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 36);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes3)], admin.address)]);
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up enhancedShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Acquisition with more resources Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(9999), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedSword2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedArmor2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedArmor2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedShield2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedShield2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedHelmet1

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedHelmet1)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Crafting with less resources Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // NO MINT == NO RESOURCE AT ALL

    let block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NOT ENOUGH

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NONE OF THE OTHERS

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(woodenSword3), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // try crafting enhanced sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // MINT TWO RESOURCES NONE OF THE THIRD

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(woodenArmor3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(ironArmor3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // try crafting enhanced armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden shield

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron shield

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
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
  name: 'Main-SC: Level-Up with less resources Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // NO MINT == NO RESOURCE

    // craft woodenSword1

    let block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NONE OF THE OTHER 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT TWO RESOURCES NONE OF THE OTHER

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NOT ENOUGH

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword3)], admin.address)]);
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
        mintWrapper,
        [types.uint(woodenSword3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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
        mintWrapper,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // // craft enhancedArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(8), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 35);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 18

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 37);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 19

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 38);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 39);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 20

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 40);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 41);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 21

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 42);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 43);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 22

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 44);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 45);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 23

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 46);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 47);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 24

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 48);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShield3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShield3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 50);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShield1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShield1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 51);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 26

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 53);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 27

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 55);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 28

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 56);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 57);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 29

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 58);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 59);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 30

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 60);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 61);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 31

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 62);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 63);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 32

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 64);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 65);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 33

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 66);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironHelmet3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 68);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedHelmet1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedHelmet1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 69);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 35

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 71);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 36

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 73);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 37

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 74);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 75);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 38

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 76);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 77);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 39

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 78);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 79);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 40

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 80);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 81);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 41

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 82);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 83);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 42

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 84);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSHoes3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironShoes3)], admin.address)]);
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
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 86);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft enhancedShoes1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedShoes1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 87);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 44

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 89);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 45

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(enhancedShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 91);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Acquisition with less resources Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // NO MINT == NO RESOURCE

    // buy woodenSword1

    let block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword1)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NOT THE OTHER

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT 2 RESOURCE EACH ONE NOT ENOUGH

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(19), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT ONE RESOURCE NONE OF THE OTHER 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedSword2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // MINT

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // MINT TWO RESOURCES NONE OF THE OTHER

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(400), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedArmor2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenShield3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShield3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironShield2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShield2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(670), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedShield2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(150), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy woodenHelmet3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenHelmet3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 13

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(230), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy ironHelmet2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironHelmet2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 14

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(370), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedHelmet1)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 15

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(25), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy woodenShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 16

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(120), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy woodenShoes3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenShoes3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 32);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 17

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 33);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // buy ironShoes2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironShoes2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 34);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Get read only functions Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    let craftingNoneList = [
      6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 31, 33, 34, 36, 37, 39, 40, 42, 43, 45, 46, 48,
      49,
    ];
    let levelupNoneList = [5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47];
    let acquisitionNoneList = [
      7, 8, 10, 11, 13, 15, 17, 19, 20, 22, 23, 24, 26, 28, 29, 31, 32, 33, 35, 37, 39, 40, 41, 44, 46, 47, 48, 49,
    ];
    for (let i = 5; i < 50; i++) {
      let craftingResources = chain.callReadOnlyFn(contractName, getCraftingResources, [types.uint(i)], admin.address);
      let levelUpResources = chain.callReadOnlyFn(contractName, getLevelUpResources, [types.uint(i)], admin.address);
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
  name: 'Main-SC: Transfer resources Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;

    // mint resources
    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(1000), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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
        [types.uint(gold), types.uint(100), types.principal(admin.address), types.principal(user1.address)],
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
    // TODO: Error: Expected u100, got u115
    balanceIronUser1.result.expectOk().expectUint(100);

    // transfer 200 energy from admin to user 2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(energy), types.uint(200), types.principal(admin.address), types.principal(user2.address)],
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
        [types.uint(wood), types.uint(300), types.principal(admin.address), types.principal(user3.address)],
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
        [types.uint(iron), types.uint(400), types.principal(admin.address), types.principal(user4.address)],
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
        [types.uint(energy), types.uint(50), types.principal(user2.address), types.principal(user4.address)],
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
        [types.uint(gold), types.uint(50), types.principal(user1.address), types.principal(user2.address)],
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
        [types.uint(wood), types.uint(50), types.principal(user3.address), types.principal(user1.address)],
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
        [types.uint(iron), types.uint(50), types.principal(user4.address), types.principal(user3.address)],
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
  name: 'Main-SC: Transfer crafted items Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden sword 2

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft wooden armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft iron armor 1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(woodenSword3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(ironSword3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(woodenArmor3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(ironArmor3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
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

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(enhancedArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer 1 woodenSword1 from admin to user 1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(woodenSword1), types.uint(1), types.principal(admin.address), types.principal(user1.address)],
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
    // TODO: Error: Expected u1, got u2
    balanceWoodenSword1User1.result.expectOk().expectUint(1);

    // transfer 1 ironSword1 from admin to user 2 xxx
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(ironSword1), types.uint(1), types.principal(admin.address), types.principal(user2.address)],
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
        [types.uint(enhancedSword1), types.uint(1), types.principal(admin.address), types.principal(user3.address)],
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
        [types.uint(woodenArmor1), types.uint(1), types.principal(admin.address), types.principal(user4.address)],
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
        [types.uint(ironArmor1), types.uint(1), types.principal(admin.address), types.principal(user5.address)],
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
        [types.uint(enhancedArmor1), types.uint(1), types.principal(admin.address), types.principal(user6.address)],
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
        [types.uint(woodenSword1), types.uint(1), types.principal(user1.address), types.principal(user3.address)],
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
        [types.uint(ironSword1), types.uint(1), types.principal(user2.address), types.principal(user4.address)],
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
        [types.uint(enhancedSword1), types.uint(1), types.principal(user3.address), types.principal(user5.address)],
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
        [types.uint(woodenArmor1), types.uint(1), types.principal(user4.address), types.principal(user6.address)],
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
        [types.uint(ironArmor1), types.uint(1), types.principal(user5.address), types.principal(user1.address)],
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
        [types.uint(enhancedArmor1), types.uint(1), types.principal(user6.address), types.principal(user2.address)],
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
  name: 'Main-SC: Transfer Level-Up items Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironSword1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironSword3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironSword3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 7

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 8

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(2), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up woodenArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 9

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(3), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // levelup woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 10

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(4), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    // craft ironArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(ironArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 11

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 12

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // level up ironArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(ironArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer 1 woodenSword3 from admin to user3
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(woodenSword3), types.uint(1), types.principal(admin.address), types.principal(user3.address)],
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
        [types.uint(woodenArmor3), types.uint(1), types.principal(admin.address), types.principal(user6.address)],
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
        [types.uint(ironSword3), types.uint(1), types.principal(admin.address), types.principal(user2.address)],
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
        [types.uint(ironArmor3), types.uint(1), types.principal(admin.address), types.principal(user3.address)],
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
        [types.uint(woodenSword3), types.uint(1), types.principal(user3.address), types.principal(user1.address)],
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
        [types.uint(woodenArmor3), types.uint(1), types.principal(user6.address), types.principal(user2.address)],
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
        [types.uint(ironSword3), types.uint(1), types.principal(user2.address), types.principal(user4.address)],
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
        [types.uint(ironArmor3), types.uint(1), types.principal(user3.address), types.principal(user5.address)],
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
  name: 'Main-SC: Transfer Acquisition items Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // mint 1

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 2

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(40), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(7), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 3

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(5), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(20), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy ironSword2

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(ironSword2)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 4

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(500), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(iron), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(11), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy enhancedSword2

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(enhancedSword2)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 5

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(15), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor1

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor1)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint 6

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(50), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(17), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectBool(true);

    // buy woodenArmor3

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor3)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectBool(true);

    // transfer 1 woodenSword1 from admin to user 1
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(woodenSword1), types.uint(1), types.principal(admin.address), types.principal(user1.address)],
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
    // TODO: Error: Expected u1, got u2
    balanceWoodenSword1User1.result.expectOk().expectUint(1);

    // transfer 1 ironSword2 from admin to user 2
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(ironSword2), types.uint(1), types.principal(admin.address), types.principal(user2.address)],
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
        [types.uint(enhancedSword2), types.uint(1), types.principal(admin.address), types.principal(user3.address)],
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
        [types.uint(woodenArmor1), types.uint(1), types.principal(admin.address), types.principal(user4.address)],
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
        [types.uint(woodenArmor3), types.uint(1), types.principal(admin.address), types.principal(user5.address)],
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
        [types.uint(woodenSword1), types.uint(1), types.principal(user1.address), types.principal(user2.address)],
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
        [types.uint(ironSword2), types.uint(1), types.principal(user2.address), types.principal(user3.address)],
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
        [types.uint(enhancedSword2), types.uint(1), types.principal(user3.address), types.principal(user4.address)],
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
        [types.uint(woodenArmor1), types.uint(1), types.principal(user4.address), types.principal(user5.address)],
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
        [types.uint(woodenArmor3), types.uint(1), types.principal(user5.address), types.principal(user6.address)],
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
  name: 'Main-SC: Gameplay Scenario Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // Game start, the player (user1) will have 100 energy, 100 gold and 30 wood

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(100), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(energy), types.uint(100), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(wood), types.uint(30), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // Check balances for user1

    let balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );
    let balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    let balanceWoodUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(100);
    balanceEnergyUser1.result.expectOk().expectUint(100);
    balanceWoodUser1.result.expectOk().expectUint(30);

    // Try to get balance for inexistent item

    let balanceInexistent = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(58), types.principal(user1.address)],
      user1.address
    );

    balanceInexistent.result.expectErr().expectUint(errInexistentItem);

    // User1 buys wood and crafts woodenSword1

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, craftingFn, [types.uint(woodenSword1)], user1.address),
    ]);

    assertEquals(block.receipts.length, 5);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);
    block.receipts[4].result.expectOk().expectBool(true);

    // user1 fights first monster and wins (starts fight 1)

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight1)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(90);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(fight1), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(188);

    // User 1 has 188 gold. Buys resources to obtain all the wooden items lvl 1

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(woodenArmor1)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, craftingFn, [types.uint(woodenShield1)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, craftingFn, [types.uint(woodenHelmet1)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(wood)], user1.address),
      Tx.contractCall(contractName, craftingFn, [types.uint(woodenShoes1)], user1.address),
    ]);

    assertEquals(block.receipts.length, 9);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectOk().expectBool(true);
    block.receipts[4].result.expectOk().expectBool(true);
    block.receipts[5].result.expectOk().expectBool(true);
    block.receipts[6].result.expectOk().expectBool(true);
    block.receipts[7].result.expectOk().expectBool(true);
    block.receipts[8].result.expectOk().expectBool(true);

    // ceck balances for user1. He should have every wooden item. he already has woodenSword1

    let balanceWoodenArmor1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(user1.address)],
      user1.address
    );
    let balanceWoodenShield1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield1), types.principal(user1.address)],
      user1.address
    );
    let balanceWoodenHelmet1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenHelmet1), types.principal(user1.address)],
      user1.address
    );
    let balanceWoodenShoes1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShoes1), types.principal(user1.address)],
      user1.address
    );
    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );
    balanceWoodUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user1.address)],
      user1.address
    );

    balanceWoodenArmor1User1.result.expectOk().expectUint(1);
    balanceWoodenShield1User1.result.expectOk().expectUint(1);
    balanceWoodenHelmet1User1.result.expectOk().expectUint(1);
    balanceWoodenShoes1User1.result.expectOk().expectUint(1);
    balanceGoldUser1.result.expectOk().expectUint(158);
    balanceWoodUser1.result.expectOk().expectUint(30);

    // user1 sleeps 5 mins to recover energy

    block = chain.mineBlock([
      Tx.contractCall(contractName, rewardSleeping, [types.uint(5), types.principal(user1.address)], admin.address),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );

    balanceEnergyUser1.result.expectOk().expectUint(95); // 90 + 5 energy

    // user1 starts fight2 and wins it

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight2)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(83); // 95 - 12 energy

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(fight2), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(278); // 158 + 120 gold

    // user1 starts fight 3 and loses it

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight3)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 10);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(68); // 83 - 15 energy

    // user1 buys iron axe and pickaxe

    block = chain.mineBlock([
      Tx.contractCall(contractName, acquisitionFn, [types.uint(ironAxe)], user1.address),
      Tx.contractCall(contractName, acquisitionFn, [types.uint(ironPickaxe)], user1.address),
    ]);

    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 11);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    let balanceIronAxeUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironAxe), types.principal(user1.address)],
      user1.address
    );
    let balanceIronPickaxeUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironPickaxe), types.principal(user1.address)],
      user1.address
    );
    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(233); // 278 - 15 - 30 gold
    balanceIronAxeUser1.result.expectOk().expectUint(1);
    balanceIronPickaxeUser1.result.expectOk().expectUint(1);

    // user1 mines for 20 mins

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardMining,
        [types.uint(ironPickaxe), types.uint(20), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 12);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    // after mining he should have 5 iron, 1 gold bar

    let balanceGoldbarUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(goldBar), types.principal(user1.address)],
      user1.address
    );
    let balanceIronUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(iron), types.principal(user1.address)],
      user1.address
    );

    balanceGoldbarUser1.result.expectOk().expectUint(1);
    balanceIronUser1.result.expectOk().expectUint(5);

    // user1 harvests for 10 mins

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardHarvesting,
        [types.uint(ironAxe), types.uint(10), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 13);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    // after harvesting he should have 3 wood

    balanceWoodUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user1.address)],
      user1.address
    );

    balanceWoodUser1.result.expectOk().expectUint(33);

    // user1 starts fight2 and wins it

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight2)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 14);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(56); // 68 - 12 energy

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(fight2), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 15);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(353); // 233 + 120 gold

    // user1 starts fight3 and wins it

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight3)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 16);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(41); // 56 - 15 energy

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(fight3), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 17);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(503); // 353 + 150 gold

    // user1 needs to recover, so he sleeps 20 mins, then 10 mins

    block = chain.mineBlock([
      Tx.contractCall(contractName, rewardSleeping, [types.uint(20), types.principal(user1.address)], admin.address),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 18);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(81); // 41 + 40 energy

    block = chain.mineBlock([
      Tx.contractCall(contractName, rewardSleeping, [types.uint(10), types.principal(user1.address)], admin.address),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 19);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(96); // 81 + 15 energy

    // user1 starts fight4 and wins it

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight4)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 20);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(77); // 96 - 19 energy

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(fight4), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 21);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(693); // 503 + 190

    // user1 harvests for 20 min to obtain wood

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardHarvesting,
        [types.uint(ironAxe), types.uint(20), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 22);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceWoodUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user1.address)],
      user1.address
    );

    balanceWoodUser1.result.expectOk().expectUint(40); // 33 + 7 wood

    // user1 level-up to obtain woodenSword2

    block = chain.mineBlock([Tx.contractCall(contractName, levelUpFn, [types.uint(woodenSword2)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 23);
    block.receipts[0].result.expectOk().expectBool(true);

    let balanceWoodenSword2User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword2), types.principal(user1.address)],
      user1.address
    );

    balanceWoodenSword2User1.result.expectOk().expectUint(1);

    // user1 starts fight5 and wins it

    block = chain.mineBlock([Tx.contractCall(contractName, startFight, [types.uint(fight5)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 24);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceEnergyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(energy), types.principal(user1.address)],
      user1.address
    );
    balanceEnergyUser1.result.expectOk().expectUint(45); // 77 - 2 - 30 energy

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardFighting,
        [types.uint(fight5), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 25);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    let balanceWoodenSword3User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword3), types.principal(user1.address)],
      user1.address
    );

    balanceGoldUser1.result.expectOk().expectUint(993); // 693 + 300
    balanceWoodenSword3User1.result.expectOk().expectUint(1); // mini boss' sword

    // user1 buys ruby pickaxe and axe

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(rubyAxe)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 26);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([Tx.contractCall(contractName, acquisitionFn, [types.uint(rubyPickaxe)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 27);
    block.receipts[0].result.expectOk().expectBool(true);

    let balanceRubyAxeUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(rubyAxe), types.principal(user1.address)],
      user1.address
    );
    let balanceRubyPickAxeUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(rubyPickaxe), types.principal(user1.address)],
      user1.address
    );
    balanceGoldUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(gold), types.principal(user1.address)],
      user1.address
    );

    balanceRubyAxeUser1.result.expectOk().expectUint(1);
    balanceRubyPickAxeUser1.result.expectOk().expectUint(1);
    balanceGoldUser1.result.expectOk().expectUint(693); // 503 + 190

    // user1 mines and then harvests 20 mins with rubyPickAxe, rubyAxe and then mines 10 min rubyPickAxe

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardMining,
        [types.uint(rubyPickaxe), types.uint(20), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 28);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    // after mining he should have 5 iron, 1 gold bar

    let balanceRubyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ruby), types.principal(user1.address)],
      user1.address
    );
    let balanceGoldBarUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(goldBar), types.principal(user1.address)],
      user1.address
    );

    balanceGoldBarUser1.result.expectOk().expectUint(5); // 1 + 4 gold bar
    balanceRubyUser1.result.expectOk().expectUint(3);

    // mine 10 minutes with rubypickaxe

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardMining,
        [types.uint(rubyPickaxe), types.uint(20), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 29);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    // after mining

    balanceRubyUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ruby), types.principal(user1.address)],
      user1.address
    );
    balanceGoldBarUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(goldBar), types.principal(user1.address)],
      user1.address
    );

    balanceGoldBarUser1.result.expectOk().expectUint(9); // 5 + 4 gold bar
    balanceRubyUser1.result.expectOk().expectUint(6); // 3 + 3 ruby

    // user1 harvests

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        rewardHarvesting,
        [types.uint(rubyAxe), types.uint(20), types.principal(user1.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 30);
    block.receipts[0].result.expectOk().expectPrincipal(user1.address);

    // after harvesting he should have 3 wood

    balanceWoodUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(wood), types.principal(user1.address)],
      user1.address
    );

    balanceWoodUser1.result.expectOk().expectUint(134); // 34 + 100 wood

    // user1 crafts rubyPickAxe

    block = chain.mineBlock([Tx.contractCall(contractName, craftingFn, [types.uint(rubyPickaxe)], user1.address)]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 31);
    block.receipts[0].result.expectOk().expectBool(true);

    balanceRubyPickAxeUser1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(rubyPickaxe), types.principal(user1.address)],
      user1.address
    );

    balanceRubyPickAxeUser1.result.expectOk().expectUint(2);
  },
});

Clarinet.test({
  name: 'Main-SC: Mint case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // mint item

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(woodenSword1), types.uint(1), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint collection-1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(ruby), types.uint(1), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    // mint inexistent

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(58), types.uint(1), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectErr().expectUint(errInexistentItem);
  },
});

Clarinet.test({
  name: 'Main-SC: Transfer case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // mint

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(10), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(woodenSword1), types.uint(10), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(ruby), types.uint(10), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(58), types.uint(10), types.principal(user1.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectErr().expectUint(errInexistentItem);

    // 4 transfers

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferWrapper,
        [types.uint(gold), types.uint(10), types.principal(user1.address), types.principal(user2.address)],
        user1.address
      ),
      Tx.contractCall(
        contractName,
        transferWrapper,
        [types.uint(woodenSword1), types.uint(10), types.principal(user1.address), types.principal(user3.address)],
        user1.address
      ),
      Tx.contractCall(
        contractName,
        transferWrapper,
        [types.uint(ruby), types.uint(10), types.principal(user1.address), types.principal(user4.address)],
        user1.address
      ),
      Tx.contractCall(
        contractName,
        transferWrapper,
        [types.uint(58), types.uint(10), types.principal(user1.address), types.principal(user5.address)],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 4);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);
    block.receipts[3].result.expectErr().expectUint(errInexistentItem);
  },
});

Clarinet.test({
  name: 'Main-SC: Burn case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // burn inexistent tuple

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        burnWrapper,
        [
          types.tuple({
            'resource-id': types.uint(58),
            'resource-qty': types.uint(1),
          }),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectErr().expectUint(errInexistentItem);
  },
});

Clarinet.test({
  name: 'Main-SC: Set - Get case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setLvlUp,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setCrafting,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setAcquisition,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setFightResources,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setFightRewards,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setSleepingRewards,
        [
          types.uint(woodenSword1),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 7);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setMiningRewards,
        [
          types.uint(woodenSword1),
          types.uint(25),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setHarvestingRewards,
        [
          types.uint(woodenSword1),
          types.uint(25),
          types.list([
            types.tuple({
              'resource-id': types.uint(2),
              'resource-qty': types.uint(4),
            }),
            types.tuple({
              'resource-id': types.uint(4),
              'resource-qty': types.uint(5),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: 'Main-SC: Starter Kit ',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // wallet 1 and wallet 2 claims succesfully
    let block = chain.mineBlock([
      Tx.contractCall(contractName, claimStarterKit, [], user1.address),
      Tx.contractCall(contractName, claimStarterKit, [], user2.address),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // wallet 1 already claimed
    block = chain.mineBlock([Tx.contractCall(contractName, claimStarterKit, [], user1.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectErr().expectUint(errAlreadyClaimed);

    // read only wallet 1 claimed and wallet 3 unclaimed
    let statusStarterKit1 = chain.callReadOnlyFn(
      contractName,
      getStarterKitStatus,
      [types.principal(user1.address)],
      admin.address
    );

    let statusStarterKit3 = chain.callReadOnlyFn(
      contractName,
      getStarterKitStatus,
      [types.principal(user3.address)],
      admin.address
    );

    assertEquals('{claimed: true}', statusStarterKit1.result.expectOk().expectSome());
    statusStarterKit3.result.expectOk().expectNone();
  },
});

Clarinet.test({
  name: 'Main-SC: Get all Data',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;

    // level-up
    let lvlUpData = chain.callReadOnlyFn(
      contractName,
      getAllLevelUpData,
      [
        types.list([
          types.uint(6),
          types.uint(7),
          types.uint(9),
          types.uint(10),
          types.uint(12),
          types.uint(13),
          types.uint(15),
          types.uint(16),
          types.uint(18),
          types.uint(19),
          types.uint(21),
          types.uint(22),
          types.uint(24),
          types.uint(25),
          types.uint(27),
          types.uint(28),
          types.uint(30),
          types.uint(31),
          types.uint(33),
          types.uint(34),
          types.uint(36),
          types.uint(37),
          types.uint(39),
          types.uint(40),
          types.uint(42),
          types.uint(43),
          types.uint(45),
          types.uint(46),
          types.uint(48),
          types.uint(49),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{id: u6, level-up-data: [{resource-id: u3, resource-qty: u6}, {resource-id: u5, resource-qty: u1}, {resource-id: u2, resource-qty: u2}]}, {id: u7, level-up-data: [{resource-id: u3, resource-qty: u10}, {resource-id: u6, resource-qty: u1}, {resource-id: u2, resource-qty: u3}]}, {id: u9, level-up-data: [{resource-id: u4, resource-qty: u6}, {resource-id: u8, resource-qty: u1}, {resource-id: u2, resource-qty: u5}]}, {id: u10, level-up-data: [{resource-id: u4, resource-qty: u10}, {resource-id: u9, resource-qty: u1}, {resource-id: u2, resource-qty: u6}]}, {id: u12, level-up-data: [{resource-id: u3, resource-qty: u8}, {resource-id: u4, resource-qty: u8}, {resource-id: u11, resource-qty: u1}, {resource-id: u2, resource-qty: u8}]}, {id: u13, level-up-data: [{resource-id: u3, resource-qty: u10}, {resource-id: u4, resource-qty: u10}, {resource-id: u12, resource-qty: u1}, {resource-id: u2, resource-qty: u10}]}, {id: u15, level-up-data: [{resource-id: u3, resource-qty: u6}, {resource-id: u14, resource-qty: u1}, {resource-id: u2, resource-qty: u2}]}, {id: u16, level-up-data: [{resource-id: u3, resource-qty: u10}, {resource-id: u15, resource-qty: u1}, {resource-id: u2, resource-qty: u3}]}, {id: u18, level-up-data: [{resource-id: u4, resource-qty: u6}, {resource-id: u17, resource-qty: u1}, {resource-id: u2, resource-qty: u5}]}, {id: u19, level-up-data: [{resource-id: u4, resource-qty: u10}, {resource-id: u18, resource-qty: u1}, {resource-id: u2, resource-qty: u6}]}, {id: u21, level-up-data: [{resource-id: u3, resource-qty: u8}, {resource-id: u4, resource-qty: u8}, {resource-id: u20, resource-qty: u1}, {resource-id: u2, resource-qty: u8}]}, {id: u22, level-up-data: [{resource-id: u3, resource-qty: u10}, {resource-id: u4, resource-qty: u10}, {resource-id: u21, resource-qty: u1}, {resource-id: u2, resource-qty: u10}]}, {id: u24, level-up-data: [{resource-id: u3, resource-qty: u3}, {resource-id: u23, resource-qty: u1}, {resource-id: u2, resource-qty: u1}]}, {id: u25, level-up-data: [{resource-id: u3, resource-qty: u5}, {resource-id: u24, resource-qty: u1}, {resource-id: u2, resource-qty: u2}]}, {id: u27, level-up-data: [{resource-id: u4, resource-qty: u3}, {resource-id: u26, resource-qty: u1}, {resource-id: u2, resource-qty: u3}]}, {id: u28, level-up-data: [{resource-id: u4, resource-qty: u5}, {resource-id: u27, resource-qty: u1}, {resource-id: u2, resource-qty: u4}]}, {id: u30, level-up-data: [{resource-id: u3, resource-qty: u4}, {resource-id: u4, resource-qty: u4}, {resource-id: u29, resource-qty: u1}, {resource-id: u2, resource-qty: u6}]}, {id: u31, level-up-data: [{resource-id: u3, resource-qty: u6}, {resource-id: u4, resource-qty: u6}, {resource-id: u30, resource-qty: u1}, {resource-id: u2, resource-qty: u7}]}, {id: u33, level-up-data: [{resource-id: u3, resource-qty: u3}, {resource-id: u32, resource-qty: u1}, {resource-id: u2, resource-qty: u1}]}, {id: u34, level-up-data: [{resource-id: u3, resource-qty: u5}, {resource-id: u33, resource-qty: u1}, {resource-id: u2, resource-qty: u2}]}, {id: u36, level-up-data: [{resource-id: u4, resource-qty: u3}, {resource-id: u35, resource-qty: u1}, {resource-id: u2, resource-qty: u3}]}, {id: u37, level-up-data: [{resource-id: u4, resource-qty: u5}, {resource-id: u36, resource-qty: u1}, {resource-id: u2, resource-qty: u4}]}, {id: u39, level-up-data: [{resource-id: u3, resource-qty: u4}, {resource-id: u4, resource-qty: u4}, {resource-id: u38, resource-qty: u1}, {resource-id: u2, resource-qty: u6}]}, {id: u40, level-up-data: [{resource-id: u3, resource-qty: u6}, {resource-id: u4, resource-qty: u6}, {resource-id: u39, resource-qty: u1}, {resource-id: u2, resource-qty: u7}]}, {id: u42, level-up-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u41, resource-qty: u1}, {resource-id: u2, resource-qty: u1}]}, {id: u43, level-up-data: [{resource-id: u3, resource-qty: u4}, {resource-id: u42, resource-qty: u1}, {resource-id: u2, resource-qty: u2}]}, {id: u45, level-up-data: [{resource-id: u4, resource-qty: u2}, {resource-id: u44, resource-qty: u1}, {resource-id: u2, resource-qty: u3}]}, {id: u46, level-up-data: [{resource-id: u4, resource-qty: u4}, {resource-id: u45, resource-qty: u1}, {resource-id: u2, resource-qty: u4}]}, {id: u48, level-up-data: [{resource-id: u3, resource-qty: u3}, {resource-id: u4, resource-qty: u3}, {resource-id: u47, resource-qty: u1}, {resource-id: u2, resource-qty: u6}]}, {id: u49, level-up-data: [{resource-id: u3, resource-qty: u5}, {resource-id: u4, resource-qty: u5}, {resource-id: u48, resource-qty: u1}, {resource-id: u2, resource-qty: u7}]}]',
      lvlUpData.result
    );

    // crafting
    let craftingData = chain.callReadOnlyFn(
      contractName,
      getAllCraftingData,
      [
        types.list([
          types.uint(5),
          types.uint(8),
          types.uint(11),
          types.uint(14),
          types.uint(17),
          types.uint(20),
          types.uint(23),
          types.uint(26),
          types.uint(29),
          types.uint(32),
          types.uint(35),
          types.uint(38),
          types.uint(41),
          types.uint(44),
          types.uint(47),
          types.uint(52),
          types.uint(53),
          types.uint(54),
          types.uint(55),
          types.uint(56),
          types.uint(57),
        ]),
      ],
      admin.address
    );
    assertEquals(
      '[{crafting-data: [{resource-id: u3, resource-qty: u4}], id: u5}, {crafting-data: [{resource-id: u4, resource-qty: u4}], id: u8}, {crafting-data: [{resource-id: u7, resource-qty: u1}, {resource-id: u10, resource-qty: u1}, {resource-id: u2, resource-qty: u7}], id: u11}, {crafting-data: [{resource-id: u3, resource-qty: u4}], id: u14}, {crafting-data: [{resource-id: u4, resource-qty: u4}], id: u17}, {crafting-data: [{resource-id: u16, resource-qty: u1}, {resource-id: u19, resource-qty: u1}, {resource-id: u2, resource-qty: u7}], id: u20}, {crafting-data: [{resource-id: u3, resource-qty: u2}], id: u23}, {crafting-data: [{resource-id: u4, resource-qty: u2}], id: u26}, {crafting-data: [{resource-id: u25, resource-qty: u1}, {resource-id: u28, resource-qty: u1}, {resource-id: u2, resource-qty: u5}], id: u29}, {crafting-data: [{resource-id: u3, resource-qty: u2}], id: u32}, {crafting-data: [{resource-id: u4, resource-qty: u2}], id: u35}, {crafting-data: [{resource-id: u34, resource-qty: u1}, {resource-id: u37, resource-qty: u1}, {resource-id: u2, resource-qty: u5}], id: u38}, {crafting-data: [{resource-id: u3, resource-qty: u1}], id: u41}, {crafting-data: [{resource-id: u4, resource-qty: u1}], id: u44}, {crafting-data: [{resource-id: u43, resource-qty: u1}, {resource-id: u46, resource-qty: u1}, {resource-id: u2, resource-qty: u5}], id: u47}, {crafting-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u4, resource-qty: u4}], id: u52}, {crafting-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u50, resource-qty: u4}], id: u53}, {crafting-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u51, resource-qty: u4}], id: u54}, {crafting-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u4, resource-qty: u5}], id: u55}, {crafting-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u50, resource-qty: u5}], id: u56}, {crafting-data: [{resource-id: u3, resource-qty: u2}, {resource-id: u51, resource-qty: u5}], id: u57}]',
      craftingData.result
    );

    // acquisition
    let acquisitionData = chain.callReadOnlyFn(
      contractName,
      getAllAcquisitionData,
      [
        types.list([
          types.uint(3),
          types.uint(4),
          types.uint(5),
          types.uint(6),
          types.uint(9),
          types.uint(14),
          types.uint(16),
          types.uint(18),
          types.uint(21),
          types.uint(25),
          types.uint(27),
          types.uint(30),
          types.uint(34),
          types.uint(36),
          types.uint(38),
          types.uint(42),
          types.uint(43),
          types.uint(45),
          types.uint(50),
          types.uint(51),
          types.uint(52),
          types.uint(53),
          types.uint(54),
          types.uint(55),
          types.uint(56),
          types.uint(57),
        ]),
      ],
      admin.address
    );
    assertEquals(
      '[{acquisition-data: [{resource-id: u1, resource-qty: u3}], id: u3}, {acquisition-data: [{resource-id: u1, resource-qty: u5}], id: u4}, {acquisition-data: [{resource-id: u1, resource-qty: u15}], id: u5}, {acquisition-data: [{resource-id: u1, resource-qty: u40}, {resource-id: u3, resource-qty: u7}], id: u6}, {acquisition-data: [{resource-id: u1, resource-qty: u5}, {resource-id: u4, resource-qty: u20}], id: u9}, {acquisition-data: [{resource-id: u1, resource-qty: u15}], id: u14}, {acquisition-data: [{resource-id: u1, resource-qty: u50}, {resource-id: u3, resource-qty: u17}], id: u16}, {acquisition-data: [{resource-id: u1, resource-qty: u5}, {resource-id: u4, resource-qty: u20}], id: u18}, {acquisition-data: [{resource-id: u1, resource-qty: u400}, {resource-id: u3, resource-qty: u12}, {resource-id: u4, resource-qty: u12}], id: u21}, {acquisition-data: [{resource-id: u1, resource-qty: u15}, {resource-id: u3, resource-qty: u4}], id: u25}, {acquisition-data: [{resource-id: u1, resource-qty: u230}, {resource-id: u4, resource-qty: u3}], id: u27}, {acquisition-data: [{resource-id: u1, resource-qty: u670}, {resource-id: u3, resource-qty: u7}, {resource-id: u4, resource-qty: u7}], id: u30}, {acquisition-data: [{resource-id: u1, resource-qty: u150}, {resource-id: u3, resource-qty: u4}], id: u34}, {acquisition-data: [{resource-id: u1, resource-qty: u230}, {resource-id: u4, resource-qty: u3}], id: u36}, {acquisition-data: [{resource-id: u1, resource-qty: u370}, {resource-id: u3, resource-qty: u6}, {resource-id: u4, resource-qty: u6}], id: u38}, {acquisition-data: [{resource-id: u1, resource-qty: u25}, {resource-id: u3, resource-qty: u2}], id: u42}, {acquisition-data: [{resource-id: u1, resource-qty: u120}, {resource-id: u3, resource-qty: u5}], id: u43}, {acquisition-data: [{resource-id: u1, resource-qty: u1}, {resource-id: u4, resource-qty: u10}], id: u45}, {acquisition-data: [{resource-id: u1, resource-qty: u500}], id: u50}, {acquisition-data: [{resource-id: u1, resource-qty: u1000}], id: u51}, {acquisition-data: [{resource-id: u1, resource-qty: u15}], id: u52}, {acquisition-data: [{resource-id: u1, resource-qty: u50}], id: u53}, {acquisition-data: [{resource-id: u1, resource-qty: u100}], id: u54}, {acquisition-data: [{resource-id: u1, resource-qty: u30}], id: u55}, {acquisition-data: [{resource-id: u1, resource-qty: u100}], id: u56}, {acquisition-data: [{resource-id: u1, resource-qty: u200}], id: u57}]',
      acquisitionData.result
    );

    // fight resources
    let fightResourcesData = chain.callReadOnlyFn(
      contractName,
      getAllFightResourcesData,
      [types.list([types.uint(1), types.uint(2), types.uint(3), types.uint(4), types.uint(5)])],
      admin.address
    );

    assertEquals(
      '[{fight-number: u1, fight-resources-data: [{resource-id: u2, resource-qty: u10}]}, {fight-number: u2, fight-resources-data: [{resource-id: u2, resource-qty: u12}]}, {fight-number: u3, fight-resources-data: [{resource-id: u2, resource-qty: u15}]}, {fight-number: u4, fight-resources-data: [{resource-id: u2, resource-qty: u19}]}, {fight-number: u5, fight-resources-data: [{resource-id: u2, resource-qty: u30}]}]',
      fightResourcesData.result
    );

    // fight rewards
    let fightRewardsData = chain.callReadOnlyFn(
      contractName,
      getAllFightRewardsData,
      [types.list([types.uint(1), types.uint(2), types.uint(3), types.uint(4), types.uint(5)])],
      admin.address
    );

    assertEquals(
      '[{fight-number: u1, fight-rewards-data: [{resource-id: u1, resource-qty: u100}]}, {fight-number: u2, fight-rewards-data: [{resource-id: u1, resource-qty: u120}]}, {fight-number: u3, fight-rewards-data: [{resource-id: u1, resource-qty: u150}]}, {fight-number: u4, fight-rewards-data: [{resource-id: u1, resource-qty: u190}]}, {fight-number: u5, fight-rewards-data: [{resource-id: u1, resource-qty: u300}, {resource-id: u7, resource-qty: u1}]}]',
      fightRewardsData.result
    );

    // sleeping rewards
    let sleepingRewardsData = chain.callReadOnlyFn(
      contractName,
      getAllSleepingRewardsData,
      [types.list([types.uint(5), types.uint(10), types.uint(20)])],
      admin.address
    );

    assertEquals(
      '[{sleeping-rewards-data: [{resource-id: u2, resource-qty: u5}], sleeping-time: u5}, {sleeping-rewards-data: [{resource-id: u2, resource-qty: u15}], sleeping-time: u10}, {sleeping-rewards-data: [{resource-id: u2, resource-qty: u40}], sleeping-time: u20}]',
      sleepingRewardsData.result
    );

    // mining rewards
    let miningRewardsData = chain.callReadOnlyFn(
      contractName,
      getAllMiningRewardsData,
      [
        types.list([
          types.tuple({
            'token-id': types.uint(55),
            'mining-time': types.uint(5),
          }),
          types.tuple({
            'token-id': types.uint(55),
            'mining-time': types.uint(10),
          }),
          types.tuple({
            'token-id': types.uint(55),
            'mining-time': types.uint(20),
          }),
          types.tuple({
            'token-id': types.uint(56),
            'mining-time': types.uint(5),
          }),
          types.tuple({
            'token-id': types.uint(56),
            'mining-time': types.uint(10),
          }),
          types.tuple({
            'token-id': types.uint(56),
            'mining-time': types.uint(20),
          }),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{mining-item: u55, mining-rewards-data: [{resource-id: u4, resource-qty: u1}], mining-time: u5}, {mining-item: u55, mining-rewards-data: [{resource-id: u4, resource-qty: u3}], mining-time: u10}, {mining-item: u55, mining-rewards-data: [{resource-id: u4, resource-qty: u5}, {resource-id: u50, resource-qty: u1}], mining-time: u20}, {mining-item: u56, mining-rewards-data: [{resource-id: u4, resource-qty: u4}], mining-time: u5}, {mining-item: u56, mining-rewards-data: [{resource-id: u4, resource-qty: u11}, {resource-id: u50, resource-qty: u2}], mining-time: u10}, {mining-item: u56, mining-rewards-data: [{resource-id: u4, resource-qty: u25}, {resource-id: u50, resource-qty: u3}, {resource-id: u51, resource-qty: u1}], mining-time: u20}]',
      miningRewardsData.result
    );

    // harvesting rewards
    let harvestingRewardsData = chain.callReadOnlyFn(
      contractName,
      getAllHarvestingRewardsData,
      [
        types.list([
          types.tuple({
            'token-id': types.uint(52),
            'harvesting-time': types.uint(5),
          }),
          types.tuple({
            'token-id': types.uint(52),
            'harvesting-time': types.uint(10),
          }),
          types.tuple({
            'token-id': types.uint(52),
            'harvesting-time': types.uint(20),
          }),
          types.tuple({
            'token-id': types.uint(53),
            'harvesting-time': types.uint(5),
          }),
          types.tuple({
            'token-id': types.uint(53),
            'harvesting-time': types.uint(10),
          }),
          types.tuple({
            'token-id': types.uint(53),
            'harvesting-time': types.uint(20),
          }),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{harvesting-item: u52, harvesting-rewards-data: [{resource-id: u3, resource-qty: u1}], harvesting-time: u5}, {harvesting-item: u52, harvesting-rewards-data: [{resource-id: u3, resource-qty: u3}], harvesting-time: u10}, {harvesting-item: u52, harvesting-rewards-data: [{resource-id: u3, resource-qty: u7}], harvesting-time: u20}, {harvesting-item: u53, harvesting-rewards-data: [{resource-id: u3, resource-qty: u5}], harvesting-time: u5}, {harvesting-item: u53, harvesting-rewards-data: [{resource-id: u3, resource-qty: u12}], harvesting-time: u10}, {harvesting-item: u53, harvesting-rewards-data: [{resource-id: u3, resource-qty: u26}], harvesting-time: u20}]',
      harvestingRewardsData.result
    );

    // token names

    let tokenNameData = chain.callReadOnlyFn(
      contractName,
      getAllTokenName,
      [
        types.list([
          types.uint(1),
          types.uint(2),
          types.uint(3),
          types.uint(4),
          types.uint(5),
          types.uint(6),
          types.uint(7),
          types.uint(8),
          types.uint(9),
          types.uint(10),
          types.uint(11),
          types.uint(12),
          types.uint(13),
          types.uint(14),
          types.uint(15),
          types.uint(16),
          types.uint(17),
          types.uint(18),
          types.uint(19),
          types.uint(20),
          types.uint(21),
          types.uint(22),
          types.uint(23),
          types.uint(24),
          types.uint(25),
          types.uint(26),
          types.uint(27),
          types.uint(28),
          types.uint(29),
          types.uint(30),
          types.uint(31),
          types.uint(32),
          types.uint(33),
          types.uint(34),
          types.uint(35),
          types.uint(36),
          types.uint(37),
          types.uint(38),
          types.uint(39),
          types.uint(40),
          types.uint(41),
          types.uint(42),
          types.uint(43),
          types.uint(44),
          types.uint(45),
          types.uint(46),
          types.uint(47),
          types.uint(48),
          types.uint(49),
          types.uint(50),
          types.uint(51),
          types.uint(52),
          types.uint(53),
          types.uint(54),
          types.uint(55),
          types.uint(56),
          types.uint(57),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{id: u1, token-name-data: (some {name: "gold", type: "resource", values: {defense: u0, dmg: u0, health: u0}})}, {id: u2, token-name-data: (some {name: "energy-power", type: "resource", values: {defense: u0, dmg: u0, health: u0}})}, {id: u3, token-name-data: (some {name: "wood", type: "resource", values: {defense: u0, dmg: u0, health: u0}})}, {id: u4, token-name-data: (some {name: "iron", type: "resource", values: {defense: u0, dmg: u0, health: u0}})}, {id: u5, token-name-data: (some {name: "wooden_sword_1", type: "sword", values: {defense: u0, dmg: u1, health: u0}})}, {id: u6, token-name-data: (some {name: "wooden_sword_2", type: "sword", values: {defense: u0, dmg: u2, health: u0}})}, {id: u7, token-name-data: (some {name: "wooden_sword_3", type: "sword", values: {defense: u0, dmg: u4, health: u0}})}, {id: u8, token-name-data: (some {name: "iron_sword_1", type: "sword", values: {defense: u0, dmg: u3, health: u0}})}, {id: u9, token-name-data: (some {name: "iron_sword_2", type: "sword", values: {defense: u0, dmg: u6, health: u0}})}, {id: u10, token-name-data: (some {name: "iron_sword_3", type: "sword", values: {defense: u0, dmg: u9, health: u0}})}, {id: u11, token-name-data: (some {name: "enhanced_sword_1", type: "sword", values: {defense: u0, dmg: u11, health: u0}})}, {id: u12, token-name-data: (some {name: "enhanced_sword_2", type: "sword", values: {defense: u0, dmg: u15, health: u0}})}, {id: u13, token-name-data: (some {name: "enhanced_sword_3", type: "sword", values: {defense: u0, dmg: u19, health: u0}})}, {id: u14, token-name-data: (some {name: "wooden_armor_1", type: "armor", values: {defense: u5, dmg: u0, health: u10}})}, {id: u15, token-name-data: (some {name: "wooden_armor_2", type: "armor", values: {defense: u8, dmg: u0, health: u15}})}, {id: u16, token-name-data: (some {name: "wooden_armor_3", type: "armor", values: {defense: u11, dmg: u0, health: u20}})}, {id: u17, token-name-data: (some {name: "iron_armor_1", type: "armor", values: {defense: u10, dmg: u0, health: u15}})}, {id: u18, token-name-data: (some {name: "iron_armor_2", type: "armor", values: {defense: u14, dmg: u0, health: u25}})}, {id: u19, token-name-data: (some {name: "iron_armor_3", type: "armor", values: {defense: u18, dmg: u0, health: u35}})}, {id: u20, token-name-data: (some {name: "enhanced_armor_1", type: "armor", values: {defense: u25, dmg: u0, health: u50}})}, {id: u21, token-name-data: (some {name: "enhanced_armor_2", type: "armor", values: {defense: u30, dmg: u0, health: u65}})}, {id: u22, token-name-data: (some {name: "enhanced_armor_3", type: "armor", values: {defense: u35, dmg: u0, health: u80}})}, {id: u23, token-name-data: (some {name: "wooden_shield_1", type: "shield", values: {defense: u5, dmg: u0, health: u0}})}, {id: u24, token-name-data: (some {name: "wooden_shield_2", type: "shield", values: {defense: u10, dmg: u0, health: u0}})}, {id: u25, token-name-data: (some {name: "wooden_shield_3", type: "shield", values: {defense: u15, dmg: u0, health: u0}})}, {id: u26, token-name-data: (some {name: "iron_shield_1", type: "shield", values: {defense: u13, dmg: u0, health: u0}})}, {id: u27, token-name-data: (some {name: "iron_shield_2", type: "shield", values: {defense: u19, dmg: u0, health: u0}})}, {id: u28, token-name-data: (some {name: "iron_shield_3", type: "shield", values: {defense: u25, dmg: u0, health: u0}})}, {id: u29, token-name-data: (some {name: "enhanced_shield_1", type: "shield", values: {defense: u35, dmg: u0, health: u0}})}, {id: u30, token-name-data: (some {name: "enhanced_shield_2", type: "shield", values: {defense: u45, dmg: u0, health: u0}})}, {id: u31, token-name-data: (some {name: "enhanced_shield_3", type: "shield", values: {defense: u55, dmg: u0, health: u0}})}, {id: u32, token-name-data: (some {name: "wooden_helmet_1", type: "helmet", values: {defense: u0, dmg: u0, health: u10}})}, {id: u33, token-name-data: (some {name: "wooden_helmet_2", type: "helmet", values: {defense: u0, dmg: u0, health: u17}})}, {id: u34, token-name-data: (some {name: "wooden_helmet_3", type: "helmet", values: {defense: u0, dmg: u0, health: u24}})}, {id: u35, token-name-data: (some {name: "iron_helmet_1", type: "helmet", values: {defense: u0, dmg: u0, health: u20}})}, {id: u36, token-name-data: (some {name: "iron_helmet_2", type: "helmet", values: {defense: u0, dmg: u0, health: u30}})}, {id: u37, token-name-data: (some {name: "iron_helmet_3", type: "helmet", values: {defense: u0, dmg: u0, health: u40}})}, {id: u38, token-name-data: (some {name: "enhanced_helmet_1", type: "helmet", values: {defense: u0, dmg: u0, health: u55}})}, {id: u39, token-name-data: (some {name: "enhanced_helmet_2", type: "helmet", values: {defense: u0, dmg: u0, health: u70}})}, {id: u40, token-name-data: (some {name: "enhanced_helmet_3", type: "helmet", values: {defense: u0, dmg: u0, health: u85}})}, {id: u41, token-name-data: (some {name: "wooden_shoes_1", type: "shoes", values: {defense: u2, dmg: u0, health: u0}})}, {id: u42, token-name-data: (some {name: "wooden_shoes_2", type: "shoes", values: {defense: u4, dmg: u0, health: u0}})}, {id: u43, token-name-data: (some {name: "wooden_shoes_3", type: "shoes", values: {defense: u6, dmg: u0, health: u0}})}, {id: u44, token-name-data: (some {name: "iron_shoes_1", type: "shoes", values: {defense: u5, dmg: u0, health: u0}})}, {id: u45, token-name-data: (some {name: "iron_shoes_2", type: "shoes", values: {defense: u8, dmg: u0, health: u0}})}, {id: u46, token-name-data: (some {name: "iron_shoes_3", type: "shoes", values: {defense: u11, dmg: u0, health: u0}})}, {id: u47, token-name-data: (some {name: "enhanced_shoes_1", type: "shoes", values: {defense: u14, dmg: u0, health: u0}})}, {id: u48, token-name-data: (some {name: "enhanced_shoes_2", type: "shoes", values: {defense: u18, dmg: u0, health: u0}})}, {id: u49, token-name-data: (some {name: "enhanced_shoes_3", type: "shoes", values: {defense: u22, dmg: u0, health: u0}})}, {id: u50, token-name-data: (some {name: "gold-bar", type: "resource", values: {defense: u0, dmg: u0, health: u0}})}, {id: u51, token-name-data: (some {name: "ruby", type: "resource", values: {defense: u0, dmg: u0, health: u0}})}, {id: u52, token-name-data: (some {name: "iron_axe", type: "axe", values: {defense: u0, dmg: u4, health: u3}})}, {id: u53, token-name-data: (some {name: "gold_axe", type: "axe", values: {defense: u0, dmg: u10, health: u5}})}, {id: u54, token-name-data: (some {name: "ruby_axe", type: "axe", values: {defense: u0, dmg: u18, health: u6}})}, {id: u55, token-name-data: (some {name: "iron_pickaxe", type: "pickaxe", values: {defense: u0, dmg: u5, health: u3}})}, {id: u56, token-name-data: (some {name: "gold_pickaxe", type: "pickaxe", values: {defense: u0, dmg: u12, health: u5}})}, {id: u57, token-name-data: (some {name: "ruby_pickaxe", type: "pickaxe", values: {defense: u0, dmg: u22, health: u6}})}]',
      tokenNameData.result
    );

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintWrapper,
        [types.uint(gold), types.uint(10), types.principal(admin.address)],
        admin.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);

    let balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [
        types.principal(admin.address),
        types.list([
          types.uint(1),
          types.uint(2),
          types.uint(3),
          types.uint(4),
          types.uint(5),
          types.uint(6),
          types.uint(7),
          types.uint(8),
          types.uint(9),
          types.uint(10),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u10), token-id: u1}, {balance: (ok u0), token-id: u2}, {balance: (ok u0), token-id: u3}, {balance: (ok u0), token-id: u4}, {balance: (ok u0), token-id: u5}, {balance: (ok u0), token-id: u6}, {balance: (ok u0), token-id: u7}, {balance: (ok u0), token-id: u8}, {balance: (ok u0), token-id: u9}, {balance: (ok u0), token-id: u10}]',
      balances.result
    );

    balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [
        types.principal(admin.address),
        types.list([
          types.uint(11),
          types.uint(12),
          types.uint(13),
          types.uint(14),
          types.uint(15),
          types.uint(16),
          types.uint(17),
          types.uint(18),
          types.uint(19),
          types.uint(20),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u0), token-id: u11}, {balance: (ok u0), token-id: u12}, {balance: (ok u0), token-id: u13}, {balance: (ok u0), token-id: u14}, {balance: (ok u0), token-id: u15}, {balance: (ok u0), token-id: u16}, {balance: (ok u0), token-id: u17}, {balance: (ok u0), token-id: u18}, {balance: (ok u0), token-id: u19}, {balance: (ok u0), token-id: u20}]',
      balances.result
    );

    balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [
        types.principal(admin.address),
        types.list([
          types.uint(21),
          types.uint(22),
          types.uint(23),
          types.uint(24),
          types.uint(25),
          types.uint(26),
          types.uint(27),
          types.uint(28),
          types.uint(29),
          types.uint(30),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u0), token-id: u21}, {balance: (ok u0), token-id: u22}, {balance: (ok u0), token-id: u23}, {balance: (ok u0), token-id: u24}, {balance: (ok u0), token-id: u25}, {balance: (ok u0), token-id: u26}, {balance: (ok u0), token-id: u27}, {balance: (ok u0), token-id: u28}, {balance: (ok u0), token-id: u29}, {balance: (ok u0), token-id: u30}]',
      balances.result
    );

    balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [
        types.principal(admin.address),
        types.list([
          types.uint(31),
          types.uint(32),
          types.uint(33),
          types.uint(34),
          types.uint(35),
          types.uint(36),
          types.uint(37),
          types.uint(38),
          types.uint(39),
          types.uint(40),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u0), token-id: u31}, {balance: (ok u0), token-id: u32}, {balance: (ok u0), token-id: u33}, {balance: (ok u0), token-id: u34}, {balance: (ok u0), token-id: u35}, {balance: (ok u0), token-id: u36}, {balance: (ok u0), token-id: u37}, {balance: (ok u0), token-id: u38}, {balance: (ok u0), token-id: u39}, {balance: (ok u0), token-id: u40}]',
      balances.result
    );

    balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [
        types.principal(admin.address),
        types.list([
          types.uint(41),
          types.uint(42),
          types.uint(43),
          types.uint(44),
          types.uint(45),
          types.uint(46),
          types.uint(47),
          types.uint(48),
          types.uint(49),
          types.uint(50),
        ]),
      ],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u0), token-id: u41}, {balance: (ok u0), token-id: u42}, {balance: (ok u0), token-id: u43}, {balance: (ok u0), token-id: u44}, {balance: (ok u0), token-id: u45}, {balance: (ok u0), token-id: u46}, {balance: (ok u0), token-id: u47}, {balance: (ok u0), token-id: u48}, {balance: (ok u0), token-id: u49}, {balance: (ok u0), token-id: u50}]',
      balances.result
    );

    balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [
        types.principal(admin.address),
        types.list([types.uint(51), types.uint(52), types.uint(53), types.uint(54), types.uint(55)]),
      ],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u0), token-id: u51}, {balance: (ok u0), token-id: u52}, {balance: (ok u0), token-id: u53}, {balance: (ok u0), token-id: u54}, {balance: (ok u0), token-id: u55}]',
      balances.result
    );

    balances = chain.callReadOnlyFn(
      contractName,
      allBalancesUser,
      [types.principal(admin.address), types.list([types.uint(56), types.uint(57), types.uint(58)])],
      admin.address
    );

    assertEquals(
      '[{balance: (ok u0), token-id: u56}, {balance: (ok u0), token-id: u57}, {balance: (err u105), token-id: u58}]',
      balances.result
    );
  },
});
