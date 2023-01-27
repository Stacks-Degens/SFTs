import { contractAddress, contractName } from '../constants/contract';
import { dataFunctionNames } from '../constants/dataFunctionNames';
import { network } from '../constants/network';
import { readOnlyBase } from '../constants/readOnlyBaseURL';
import {
  fetchReadOnlySimple,
  fetchReadOnlyMining,
  fetchReadOnlyHarvesting,
  fetchReadOnlyBalances,
  fetchReadOnlyStatus,
} from './fetchReadOnly';

export const fetchMainOperationData = async (operation) => {
  /// e.g. operation = fighting-resources
  let operationDictionaryLocal = {};
  let mainOperationsDataLocal = '';
  let startingIndex = 0;
  let total = 6;
  let finalIndex = total;
  let operationList = dataFunctionNames[operation].list;

  while (startingIndex < operationList.length) {
    mainOperationsDataLocal = await fetchReadOnlySimple(
      `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
      operationList.slice(startingIndex, finalIndex)
    );
    startingIndex += total;
    finalIndex += total;

    if (mainOperationsDataLocal != '') {
      // for every returned value, keep number of resources sets (resource-id, resource-qty)

      mainOperationsDataLocal.value.forEach((element) => {
        // key - token id

        let dictionaryKey = element.value[dataFunctionNames[operation].key].value;
        let i = 1;

        // keep only what is necessarry

        element.value[dataFunctionNames[operation].value].value.forEach((resourcePair) => {
          let dictValue = resourcePair.value;

          if (operationDictionaryLocal[dictionaryKey]) operationDictionaryLocal[dictionaryKey][i] = dictValue;
          else
            operationDictionaryLocal[dictionaryKey] = {
              [i]: dictValue,
            };
          i++;
        });
      });
    }
  }
  return operationDictionaryLocal;
};

export const fetchBalancesData = async (operation, userAddress) => {
  let operationDictionaryLocal = {};
  let mainOperationsDataLocal = '';
  let startingIndex = 0;
  let total = 3;
  let finalIndex = total;
  let operationList = dataFunctionNames[operation].list;

  while (startingIndex < operationList.length) {
    await new Promise((r) => setTimeout(r, 200));

    mainOperationsDataLocal = await fetchReadOnlyBalances(
      `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
      operationList.slice(startingIndex, finalIndex),
      userAddress
    );
    startingIndex += total;
    finalIndex += total;
    if (mainOperationsDataLocal != '') {
      // for every returned value, keep number of resources sets (resource-id, resource-qty)

      mainOperationsDataLocal.value.forEach((element) => {
        // key - token id

        let dictionaryKey = element.value[dataFunctionNames[operation].key].value;

        // keep only what is necessarry

        let dictValue = element.value[dataFunctionNames[operation].value].value.value;

        if (operationDictionaryLocal[dictionaryKey]) operationDictionaryLocal[dictionaryKey] = dictValue;
        else
          operationDictionaryLocal = {
            ...operationDictionaryLocal,
            [dictionaryKey]: dictValue,
          };
      });
    }
  }
  return operationDictionaryLocal;
};

