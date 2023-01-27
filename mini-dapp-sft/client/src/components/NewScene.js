import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import NavBar from './NavBar';
import shopBackground from '../resources/shop.png';
import fightBackground from '../resources/battle.png';
import monsterImg1 from '../resources/enemies/1.png';
import monsterImg2 from '../resources/enemies/2.png';
import monsterImg3 from '../resources/enemies/3.png';
import monsterImg4 from '../resources/enemies/4.png';
import monsterImg5 from '../resources/enemies/5.png';
import monsterImg6 from '../resources/enemies/6.png';
import monsterImg7 from '../resources/enemies/7.png';
import monsterImg8 from '../resources/enemies/8.png';
import monsterImg9 from '../resources/enemies/9.png';
import monsterImg10 from '../resources/enemies/10.png';

import { baseImgUrl, basePinataUrl } from '../constants/baseImgUrl';
import { acquisitionList, craftingList, itemTypeDictionary, levelUpList } from '../constants/dataLists';
import { StacksMainnet, StacksMocknet, StacksTestnet } from '@stacks/network';
import { network } from '../constants/network';
import { AnchorMode, PostConditionMode, uintCV } from '@stacks/transactions';
import { contractAddress, contractName, functionName } from '../constants/contract';
import { activeNetwork } from './MainMenu';
import { attackScale, fightMechanics } from '../fight/fightEngine';
import { getGFTMintPostConds } from '../utils/makePostConditions';

