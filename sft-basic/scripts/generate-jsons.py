import json

# Data to be written

elements = [
  "Wooden",
  "Iron",
  "Enhanced",
]
levels=["1","2","3"]
items=["Sword","Armor","Shield","Helmet","Shoes"]

def generate_jsons(element, item, level, token_id):
  return """{
  "sip": 16,
  "name": "%s %s %s",
  "image": "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/%s.png",
  "attributes": [
    {
      "trait_type": "type",
      "value": "%s"
    },
    {
      "trait_type": "level",
      "display_type": "number",
      "value": %s
    },
    {
      "trait_type": "element",
      "value": "%s"
    }
  ],
  "properties": {
      "image_in_game":  "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/%s.png",
      "collection":  "Base_Game_SFTs"
  }
}
"""%(element,item,level,token_id,item,level,element,token_id)

for i in range(5,50):
  with open("jsons-nft/%s.json"%i, "w") as outfile:
    outfile.write(generate_jsons(elements[(i-5)%9//3],items[(i-5)//9],levels[(i-5)%3],i))