export const fetchStatusData = async (operation, userAddress) => {
  /// e.g. operation = fighting-resources
  let operationDictionaryLocal = {};
  let mainOperationsDataLocal = '';
  mainOperationsDataLocal = await fetchReadOnlyStatus(
    `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
    userAddress
  );
  if (mainOperationsDataLocal != '') {
    // for every returned value, keep number of resources sets (resource-id, resource-qty)
    if (operation == 'fightStatus') {
      if (mainOperationsDataLocal.value.value == null)
        operationDictionaryLocal = {
          'next-fight': 1,
        };
      else
        operationDictionaryLocal = {
          'next-fight': mainOperationsDataLocal.value.value.value[dataFunctionNames['fightStatus']['value']].value,
        };
    } else if (operation == 'starterKitStatus') {
      if (mainOperationsDataLocal.value.value == null)
        operationDictionaryLocal = {
          'claimed-starter-kit': false,
        };
      else
        operationDictionaryLocal = {
          'claimed-starter-kit': mainOperationsDataLocal.value.value,
        };
    }
  }

  return operationDictionaryLocal;
};

export const fetchTupleOperationData = async (operation) => {
  /// e.g. operation = fighting-resources
  let operationDictionaryLocal = {};
  let rewardsDataLocal = '';
  let startingIndex = 0;
  let total = 6;
  let finalIndex = total;
  let operationList = dataFunctionNames[operation].list;

  while (startingIndex < operationList.length) {
    if (operation == 'Mine')
      rewardsDataLocal = await fetchReadOnlyMining(
        `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
        operationList.slice(startingIndex, finalIndex)
        /// to check if can put conditional here and get rid of the second function
      );
    else if (operation == 'Harvest')
      rewardsDataLocal = await fetchReadOnlyHarvesting(
        `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
        operationList.slice(startingIndex, finalIndex)
      );
    startingIndex += total;
    finalIndex += total;

    if (rewardsDataLocal != '') {
      // for every returned value, keep number of resources sets (resource-id, resource-qty)

      rewardsDataLocal.value.forEach((element) => {
        // key 1 - mining item

        let dictionaryKey1 = element.value[dataFunctionNames[operation].key1].value;

        // key 2 - mining time

        let dictionaryKey2 = element.value[dataFunctionNames[operation].key2].value;
        let i = 1;

        // keep only what is necessarry from read-only response
        element.value[dataFunctionNames[operation].value].value.forEach((resourcePair) => {
          let dictValue = resourcePair.value; // memorizing resource list item

          if (operationDictionaryLocal[dictionaryKey1]) {
            if (operationDictionaryLocal[dictionaryKey1][dictionaryKey2]) {
              operationDictionaryLocal[dictionaryKey1][dictionaryKey2][i] = dictValue;
            } else {
              operationDictionaryLocal[dictionaryKey1] = {
                ...operationDictionaryLocal[dictionaryKey1],
                [dictionaryKey2]: {},
              };

              operationDictionaryLocal[dictionaryKey1][dictionaryKey2] = {
                [i]: dictValue,
              };
            }
          } else {
            operationDictionaryLocal[dictionaryKey1] = {
              [dictionaryKey2]: i,
            };

            operationDictionaryLocal[dictionaryKey1][dictionaryKey2] = {
              [i]: dictValue,
            };
          }
          i++;
        });
      });
    }
  }
  return operationDictionaryLocal;
};

export const fetchTokenNameData = async (operation) => {
  /// e.g. operation = fighting-resources
  let tokenNameDictionaryLocal = {};
  let tokenNameDataLocal = '';
  let startingIndex = 0;
  let total = 3;
  let finalIndex = total;
  let operationList = dataFunctionNames[operation].list;

  while (startingIndex < operationList.length) {
    await new Promise((r) => setTimeout(r, 150));

    tokenNameDataLocal = await fetchReadOnlySimple(
      `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
      operationList.slice(startingIndex, finalIndex)
    );
    startingIndex += total;
    finalIndex += total;

    if (tokenNameDataLocal != '') {
      // for every returned value, keep number of resources sets (resource-id, resource-qty)

      tokenNameDataLocal.value.forEach((element) => {
        let dictionaryKey = element.value[dataFunctionNames[operation].key].value;
        // keep only what is necessarry

        tokenNameDictionaryLocal = {
          ...tokenNameDictionaryLocal,
          [dictionaryKey]: {
            name: element.value[dataFunctionNames[operation].value].value.value.name.value,
            type: element.value[dataFunctionNames[operation].value].value.value.type.value,
            values: {
              defense: element.value[dataFunctionNames[operation].value].value.value.values.value.defense.value,
              damage: element.value[dataFunctionNames[operation].value].value.value.values.value.dmg.value,
              health: element.value[dataFunctionNames[operation].value].value.value.values.value.health.value,
            },
          },
        };
      });
    }
  }
  return tokenNameDictionaryLocal;
};
export const fetchEnemyData = async (operation) => {
  /// e.g. operation = fighting-resources
  let enemyDictionaryLocal = {};
  let enemyDataLocal = '';
  let startingIndex = 0;
  let total = 3;
  let finalIndex = total;
  let operationList = dataFunctionNames[operation].list;

  while (startingIndex < operationList.length) {
    enemyDataLocal = await fetchReadOnlySimple(
      `${readOnlyBase[network]}/${contractAddress[network]}/${contractName.main}/${dataFunctionNames[operation].functionName}`,
      operationList.slice(startingIndex, finalIndex)
    );
    startingIndex += total;
    finalIndex += total;

    if (enemyDataLocal != '') {
      // for every returned value, keep number of resources sets (resource-id, resource-qty)
      enemyDataLocal.value.forEach((element) => {
        let dictionaryKey = element.value[dataFunctionNames[operation].key].value;
        // keep only what is necessarry

        enemyDictionaryLocal = {
          ...enemyDictionaryLocal,
          [dictionaryKey]: {
            defense: element.value[dataFunctionNames[operation].value].value.defense.value,
            damage: element.value[dataFunctionNames[operation].value].value.dmg.value,
            health: element.value[dataFunctionNames[operation].value].value.health.value,
          },
        };
      });
    }
  }
  return enemyDictionaryLocal;
};