export const NewScene = (props) => {
  // make a fn to get an id as an arg and return whether true or false (if sufficient balance)
  const {
    operation,
    menuPage,
    mainDataDictionary,
    selectedSword,
    selectedArmor,
    selectedShield,
    selectedHelmet,
    selectedShoes,
    nextFight,
    lastFightWon,
    setSelectedSword,
    setSelectedArmor,
    setSelectedShield,
    setSelectedHelmet,
    setSelectedShoes,
    setMenuPage,
    setLastFightWon,
  } = props;
  const { doContractCall } = useConnect();
  const [selectedType, setSelectedType] = useState('sword');
  const [selectedItem, setSelectedItem] = useState(0);
  const craftLikeOperationList = ['Craft', 'LevelUp'];
  const monsterImages = {
    1: monsterImg1,
    2: monsterImg2,
    3: monsterImg3,
    4: monsterImg4,
    5: monsterImg5,
    6: monsterImg6,
    7: monsterImg7,
    8: monsterImg8,
    9: monsterImg9,
    10: monsterImg10,
  };
  // const startFight = () => {
  //   let rewardList = [];
  //   Object.keys(mainDataDictionary['fighting-rewards'][nextFight]).forEach((rewardSet) => {
  //     rewardList[mainDataDictionary['fighting-rewards'][nextFight][rewardSet]['resource-id']]
  //   });
  // };
  const checkBalanceByOperation = (itemId, operation) => {
    let value = true;
    Object.keys(mainDataDictionary[operation][itemId]).forEach((resourceSet) => {
      let resourceId = mainDataDictionary[operation][itemId][resourceSet]['resource-id'].value;
      let resourceQty = parseInt(mainDataDictionary[operation][itemId][resourceSet]['resource-qty'].value);
      if (parseInt(mainDataDictionary['balances'][resourceId]) < resourceQty) {
        value = false;
      }
    });
    return value;
  };
  const userStats = {
    health:
      100 +
      (selectedArmor != '' ? parseInt(mainDataDictionary['token-name'][selectedArmor].values.health) : 0) +
      (selectedHelmet != '' ? parseInt(mainDataDictionary['token-name'][selectedHelmet].values.health) : 0),
    damage: selectedSword != '' ? mainDataDictionary['token-name'][selectedSword].values.damage : 0,
    defense:
      (selectedArmor != '' ? parseInt(mainDataDictionary['token-name'][selectedArmor].values.defense) : 0) +
      (selectedShield != '' ? parseInt(mainDataDictionary['token-name'][selectedShield].values.defense) : 0), //shield armor
  };
  const enemyStats = {
    health: 100 + parseInt(mainDataDictionary['EnemyData'][nextFight.toString()]['health']),
    damage: parseInt(mainDataDictionary['EnemyData'][nextFight.toString()]['damage']),
    defense: parseInt(mainDataDictionary['EnemyData'][nextFight.toString()]['defense']),
  };

  const contractCallAction = (id) => {
    let postConditions = [];
    // postConditions= operation=='Craft'?
    // if (operation == operation) {
    Object.keys(mainDataDictionary[operation][id]).forEach((resourcePair) => {
      console.log('resourcePair', resourcePair);
      let amount = mainDataDictionary[operation][id][resourcePair]['resource-qty'].value;
      let nftIndex = mainDataDictionary[operation][id][resourcePair]['resource-id'].value;
      console.log(nftIndex);
      let contractNameLocal =
        parseInt(nftIndex) < 5
          ? contractName.resources
          : parseInt(nftIndex) < 50
          ? contractName.items
          : parseInt(nftIndex) < 58
          ? contractName.collection1
          : '';
      let balanceNftIndex = parseInt(mainDataDictionary['balances'][nftIndex]);
      let assetName = 'semi-fungible-token-id';
      let eventType = 'burn';
      postConditions = postConditions.concat(
        getGFTMintPostConds(amount, balanceNftIndex, contractNameLocal, nftIndex, assetName, eventType)
      );
    });
    postConditions =
      parseInt(mainDataDictionary['balances'][id]) > 0
        ? id < 5
          ? postConditions.concat(
              getGFTMintPostConds(
                '1',
                mainDataDictionary['balances'][id],
                contractName.resources,
                id,
                'semi-fungible-token-id',
                'mint'
              )
            )
          : id < 50
          ? postConditions.concat(
              getGFTMintPostConds(
                '1',
                mainDataDictionary['balances'][id],
                contractName.items,
                id,
                'semi-fungible-token-id',
                'mint'
              )
            )
          : id < 58
          ? postConditions.concat(
              getGFTMintPostConds(
                '1',
                mainDataDictionary['balances'][id],
                contractName.collection1,
                id,
                'semi-fungible-token-id',
                'mint'
              )
            )
          : postConditions
        : postConditions;

    // operation == 'Fight'
    //   ? nextFight == 5 || nextFight == 10
    //     ? getGFTMintPostConds(
    //         mainDataDictionary['fighting-rewards'][nextFight][1]['resource-qty'].value,
    //         mainDataDictionary['balances'][mainDataDictionary['fighting-rewards'][nextFight][1]['resource-id'].value],
    //         contractName.resources,
    //         mainDataDictionary['fighting-rewards'][nextFight][1]['resource-id'].value,
    //         'semi-fungible-token-id',
    //         'mint'
    //       ).concat(
    //         getGFTMintPostConds(
    //           mainDataDictionary['fighting-rewards'][nextFight][2]['resource-qty'].value,
    //           mainDataDictionary['balances'][
    //             mainDataDictionary['fighting-rewards'][nextFight][1]['resource-id'].value
    //           ],
    //           contractName.items,
    //           mainDataDictionary['fighting-rewards'][nextFight][2]['resource-id'].value,
    //           'semi-fungible-token-id',
    //           'mint'
    //         )
    //       )
    //     : getGFTMintPostConds(
    //         mainDataDictionary['fighting-rewards'][nextFight][1]['resource-qty'].value,
    //         mainDataDictionary['balances'][mainDataDictionary['fighting-rewards'][nextFight][1]['resource-id'].value],
    //         contractName.resources,
    //         mainDataDictionary['fighting-rewards'][nextFight][1]['resource-id'].value,
    //         'semi-fungible-token-id',
    //         'mint'
    //       )
    //   : [];
    console.log(postConditions);
    doContractCall({
      network: activeNetwork,
      anchorMode: AnchorMode.Any,
      contractAddress: contractAddress[network],
      contractName: contractName.main,
      functionName: functionName[operation],
      functionArgs: [uintCV(id)],
      postConditionMode:
        Object.keys(mainDataDictionary[operation][id]).length == 1 ? PostConditionMode.Deny : PostConditionMode.Allow,
      postConditions: Object.keys(mainDataDictionary[operation][id]).length == 1 ? postConditions : [],
      onFinish: (data) => {
        console.log(`Finished ${operation}`, data);
        console.log(`Check transaction with txId: ${data.txId}`);
      },
      onCancel: () => {
        console.log(`Canceled: ${operation}`);
      },
    });
  };

  const checkBalanceById = (itemId) => {
    if (parseInt(mainDataDictionary['balances'][itemId]) == 0) {
      return false;
    } else return true;
  };

  const resourcesFunction = () => {
    setSelectedType('resource');
  };
  const swordFunction = () => {
    setSelectedType('sword');
  };
  const armorFunction = () => {
    setSelectedType('armor');
  };
  const shieldFunction = () => {
    setSelectedType('shield');
  };
  const helmetFunction = () => {
    setSelectedType('helmet');
  };
  const shoesFunction = () => {
    setSelectedType('shoes');
  };
  const axeFunction = () => {
    setSelectedType('axe');
  };
  const pickAxeFunction = () => {
    setSelectedType('pickaxe');
  };
  const onClickBack = () => {
    setSelectedItem(0);
    setMenuPage('MainMenu');
  };
  const onClickItem = (itemId) => {
    setSelectedItem(itemId);
  };
  const onClickInventory = (itemId) => {
    if (selectedType == 'sword') {
      localStorage.setItem('selectedSword', itemId);
      setSelectedSword(itemId.toString());
    } else if (selectedType == 'armor') {
      localStorage.setItem('selectedArmor', itemId);
      setSelectedArmor(itemId.toString());
    } else if (selectedType == 'shield') {
      localStorage.setItem('selectedShield', itemId);
      setSelectedShield(itemId.toString());
    } else if (selectedType == 'helmet') {
      localStorage.setItem('selectedHelmet', itemId);
      setSelectedHelmet(itemId.toString());
    } else if (selectedType == 'shoes') {
      localStorage.setItem('selectedShoes', itemId);
      setSelectedShoes(itemId.toString());
    }
  };
  const unequipItems = () => {
    localStorage.setItem('selectedSword', '');
    localStorage.setItem('selectedArmor', '');
    localStorage.setItem('selectedShield', '');
    localStorage.setItem('selectedHelmet', '');
    localStorage.setItem('selectedShoes', '');
    setSelectedSword('');
    setSelectedArmor('');
    setSelectedShield('');
    setSelectedHelmet('');
    setSelectedShoes('');
  };
  const newSceneMapping = {
    Shop: (
      <div>
        <img className="new-scene-full" src={shopBackground}></img>
        <br></br>
        <div className="left-div">
          <h4>Items List</h4>
          <br></br>
          <br></br>
          {itemTypeDictionary[selectedType].map((item) => {
            if (acquisitionList.indexOf(item) > -1)
              if (checkBalanceByOperation(item, 'Shop'))
                return (
                  <div key={item} className="img-container-new-scene" onClick={() => onClickItem(item)}>
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>{mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')}</figcaption>
                    </figure>
                  </div>
                );
              else
                return (
                  <div key={item} className="img-container-new-scene-no-balance" onClick={() => onClickItem(item)}>
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>{mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')}</figcaption>
                    </figure>
                  </div>
                );
          })}
        </div>
        <div className="right-div">
          <h4>Item Info</h4>
          <br></br>
          {selectedItem != 0 && (
            <div>
              {mainDataDictionary['token-name'][selectedItem].name.replaceAll('_', ' ').toUpperCase()}
              <br></br>
              <br></br>
              Damage: {mainDataDictionary['token-name'][selectedItem].values.damage}
              <br></br>
              Defence: {mainDataDictionary['token-name'][selectedItem].values.defense}
              <br></br>
              Health: {mainDataDictionary['token-name'][selectedItem].values.health}
              <br></br>
              <br></br>
              Needed Resources:
              <br></br>
              {mainDataDictionary.Shop[selectedItem] &&
                Object.keys(mainDataDictionary.Shop[selectedItem]).map((resourceSet) => {
                  if (
                    parseInt(
                      mainDataDictionary['balances'][
                        mainDataDictionary.Shop[selectedItem][resourceSet]['resource-id'].value
                      ]
                    ) >= parseInt(mainDataDictionary.Shop[selectedItem][resourceSet]['resource-qty'].value)
                  )
                    return (
                      <div className="img-container-new-scene">
                        <figure>
                          <img
                            src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                              mainDataDictionary.itemsImages[
                                mainDataDictionary.Shop[selectedItem][resourceSet]['resource-id'].value
                              ]
                            }`}
                          ></img>
                          <figcaption>
                            {mainDataDictionary.Shop[selectedItem][resourceSet]['resource-qty'].value}
                          </figcaption>
                        </figure>
                      </div>
                    );
                  else
                    return (
                      <div className="img-container-new-scene">
                        <figure>
                          <img
                            src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                              mainDataDictionary.itemsImages[
                                mainDataDictionary.Shop[selectedItem][resourceSet]['resource-id'].value
                              ]
                            }`}
                          ></img>
                          <figcaption className="font-color-no-balance">
                            {mainDataDictionary.Shop[selectedItem][resourceSet]['resource-qty'].value}
                          </figcaption>
                        </figure>
                      </div>
                    );
                })}
              <div>
                <button
                  disabled={selectedItem && operation == 'Shop' ? !checkBalanceByOperation(selectedItem, 'Shop') : true}
                  onClick={() => contractCallAction(selectedItem)}
                >
                  Buy item
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="close-btn" onClick={onClickBack}>
          Back to map
        </button>
      </div>
    ),
    Craft: (
      <div>
        <img className="new-scene-full" src={shopBackground}></img>
        <br></br>
        <div className="left-div">
          <h4>Items List</h4>
          <br></br>
          <br></br>
          {itemTypeDictionary[selectedType].map((item) => {
            if (craftingList.indexOf(item) > -1)
              if (checkBalanceByOperation(item, 'Craft'))
                return (
                  <div key={item} className="img-container-new-scene" onClick={() => onClickItem(item)}>
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>{mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')}</figcaption>
                    </figure>
                  </div>
                );
              else
                return (
                  <div key={item} className="img-container-new-scene-no-balance" onClick={() => onClickItem(item)}>
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>{mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')}</figcaption>
                    </figure>
                  </div>
                );
          })}
        </div>
        <div className="right-div">
          <h4>Item Info</h4>
          <br></br>
          {selectedItem != 0 && (
            <div>
              {mainDataDictionary['token-name'][selectedItem].name.replaceAll('_', ' ').toUpperCase()}
              <br></br>
              <br></br>
              Damage: {mainDataDictionary['token-name'][selectedItem].values.damage}
              <br></br>
              Defence: {mainDataDictionary['token-name'][selectedItem].values.defense}
              <br></br>
              Health: {mainDataDictionary['token-name'][selectedItem].values.health}
              <br></br>
              <br></br>
              Needed Resources:
              <br></br>
              {mainDataDictionary.Craft[selectedItem] &&
                Object.keys(mainDataDictionary.Craft[selectedItem]).map((resourceSet) => {
                  if (
                    parseInt(
                      mainDataDictionary['balances'][
                        mainDataDictionary.Craft[selectedItem][resourceSet]['resource-id'].value
                      ]
                    ) >= parseInt(mainDataDictionary.Craft[selectedItem][resourceSet]['resource-qty'].value)
                  )
                    return (
                      <div className="img-container-new-scene">
                        <figure>
                          <img
                            src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                              mainDataDictionary.itemsImages[
                                mainDataDictionary.Craft[selectedItem][resourceSet]['resource-id'].value
                              ]
                            }`}
                          ></img>
                          <figcaption>
                            {mainDataDictionary.Craft[selectedItem][resourceSet]['resource-qty'].value}
                          </figcaption>
                        </figure>
                      </div>
                    );
                  else
                    return (
                      <div className="img-container-new-scene">
                        <figure>
                          <img
                            src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                              mainDataDictionary.itemsImages[
                                mainDataDictionary.Craft[selectedItem][resourceSet]['resource-id'].value
                              ]
                            }`}
                          ></img>
                          <figcaption className="font-color-no-balance">
                            {mainDataDictionary.Craft[selectedItem][resourceSet]['resource-qty'].value}
                          </figcaption>
                        </figure>
                      </div>
                    );
                })}
              <div>
                <button
                  id="btnCraftItem"
                  disabled={
                    selectedItem && operation == 'Craft' ? !checkBalanceByOperation(selectedItem, 'Craft') : true
                  }
                  onClick={() => {
                    contractCallAction(selectedItem);
                  }}
                >
                  Craft item
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="close-btn" onClick={onClickBack}>
          Back to map
        </button>
      </div>
    ),
    LevelUp: (
      <div>
        <img className="new-scene-full" src={shopBackground}></img>
        <br></br>
        <div className="left-div">
          <h4>Items List</h4>
          <br></br>
          <br></br>
          {itemTypeDictionary[selectedType].map((item) => {
            if (levelUpList.indexOf(item) > -1)
              if (checkBalanceByOperation(item, 'LevelUp'))
                return (
                  <div key={item} className="img-container-new-scene" onClick={() => onClickItem(item)}>
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>{mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')}</figcaption>
                    </figure>
                  </div>
                );
              else
                return (
                  <div key={item} className="img-container-new-scene-no-balance" onClick={() => onClickItem(item)}>
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>{mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')}</figcaption>
                    </figure>
                  </div>
                );
          })}
        </div>
        <div className="right-div">
          <h4>Item Info</h4>
          <br></br>
          {selectedItem != 0 && (
            <div>
              {mainDataDictionary['token-name'][selectedItem].name.replaceAll('_', ' ').toUpperCase()}
              <br></br>
              <br></br>
              Damage: {mainDataDictionary['token-name'][selectedItem].values.damage}
              <br></br>
              Defence: {mainDataDictionary['token-name'][selectedItem].values.defense}
              <br></br>
              Health: {mainDataDictionary['token-name'][selectedItem].values.health}
              <br></br>
              <br></br>
              Needed Resources:
              <br></br>
              {mainDataDictionary['LevelUp'][selectedItem] &&
                Object.keys(mainDataDictionary['LevelUp'][selectedItem]).map((resourceSet) => {
                  if (
                    parseInt(
                      mainDataDictionary['balances'][
                        mainDataDictionary['LevelUp'][selectedItem][resourceSet]['resource-id'].value
                      ]
                    ) >= parseInt(mainDataDictionary['LevelUp'][selectedItem][resourceSet]['resource-qty'].value)
                  )
                    return (
                      <div className="img-container-new-scene">
                        <figure>
                          <img
                            src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                              mainDataDictionary.itemsImages[
                                mainDataDictionary['LevelUp'][selectedItem][resourceSet]['resource-id'].value
                              ]
                            }`}
                          ></img>
                          <figcaption>
                            {mainDataDictionary['LevelUp'][selectedItem][resourceSet]['resource-qty'].value}
                          </figcaption>
                        </figure>
                      </div>
                    );
                  else
                    return (
                      <div className="img-container-new-scene">
                        <figure>
                          <img
                            src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                              mainDataDictionary.itemsImages[
                                mainDataDictionary['LevelUp'][selectedItem][resourceSet]['resource-id'].value
                              ]
                            }`}
                          ></img>
                          <figcaption className="font-color-no-balance">
                            {mainDataDictionary['LevelUp'][selectedItem][resourceSet]['resource-qty'].value}
                          </figcaption>
                        </figure>
                      </div>
                    );
                })}
              <div>
                <button
                  id="btnLevelUp"
                  disabled={
                    selectedItem && operation == 'LevelUp' ? !checkBalanceByOperation(selectedItem, 'LevelUp') : true
                  }
                  onClick={() => {
                    contractCallAction(selectedItem);
                  }}
                >
                  Level up item
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="close-btn" onClick={onClickBack}>
          Back to map
        </button>
      </div>
    ),
    Fight: (
      <div className="new-scene-container">
        <img className="new-scene-full" src={fightBackground}></img>
        <div className="left-div-fight">
          Your stats
          <br></br>
          Attack:
          {userStats.damage * attackScale}
          <br></br>
          Defense:
          {userStats.defense}
          <br></br>
          <div id="userHealth">Health:{userStats.health}</div>
          <br></br>
          <br></br>
          <div className="grid-holder">
            <div className="grid-container">
              <div className="grid-item"></div>
              <div className="grid-item">
                <img
                  className="img-grid"
                  src={`${basePinataUrl}/${mainDataDictionary['itemsImages'][selectedHelmet]}`}
                ></img>
              </div>
              <div className="grid-item"></div>
              <div className="grid-item">
                <img
                  className="img-grid"
                  src={`${basePinataUrl}/${mainDataDictionary['itemsImages'][selectedShield]}`}
                ></img>
              </div>
              <div className="grid-item">
                <img
                  className="img-grid"
                  src={`${basePinataUrl}/${mainDataDictionary['itemsImages'][selectedArmor]}`}
                ></img>
              </div>
              <div className="grid-item">
                <img
                  className="img-grid"
                  src={`${basePinataUrl}/${mainDataDictionary['itemsImages'][selectedSword]}`}
                ></img>
              </div>
              <div className="grid-item"> </div>
              <div className="grid-item">
                <img
                  className="img-grid"
                  src={`${basePinataUrl}/${mainDataDictionary['itemsImages'][selectedShoes]}`}
                ></img>
              </div>
              <div className="grid-item"> </div>
            </div>
          </div>
        </div>
        <div className="center-div-fight" id="fightArena">
          Fight
        </div>
        <div className="right-div-fight">
          Enemy's stats:
          <br></br>
          Attack:
          {enemyStats.damage * attackScale}
          <br></br>
          Defense:
          {enemyStats.defense}
          <br></br>
          <div id="enemyHealth">Health:{enemyStats.health}</div>
          <br></br>
          <br></br>
          <figure>
            <img className="monsterImg" src={`${monsterImages[nextFight]}`}></img>
          </figure>
        </div>
        <br></br>
        {/* <button onClick={() => contractCallAction(nextFight)}>Start fight {nextFight}</button> */}
        <button id="btnStartFight" onClick={() => fightMechanics(userStats, enemyStats, nextFight, mainDataDictionary)}>
          Start fight {nextFight}
        </button>
        <button onClick={onClickBack} className="close-btn">
          Back to map
        </button>
      </div>
    ),
    Inventory: (
      <div>
        <img className="new-scene-full" src={shopBackground}></img>
        <br></br>
        <div className="left-div">
          <h4>Items List</h4>
          <br></br>
          <br></br>
          {itemTypeDictionary[selectedType].map((item) => {
            if (checkBalanceById(item))
              return (
                <div className="tooltipTopInventory">
                  <div key={item} className="img-container-new-scene">
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${mainDataDictionary.itemsImages[item]}`}
                        key={item}
                      ></img>
                      <figcaption>
                        {mainDataDictionary['balances'][item]}
                        <br></br>
                        {/* {mainDataDictionary['token-name'][item].name.replaceAll('_', ' ')} */}
                      </figcaption>
                    </figure>
                  </div>
                  <span className="tooltipTextTopInventory">
                    {selectedType == 'resource' && mainDataDictionary['token-name'][item]['name']}
                    {selectedType != 'resource' && selectedType != 'axe' && selectedType != 'pickaxe' && (
                      <div>
                        {mainDataDictionary['token-name'][item]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][item].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][item].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][item].values.health}
                        <br></br>
                        <button onClick={() => onClickInventory(item)}>Equip</button>
                      </div>
                    )}
                    {(selectedType == 'axe' || selectedType == 'pickaxe') && (
                      <div>
                        {mainDataDictionary['token-name'][item]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][item].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][item].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][item].values.health}
                      </div>
                    )}
                  </span>
                </div>
              );
          })}
        </div>
        <div className="right-div">
          <h4>Equipped Items</h4>
          <br></br>
          <button onClick={unequipItems}>Unequip</button>
          <br></br>
          <div className="grid-holder">
            <div className="grid-container">
              <div className="grid-item"></div>
              <div className="grid-item">
                {selectedHelmet && (
                  <div className="tooltipTopInventory">
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                          mainDataDictionary.itemsImages[parseInt(selectedHelmet)]
                        }`}
                      ></img>
                    </figure>
                    <span className="tooltipTextTopInventory">
                      <div>
                        {mainDataDictionary['token-name'][selectedHelmet]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][selectedHelmet].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][selectedHelmet].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][selectedHelmet].values.health}
                      </div>
                    </span>
                  </div>
                )}
                {!selectedHelmet && <div></div>}
              </div>
              <div className="grid-item"></div>
              <div className="grid-item">
                {selectedShield && (
                  <div className="tooltipTopInventory">
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                          mainDataDictionary.itemsImages[parseInt(selectedShield)]
                        }`}
                      ></img>
                    </figure>
                    <span className="tooltipTextTopInventory">
                      <div>
                        {mainDataDictionary['token-name'][selectedShield]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][selectedShield].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][selectedShield].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][selectedShield].values.health}
                      </div>
                    </span>
                  </div>
                )}
                {!selectedHelmet && <div></div>}
              </div>
              <div className="grid-item">
                {selectedArmor && (
                  <div className="tooltipTopInventory">
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                          mainDataDictionary.itemsImages[parseInt(selectedArmor)]
                        }`}
                      ></img>
                    </figure>
                    <span className="tooltipTextTopInventory">
                      <div>
                        {mainDataDictionary['token-name'][selectedArmor]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][selectedArmor].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][selectedArmor].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][selectedArmor].values.health}
                      </div>
                    </span>
                  </div>
                )}
                {!selectedHelmet && <div></div>}
              </div>
              <div className="grid-item">
                {selectedSword && (
                  <div className="tooltipTopInventory">
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                          mainDataDictionary['itemsImages'][parseInt(selectedSword)]
                        }`}
                      ></img>
                    </figure>
                    <span className="tooltipTextTopInventory">
                      <div>
                        {mainDataDictionary['token-name'][selectedSword]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][selectedSword].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][selectedSword].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][selectedSword].values.health}
                      </div>
                    </span>
                  </div>
                )}
                {!selectedSword && <div></div>}
              </div>

              <div className="grid-item"> </div>
              <div className="grid-item">
                {selectedShoes && (
                  <div className="tooltipTopInventory">
                    <figure>
                      <img
                        src={`https://stacksgamefi.mypinata.cloud/ipfs/${
                          mainDataDictionary.itemsImages[parseInt(selectedShoes)]
                        }`}
                      ></img>
                    </figure>
                    <span className="tooltipTextTopInventory">
                      <div>
                        {mainDataDictionary['token-name'][selectedShoes]['name'].replaceAll('_', ' ').toUpperCase()}
                        <br></br>
                        <br></br>
                        STATISTICS
                        <br></br>
                        <br></br>
                        Damage: {mainDataDictionary['token-name'][selectedShoes].values.damage}
                        <br></br>
                        Defence: {mainDataDictionary['token-name'][selectedShoes].values.defense}
                        <br></br>
                        Health: {mainDataDictionary['token-name'][selectedShoes].values.health}
                      </div>
                    </span>
                  </div>
                )}{' '}
                {!selectedShoes && <div></div>}
              </div>
              <div className="grid-item"> </div>
            </div>
          </div>
        </div>
        <button className="close-btn" onClick={onClickBack}>
          Back to map
        </button>
      </div>
    ),
  };
  return (
    <div className="new-scene-container">
      <h1 className="title-new-scene">{operation}</h1>
      {craftLikeOperationList.indexOf(operation) > -1 && (
        <div className="type-selector-container">
          <ul>
            <li>
              <button onClick={swordFunction}>Swords</button>
            </li>
            <li>
              <button onClick={armorFunction}>Armors</button>
            </li>
            <li>
              <button onClick={shieldFunction}>Shields</button>
            </li>
            <li>
              <button onClick={helmetFunction}>Helmets</button>
            </li>
            <li>
              <button onClick={shoesFunction}>Shoes</button>
            </li>
            <li>
              <button onClick={axeFunction}>Axes</button>
            </li>
            <li>
              <button onClick={pickAxeFunction}>Pickaxes</button>
            </li>
          </ul>
        </div>
      )}
      {(operation == 'Inventory' || operation == 'Shop') && (
        <div className="type-selector-container">
          <ul>
            <li>
              <button onClick={resourcesFunction}>Resources</button>
            </li>
            <li>
              <button onClick={swordFunction}>Swords</button>
            </li>
            <li>
              <button onClick={armorFunction}>Armors</button>
            </li>
            <li>
              <button onClick={shieldFunction}>Shields</button>
            </li>
            <li>
              <button onClick={helmetFunction}>Helmets</button>
            </li>
            <li>
              <button onClick={shoesFunction}>Shoes</button>
            </li>
            <li>
              <button onClick={axeFunction}>Axes</button>
            </li>
            <li>
              <button onClick={pickAxeFunction}>Pickaxes</button>
            </li>
          </ul>
        </div>
      )}
      {newSceneMapping[operation]}
    </div>
  );
};
