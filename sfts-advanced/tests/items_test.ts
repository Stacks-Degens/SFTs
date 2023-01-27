import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.3/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

const errorOwnerOnly = 100;
const errorInsufficientBalance = 101;
const errorAdminOnly = 105;
const contractName = 'items';
const mint = 'mint';
const mintUser = 'mint-user';
const burn = 'burn';
const burnWrapper = 'burn-wrapper';
const transferFn = 'transfer';
const transferManyFn = 'transfer-many';
const transferMemoFn = 'transfer-memo';
const transferManyMemoFn = 'transfer-many-memo';
const transferWrapperFn = 'transfer-wrapper';
const transferManyIterFn = 'transfer-many';
const transferManyMemoIterFn = 'transfer-many';
const getBalance = 'get-balance';
const setTokenURI = 'set-token-uri';
const setTokenName = 'set-token-name';
const getTokenURI = 'get-token-uri';
const getTokenName = 'get-token-name';
const tokenURI8Initial = 'ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/8.json';
const isOwnedNeeded = 'is-owned-needed';
const getOverallBalance = 'get-overall-balance';
const getOverallSupply = 'get-overall-supply';
const getDecimals = 'get-decimals';
const getContractAdmin = 'get-contract-admin';
const setContractAdmin = 'set-contract-admin';
const tokenURI8 = '8.png';
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

Clarinet.test({
  name: 'Items: Mint-Transfer-Burn-Balance Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1');
    const user2 = accounts.get('wallet_2');
    const user3 = accounts.get('wallet_3');

    // mint item x 2

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(woodenArmor1), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(woodenArmor1), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // balance

    let balanceWoodenArmor1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenArmor1), types.principal(admin.address)],
      admin.address
    );

    balanceWoodenArmor1.result.expectOk().expectUint(2);

    // mint 2 items x 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironSword1), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(enhancedHelmet1), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // balance

    let balanceIronSword1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(admin.address)],
      admin.address
    );

    balanceIronSword1.result.expectOk().expectUint(1);

    let balanceEnhancedHelmet1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedHelmet1), types.principal(admin.address)],
      admin.address
    );

    balanceEnhancedHelmet1.result.expectOk().expectUint(1);

    // mint 1 item x (1+1+6)

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(enhancedShield3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(enhancedShield3), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(enhancedShield3), types.uint(6), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 3);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);
    block.receipts[2].result.expectOk().expectBool(true);

    // balance

    let balanceEnhancedShield3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedShield3), types.principal(admin.address)],
      admin.address
    );

    balanceEnhancedShield3.result.expectOk().expectUint(8);

    // mint 2 items x 1

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironShield1), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(woodenShield2), types.uint(1), types.principal(admin.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // balance

    let balanceIronShield1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironShield1), types.principal(admin.address)],
      admin.address
    );

    balanceIronShield1.result.expectOk().expectUint(1);

    let balanceWoodenShield2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield2), types.principal(admin.address)],
      admin.address
    );

    balanceWoodenShield2.result.expectOk().expectUint(1);

    // transfer 5 units of 1 item from admin, then 3 units between users

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(enhancedShield3), types.uint(5), types.principal(admin.address), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(enhancedShield3), types.uint(3), types.principal(user1.address), types.principal(user2.address)],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // balance

    let balanceEnhancedShield3Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedShield3), types.principal(admin.address)],
      admin.address
    );

    balanceEnhancedShield3Admin.result.expectOk().expectUint(3);

    let balanceEnhancedShield3User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedShield3), types.principal(user1.address)],
      user1.address
    );

    balanceEnhancedShield3User1.result.expectOk().expectUint(2);

    let balanceEnhancedShield3User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedShield3), types.principal(user2.address)],
      user2.address
    );

    balanceEnhancedShield3User2.result.expectOk().expectUint(3);

    // transfer 1 item from admin, then between users

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(woodenShield2), types.uint(1), types.principal(admin.address), types.principal(user3.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(woodenShield2), types.uint(1), types.principal(user3.address), types.principal(user1.address)],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 7);

    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    // balance

    let balanceWoodenShield2Admin = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield2), types.principal(admin.address)],
      admin.address
    );

    balanceWoodenShield2Admin.result.expectOk().expectUint(0);

    let balanceWoodenShield2User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield2), types.principal(user3.address)],
      user3.address
    );

    balanceWoodenShield2User3.result.expectOk().expectUint(0);

    let balanceWoodenShield2User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenShield2), types.principal(user1.address)],
      user1.address
    );
    // TODO: error expected u1, got u2
    balanceWoodenShield2User1.result.expectOk().expectUint(1);

    // transfer 1 item from admin

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferFn,
        [types.uint(ironSword1), types.uint(1), types.principal(admin.address), types.principal(user2.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 8);
    block.receipts[0].result.expectOk().expectBool(true);

    // balance

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

    // burn 2 different items

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        burn,
        [types.uint(ironSword1), types.uint(1), types.principal(user2.address)],
        user2.address
      ),
      Tx.contractCall(
        contractName,
        burn,
        [types.uint(enhancedShield3), types.uint(1), types.principal(user1.address)],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 9);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    balanceIronSword1User2 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(user2.address)],
      user2.address
    );

    balanceIronSword1User2.result.expectOk().expectUint(0);

    balanceEnhancedShield3User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(enhancedShield3), types.principal(user1.address)],
      user1.address
    );

    balanceEnhancedShield3User1.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: 'Items: Set-Get Token URI Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1');
    const user2 = accounts.get('wallet_2');
    const user3 = accounts.get('wallet_3');

    let block = chain.mineBlock([Tx.contractCall(contractName, getTokenURI, [types.uint(8)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk();
    assertEquals(block.receipts[0].result, `(ok (some "${tokenURI8Initial}"))`);

    block = chain.mineBlock([
      Tx.contractCall(contractName, setTokenURI, [types.uint(8), types.ascii(tokenURI8)], admin.address),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([Tx.contractCall(contractName, getTokenURI, [types.uint(8)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk();
    assertEquals(block.receipts[0].result, `(ok (some "${tokenURI8}"))`);
    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mintUser,
        [types.uint(woodenArmor1), types.uint(1), types.principal(user1.address)],
        user1.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectErr().expectUint(errorAdminOnly);
  },
});

Clarinet.test({
  name: 'Items: Burn-Wrapper Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1');
    const user2 = accounts.get('wallet_2');
    const user3 = accounts.get('wallet_3');

    // Mint some items

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(woodenSword1), types.uint(1), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironSword1), types.uint(1), types.principal(user3.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        burnWrapper,
        [
          types.tuple({
            'resource-id': types.uint(woodenSword1),
            'resource-qty': types.uint(1),
          }),
        ],
        user1.address
      ),
      Tx.contractCall(
        contractName,
        burnWrapper,
        [
          types.tuple({
            'resource-id': types.uint(ironSword1),
            'resource-qty': types.uint(2),
          }),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectErr().expectUint(errorInsufficientBalance);

    let balanceWoodenSword1User1 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(woodenSword1), types.principal(user1.address)],
      user1.address
    );
    // TODO: Error: Expected u0, got u1
    balanceWoodenSword1User1.result.expectOk().expectUint(0);

    let balanceIronSword1User3 = chain.callReadOnlyFn(
      contractName,
      getBalance,
      [types.uint(ironSword1), types.principal(user3.address)],
      user3.address
    );

    balanceIronSword1User3.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: 'Items: Ownership Test Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1');
    const user2 = accounts.get('wallet_2');
    const user3 = accounts.get('wallet_3');

    // Mint some items

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(woodenSword1), types.uint(1), types.principal(user1.address)],
        admin.address
      ),
      Tx.contractCall(
        contractName,
        mint,
        [types.uint(ironSword1), types.uint(1), types.principal(user3.address)],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(true);

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        isOwnedNeeded,
        [
          types.tuple({
            'resource-id': types.uint(woodenSword1),
            'resource-qty': types.uint(1),
          }),
        ],
        user1.address
      ),
      Tx.contractCall(
        contractName,
        isOwnedNeeded,
        [
          types.tuple({
            'resource-id': types.uint(ironSword1),
            'resource-qty': types.uint(2),
          }),
        ],
        user3.address
      ),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);
    block.receipts[1].result.expectOk().expectBool(false);

    // let balanceWoodenSword1User1 = chain.callReadOnlyFn(
    //   contractName,
    //   getBalance,
    //   [types.uint(woodenSword1), types.principal(user1.address)],
    //   user1.address
    // );

    // balanceWoodenSword1User1.result.expectOk().expectUint(0);

    // let balanceIronSword1User3 = chain.callReadOnlyFn(
    //   contractName,
    //   getBalance,
    //   [types.uint(ironSword1), types.principal(user3.address)],
    //   user3.address
    // );

    // balanceIronSword1User3.result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: 'Items: Balances Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // overall balance

    let overallBalance = chain.callReadOnlyFn(
      contractName,
      getOverallBalance,
      [types.principal(admin.address)],
      admin.address
    );

    overallBalance.result.expectOk().expectUint(0);

    // overall supply

    let overallSupply = chain.callReadOnlyFn(contractName, getOverallSupply, [], admin.address);
    // TODO: Error: Expected u0, got u5
    overallSupply.result.expectOk().expectUint(0);

    // decimals

    let decimals = chain.callReadOnlyFn(contractName, getDecimals, [types.uint(woodenArmor1)], admin.address);

    decimals.result.expectOk().expectUint(0);
  },
});

Clarinet.test({
  name: 'Items: Transfer case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // transfer many

    let block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferManyFn,
        [
          types.list([
            types.tuple({
              'token-id': types.uint(1),
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
        [types.uint(woodenArmor1), types.uint(1), types.principal(admin.address)],
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
          types.buff('abc'),
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
              'token-id': types.uint(1),
              amount: types.uint(1),
              sender: types.principal(admin.address),
              recipient: types.principal(user1.address),
              memo: types.buff('ascjhasjh'),
            }),
          ]),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 5);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);

    // transfer wrapper

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        transferWrapperFn,
        [
          types.tuple({
            'resource-id': types.uint(1),
            'resource-qty': types.uint(1),
          }),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 6);
    block.receipts[0].result.expectErr().expectUint(errorInsufficientBalance);
  },
});
Clarinet.test({
  name: 'Items: Set-Get Token Name Case',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1');
    const user2 = accounts.get('wallet_2');
    const user3 = accounts.get('wallet_3');

    let block = chain.mineBlock([Tx.contractCall(contractName, getTokenName, [types.uint(8)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    block.receipts[0].result.expectOk();
    assertEquals(
      block.receipts[0].result,
      `(ok (some {name: "iron_sword_1", type: "sword", values: {defense: u0, dmg: u3, health: u0}}))`
    );

    // '(ok (some {name: "iron_sword_1", type: "sword", values: {defense: u0, dmg: u3, health: u0}}))

    block = chain.mineBlock([
      Tx.contractCall(
        contractName,
        setTokenName,
        [
          types.uint(8),
          types.tuple({
            name: types.ascii('iron_sword_1'),
            type: types.ascii('sword'),
            values: types.tuple({
              defense: types.uint(0),
              dmg: types.uint(3),
              health: types.uint(9),
            }),
          }),
        ],
        admin.address
      ),
    ]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 3);
    block.receipts[0].result.expectOk().expectBool(true);

    block = chain.mineBlock([Tx.contractCall(contractName, getTokenName, [types.uint(8)], admin.address)]);
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 4);
    block.receipts[0].result.expectOk();
    assertEquals(
      block.receipts[0].result,
      `(ok (some {name: "iron_sword_1", type: "sword", values: {defense: u0, dmg: u3, health: u9}}))`
    );
  },
});

Clarinet.test({
  name: 'Items: Set-Get Contract Admin',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const admin = accounts.get('deployer')!;
    const user1 = accounts.get('wallet_1')!;
    const user2 = accounts.get('wallet_2')!;
    const user3 = accounts.get('wallet_3')!;
    const user4 = accounts.get('wallet_4')!;
    const user5 = accounts.get('wallet_5')!;
    const user6 = accounts.get('wallet_6')!;

    // get contract admin beginning .main-sc
    let contractAdmin = chain.callReadOnlyFn(contractName, getContractAdmin, [], admin.address);
    assertEquals(contractAdmin.result, `${admin.address}.main-sc`);

    // wallet 1 and admin setContractAdmin
    let block = chain.mineBlock([
      Tx.contractCall(contractName, setContractAdmin, [types.principal(user3.address)], user1.address),
      Tx.contractCall(contractName, setContractAdmin, [types.principal(user2.address)], admin.address),
    ]);
    assertEquals(block.receipts.length, 2);
    assertEquals(block.height, 2);

    // walet 1 fails
    block.receipts[0].result.expectErr().expectUint(errorOwnerOnly);
    block.receipts[1].result.expectOk().expectBool(true);
    // admin changes it successfully

    // get contract admin beginning user2 wallets
    contractAdmin = chain.callReadOnlyFn(contractName, getContractAdmin, [], admin.address);
    assertEquals(contractAdmin.result, `${user2.address}`);
  },
});
