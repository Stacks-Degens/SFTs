(impl-trait .sip013-semi-fungible-token-trait.sip013-semi-fungible-token-trait)
(impl-trait .sip013-transfer-many-trait.sip013-transfer-many-trait)

;; Define SFT

(define-fungible-token semi-fungible-token)
(define-non-fungible-token semi-fungible-token-id {token-id: uint, owner: principal})
(define-map token-balances {token-id: uint, owner: principal} uint)
(define-map token-supplies uint uint)

(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u101))
(define-constant err-invalid-sender (err u102))
(define-constant err-not-some (err u103))

(define-private (tag-nft-token-id (nft-token-id {token-id: uint, owner: principal}))
  (begin
    (and
      (is-some (nft-get-owner? semi-fungible-token-id nft-token-id))
      (try! (nft-burn? semi-fungible-token-id nft-token-id (get owner nft-token-id))))
    (nft-mint? semi-fungible-token-id nft-token-id (get owner nft-token-id))))

(define-public (mint (token-id uint) (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (try! (ft-mint? semi-fungible-token amount recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (map-set token-supplies token-id (+  (unwrap-panic (get-total-supply token-id)) amount))
    (print {type: "sft_mint", token-id: token-id, amount: amount, recipient: recipient})
    (ok true)))

(define-private (mint-wrapper-admin (token-id uint) (amount uint) (recipient principal))
  (begin 
    (some (mint token-id amount recipient))
    recipient))

(define-private (mint-user (token-id uint) (amount uint) (recipient principal))
  (begin
    (try! (ft-mint? semi-fungible-token amount recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (map-set token-supplies token-id (+  (unwrap-panic (get-total-supply token-id)) amount))
    (print {type: "sft_mint", token-id: token-id, amount: amount, recipient: recipient})
    (ok true)))

(define-private (mint-rewards (reward-tuple {resource-id: uint, resource-qty: uint}) (user principal)) 
  (mint-wrapper-admin (get resource-id reward-tuple) (get resource-qty reward-tuple) user))

(define-private (get-balance-uint (token-id uint) (who principal))
  (default-to u0 (map-get? token-balances {token-id: token-id, owner: who})))

(define-read-only (get-balance (token-id uint) (who principal))
  (ok (get-balance-uint token-id who)))

(define-read-only (get-overall-balance (who principal))
  (ok (ft-get-balance semi-fungible-token who)))

(define-read-only (get-total-supply (token-id uint))
  (ok (default-to u0 (map-get? token-supplies token-id))))

(define-read-only (get-overall-supply)
  (ok (ft-get-supply semi-fungible-token)))

(define-read-only (get-decimals (token-id uint))
  (ok u0))
  
(define-private (is-owned-needed  (item {resource-id: uint, resource-qty: uint}))
  (>= (get-balance-uint (get resource-id item) tx-sender) (get resource-qty item)))

(define-private (set-balance (token-id uint) (balance uint) (owner principal))
  (map-set token-balances {token-id: token-id, owner: owner} balance))


;; Transfer

(define-public (transfer (token-id uint) (amount uint) (sender principal) (recipient principal))
  (let
      ((sender-balance (get-balance-uint token-id sender)))
    (asserts! (or (is-eq sender tx-sender) (is-eq sender contract-caller)) err-invalid-sender)
    (asserts! (<= amount sender-balance) err-insufficient-balance)
    (try! (ft-transfer? semi-fungible-token amount sender recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: sender}))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (- sender-balance amount) sender)
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (print {type: "sft_transfer", token-id: token-id, amount: amount, sender: sender, recipient: recipient})
    (ok true)))

(define-public (transfer-many (transfers (list 200 {token-id: uint, amount: uint, sender: principal, recipient: principal})))
  (fold transfer-many-iter transfers (ok true)))

(define-public (transfer-memo (token-id uint) (amount uint) (sender principal) (recipient principal) (memo (buff 34)))
  (begin
    (try! (transfer token-id amount sender recipient))
    (print memo)
    (ok true)))

(define-public (transfer-many-memo (transfers (list 200 {token-id: uint, amount: uint, sender: principal, recipient: principal, memo: (buff 34)})))
  (fold transfer-many-memo-iter transfers (ok true)))

(define-private (transfer-many-iter (item {token-id: uint, amount: uint, sender: principal, recipient: principal}) (previous-response (response bool uint)))
  (match previous-response prev-ok (transfer (get token-id item) (get amount item) (get sender item) (get recipient item)) prev-err previous-response))

(define-private (transfer-many-memo-iter (item {token-id: uint, amount: uint, sender: principal, recipient: principal, memo: (buff 34)}) (previous-response (response bool uint)))
  (match previous-response prev-ok (transfer-memo (get token-id item) (get amount item) (get sender item) (get recipient item) (get memo item)) prev-err previous-response))


;; Burn

(define-public (burn (token-id uint) (amount uint) (sender principal))
  (let
      ((sender-balance (get-balance-uint token-id sender)))
    (asserts! (or (is-eq sender tx-sender) (is-eq sender contract-caller)) err-invalid-sender)
    (asserts! (<= amount sender-balance) err-insufficient-balance)
    (try! (ft-burn? semi-fungible-token amount sender))
    (try! (tag-nft-token-id {token-id: token-id, owner: sender}))
    (set-balance token-id (- sender-balance amount) sender)
    (print {type: "sft_burn", token-id: token-id, amount: amount, sender: sender})
    (ok true)))

(define-public (burn-wrapper (burn-tuple {resource-id: uint, resource-qty: uint})) 
  (burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender))


;; Token URI

(define-map token-uri { id: uint } { url: (string-ascii 256) })

(define-read-only (get-token-uri (token-id uint))
  (let ((token-urr  (get url (map-get? token-uri {id: token-id}))))
    (ok token-urr)))

(define-public (set-token-uri (token-id uint) (token-url (string-ascii 256)))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (map-set token-uri {id: token-id} {url: token-url}) 
    (ok true)))


(map-set token-uri {id: u1} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/1.png"})
(map-set token-uri {id: u2} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/2.png"})
(map-set token-uri {id: u3} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/3.png"})
(map-set token-uri {id: u4} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/4.png"})
(map-set token-uri {id: u5} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/5.png"})
(map-set token-uri {id: u6} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/6.png"})
(map-set token-uri {id: u7} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/7.png"})
(map-set token-uri {id: u8} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/8.png"})
(map-set token-uri {id: u9} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/9.png"})
(map-set token-uri {id: u10} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/10.png"})
(map-set token-uri {id: u11} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/11.png"})
(map-set token-uri {id: u12} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/12.png"})
(map-set token-uri {id: u13} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/13.png"})
(map-set token-uri {id: u14} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/14.png"})
(map-set token-uri {id: u15} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/15.png"})
(map-set token-uri {id: u16} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/16.png"})
(map-set token-uri {id: u17} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/17.png"})
(map-set token-uri {id: u18} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/18.png"})
(map-set token-uri {id: u19} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/19.png"})
(map-set token-uri {id: u20} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/20.png"})
(map-set token-uri {id: u21} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/21.png"})
(map-set token-uri {id: u22} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/22.png"})
(map-set token-uri {id: u23} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/23.png"})
(map-set token-uri {id: u24} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/24.png"})
(map-set token-uri {id: u25} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/25.png"})
(map-set token-uri {id: u26} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/26.png"})
(map-set token-uri {id: u27} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/27.png"})
(map-set token-uri {id: u28} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/28.png"})
(map-set token-uri {id: u29} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/29.png"})
(map-set token-uri {id: u30} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/30.png"})
(map-set token-uri {id: u31} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/31.png"})
(map-set token-uri {id: u32} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/32.png"})
(map-set token-uri {id: u33} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/33.png"})
(map-set token-uri {id: u34} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/34.png"})
(map-set token-uri {id: u35} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/35.png"})
(map-set token-uri {id: u36} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/36.png"})
(map-set token-uri {id: u37} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/37.png"})
(map-set token-uri {id: u38} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/38.png"})
(map-set token-uri {id: u39} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/39.png"})
(map-set token-uri {id: u40} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/40.png"})
(map-set token-uri {id: u41} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/41.png"})
(map-set token-uri {id: u42} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/42.png"})
(map-set token-uri {id: u43} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/43.png"})
(map-set token-uri {id: u44} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/44.png"})
(map-set token-uri {id: u45} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/45.png"})
(map-set token-uri {id: u46} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/46.png"})
(map-set token-uri {id: u47} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/47.png"})
(map-set token-uri {id: u48} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/48.png"})
(map-set token-uri {id: u49} {url: "ipfs://QmcQzR4zcamVTzCPfCRBYywHVHGVncB2o3YpojvRmakVkC/49.png"})


;; Token Name

(define-map token-name { id: uint } { name: (string-ascii 256), type: (string-ascii 256), values: {dmg: uint, health: uint, defense: uint} })

(define-read-only (get-token-name (token-id uint))
  (let ((token-urr  (map-get? token-name {id: token-id})))
    (ok token-urr)))

(define-public (set-token-name (token-id uint) (token-details {name: (string-ascii 256), type: (string-ascii 256), values: {dmg: uint, health: uint, defense: uint}}))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (map-set token-name {id: token-id} token-details) 
    (ok true)))


;; Resources
(map-set token-name {id: u1} {name: "gold", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
(map-set token-name {id: u2} {name: "energy-power", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
(map-set token-name {id: u3} {name: "wood", type: "resource", values: {dmg: u0, health: u0, defense: u0}})
(map-set token-name {id: u4} {name: "iron", type: "resource", values: {dmg: u0, health: u0, defense: u0}})

;; Items
;; Swords
(map-set token-name {id: u5} {name: "wooden_sword_1", type: "sword", values: {dmg: u1, health: u0, defense: u0}})
(map-set token-name {id: u6} {name: "wooden_sword_2", type: "sword", values: {dmg: u2, health: u0, defense: u0}})
(map-set token-name {id: u7} {name: "wooden_sword_3", type: "sword", values: {dmg: u4, health: u0, defense: u0}})
(map-set token-name {id: u8} {name: "iron_sword_1", type: "sword", values: {dmg: u3, health: u0, defense: u0}})
(map-set token-name {id: u9} {name: "iron_sword_2", type: "sword", values: {dmg: u6, health: u0, defense: u0}})
(map-set token-name {id: u10} {name: "iron_sword_3", type: "sword", values: {dmg: u9, health: u0, defense: u0}})
(map-set token-name {id: u11} {name: "enhanced_sword_1", type: "sword", values: {dmg: u11, health: u0, defense: u0}})
(map-set token-name {id: u12} {name: "enhanced_sword_2", type: "sword", values: {dmg: u15, health: u0, defense: u0}})
(map-set token-name {id: u13} {name: "enhanced_sword_3", type: "sword", values: {dmg: u19, health: u0, defense: u0}})

;; Armors
(map-set token-name {id: u14} {name: "wooden_armor_1", type: "armor", values: {dmg: u0, health: u10, defense: u5}})
(map-set token-name {id: u15} {name: "wooden_armor_2", type: "armor", values: {dmg: u0, health: u15, defense: u8}})
(map-set token-name {id: u16} {name: "wooden_armor_3", type: "armor", values: {dmg: u0, health: u20, defense: u11}})
(map-set token-name {id: u17} {name: "iron_armor_1", type: "armor", values: {dmg: u0, health: u15, defense: u10}})
(map-set token-name {id: u18} {name: "iron_armor_2", type: "armor", values: {dmg: u0, health: u25, defense: u14}})
(map-set token-name {id: u19} {name: "iron_armor_3", type: "armor", values: {dmg: u0, health: u35, defense: u18}})
(map-set token-name {id: u20} {name: "enhanced_armor_1", type: "armor", values: {dmg: u0, health: u50, defense: u25}})
(map-set token-name {id: u21} {name: "enhanced_armor_2", type: "armor", values: {dmg: u0, health: u65, defense: u30}})
(map-set token-name {id: u22} {name: "enhanced_armor_3", type: "armor", values: {dmg: u0, health: u80, defense: u35}})

;; Shields
(map-set token-name {id: u23} {name: "wooden_shield_1", type: "shield", values: {dmg: u0, health: u0, defense: u5}})
(map-set token-name {id: u24} {name: "wooden_shield_2", type: "shield", values: {dmg: u0, health: u0, defense: u10}})
(map-set token-name {id: u25} {name: "wooden_shield_3", type: "shield", values: {dmg: u0, health: u0, defense: u15}})
(map-set token-name {id: u26} {name: "iron_shield_1", type: "shield", values: {dmg: u0, health: u0, defense: u13}})
(map-set token-name {id: u27} {name: "iron_shield_2", type: "shield", values: {dmg: u0, health: u0, defense: u19}})
(map-set token-name {id: u28} {name: "iron_shield_3", type: "shield", values: {dmg: u0, health: u0, defense: u25}})
(map-set token-name {id: u29} {name: "enhanced_shield_1", type: "shield", values: {dmg: u0, health: u0, defense: u35}})
(map-set token-name {id: u30} {name: "enhanced_shield_2", type: "shield", values: {dmg: u0, health: u0, defense: u45}})
(map-set token-name {id: u31} {name: "enhanced_shield_3", type: "shield", values: {dmg: u0, health: u0, defense: u55}})

;; Helmets
(map-set token-name {id: u32} {name: "wooden_helmet_1", type: "helmet", values: {dmg: u0, health: u10, defense: u0}})
(map-set token-name {id: u33} {name: "wooden_helmet_2", type: "helmet", values: {dmg: u0, health: u17, defense: u0}})
(map-set token-name {id: u34} {name: "wooden_helmet_3", type: "helmet", values: {dmg: u0, health: u24, defense: u0}})
(map-set token-name {id: u35} {name: "iron_helmet_1", type: "helmet", values: {dmg: u0, health: u20, defense: u0}})
(map-set token-name {id: u36} {name: "iron_helmet_2", type: "helmet", values: {dmg: u0, health: u30, defense: u0}})
(map-set token-name {id: u37} {name: "iron_helmet_3", type: "helmet", values: {dmg: u0, health: u40, defense: u0}})
(map-set token-name {id: u38} {name: "enhanced_helmet_1", type: "helmet", values: {dmg: u0, health: u55, defense: u0}})
(map-set token-name {id: u39} {name: "enhanced_helmet_2", type: "helmet", values: {dmg: u0, health: u70, defense: u0}})
(map-set token-name {id: u40} {name: "enhanced_helmet_3", type: "helmet", values: {dmg: u0, health: u85, defense: u0}})

;; Shoes
(map-set token-name {id: u41} {name: "wooden_shoes_1", type: "shoes", values: {dmg: u3, health: u0, defense: u2}})
(map-set token-name {id: u42} {name: "wooden_shoes_2", type: "shoes", values: {dmg: u4, health: u0, defense: u4}})
(map-set token-name {id: u43} {name: "wooden_shoes_3", type: "shoes", values: {dmg: u5, health: u0, defense: u6}})
(map-set token-name {id: u44} {name: "iron_shoes_1", type: "shoes", values: {dmg: u3, health: u0, defense: u5}})
(map-set token-name {id: u45} {name: "iron_shoes_2", type: "shoes", values: {dmg: u4, health: u0, defense: u8}})
(map-set token-name {id: u46} {name: "iron_shoes_3", type: "shoes", values: {dmg: u5, health: u0, defense: u11}})
(map-set token-name {id: u47} {name: "enhanced_shoes_1", type: "shoes", values: {dmg: u3, health: u0, defense: u14}})
(map-set token-name {id: u48} {name: "enhanced_shoes_2", type: "shoes", values: {dmg: u4, health: u0, defense: u18}})
(map-set token-name {id: u49} {name: "enhanced_shoes_3", type: "shoes", values: {dmg: u5, health: u0, defense: u22}})


;; Level-up

(define-map level-up-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (level-up (id-new uint))
  (begin
    (asserts! (not (is-none (unwrap-panic (get-level-up-resources id-new)))) err-not-some)
    (let  ((level-up-resources (unwrap-panic (get-level-up-resources id-new)))
          (verified-ownership (fold and (map is-owned-needed (unwrap-panic level-up-resources)) true)))
      (asserts! (is-some level-up-resources) err-not-some)
      (asserts! verified-ownership err-insufficient-balance)
      (some (map burn-wrapper (unwrap-panic level-up-resources)))
      (mint-user id-new u1 tx-sender))))

(define-read-only (get-level-up-resources (token-id uint))
  (let ((token-urr (map-get? level-up-system {id: token-id})))
    (ok token-urr)))

(define-public (set-level-up-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set level-up-system {id: token-id} resource-needed))))


(map-set level-up-system {id: u6} (list {resource-id: u3, resource-qty: u6} {resource-id: u5, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u7} (list {resource-id: u3, resource-qty: u10} {resource-id: u6, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u9} (list {resource-id: u4, resource-qty: u6} {resource-id: u8, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set level-up-system {id: u10} (list {resource-id: u4, resource-qty: u10} {resource-id: u9, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u12} (list {resource-id: u3, resource-qty: u8} {resource-id: u4, resource-qty: u8} {resource-id: u11, resource-qty: u1} {resource-id: u2, resource-qty: u8}))
(map-set level-up-system {id: u13} (list {resource-id: u3, resource-qty: u10} {resource-id: u4, resource-qty: u10} {resource-id: u12, resource-qty: u1} {resource-id: u2, resource-qty: u10}))
(map-set level-up-system {id: u15} (list {resource-id: u3, resource-qty: u6} {resource-id: u14, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u16} (list {resource-id: u3, resource-qty: u10} {resource-id: u15, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u18} (list {resource-id: u4, resource-qty: u6} {resource-id: u17, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set level-up-system {id: u19} (list {resource-id: u4, resource-qty: u10} {resource-id: u18, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u21} (list {resource-id: u3, resource-qty: u8} {resource-id: u4, resource-qty: u8} {resource-id: u20, resource-qty: u1} {resource-id: u2, resource-qty: u8}))
(map-set level-up-system {id: u22} (list {resource-id: u3, resource-qty: u10} {resource-id: u4, resource-qty: u10} {resource-id: u21, resource-qty: u1} {resource-id: u2, resource-qty: u10}))
(map-set level-up-system {id: u24} (list {resource-id: u3, resource-qty: u3} {resource-id: u23, resource-qty: u1} {resource-id: u2, resource-qty: u1}))
(map-set level-up-system {id: u25} (list {resource-id: u3, resource-qty: u5} {resource-id: u24, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u27} (list {resource-id: u4, resource-qty: u3} {resource-id: u26, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u28} (list {resource-id: u4, resource-qty: u5} {resource-id: u27, resource-qty: u1} {resource-id: u2, resource-qty: u4}))
(map-set level-up-system {id: u30} (list {resource-id: u3, resource-qty: u4} {resource-id: u4, resource-qty: u4} {resource-id: u29, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u31} (list {resource-id: u3, resource-qty: u6} {resource-id: u4, resource-qty: u6} {resource-id: u30, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set level-up-system {id: u33} (list {resource-id: u3, resource-qty: u3} {resource-id: u32, resource-qty: u1} {resource-id: u2, resource-qty: u1}))
(map-set level-up-system {id: u34} (list {resource-id: u3, resource-qty: u5} {resource-id: u33, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u36} (list {resource-id: u4, resource-qty: u3} {resource-id: u35, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u37} (list {resource-id: u4, resource-qty: u5} {resource-id: u36, resource-qty: u1} {resource-id: u2, resource-qty: u4}))
(map-set level-up-system {id: u39} (list {resource-id: u3, resource-qty: u4} {resource-id: u4, resource-qty: u4} {resource-id: u38, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u40} (list {resource-id: u3, resource-qty: u6} {resource-id: u4, resource-qty: u6} {resource-id: u39, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set level-up-system {id: u42} (list {resource-id: u3, resource-qty: u2} {resource-id: u41, resource-qty: u1} {resource-id: u2, resource-qty: u1}))
(map-set level-up-system {id: u43} (list {resource-id: u3, resource-qty: u4} {resource-id: u42, resource-qty: u1} {resource-id: u2, resource-qty: u2}))
(map-set level-up-system {id: u45} (list {resource-id: u4, resource-qty: u2} {resource-id: u44, resource-qty: u1} {resource-id: u2, resource-qty: u3}))
(map-set level-up-system {id: u46} (list {resource-id: u4, resource-qty: u4} {resource-id: u45, resource-qty: u1} {resource-id: u2, resource-qty: u4}))
(map-set level-up-system {id: u48} (list {resource-id: u3, resource-qty: u3} {resource-id: u4, resource-qty: u3} {resource-id: u47, resource-qty: u1} {resource-id: u2, resource-qty: u6}))
(map-set level-up-system {id: u49} (list {resource-id: u3, resource-qty: u5} {resource-id: u4, resource-qty: u5} {resource-id: u48, resource-qty: u1} {resource-id: u2, resource-qty: u7}))


;; Crafting

(define-map crafting-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (craft-item (id-new uint))
  (begin
    (asserts! (not (is-none (unwrap-panic (get-crafting-resources id-new)))) err-not-some)
    (let ((crafting-resources (unwrap-panic (get-crafting-resources id-new)))
          (verified-ownership (fold and (map is-owned-needed (unwrap-panic crafting-resources)) true)))
      (asserts! (is-some crafting-resources) err-not-some)
      (asserts! verified-ownership err-insufficient-balance)
      (some (map burn-wrapper (unwrap-panic crafting-resources)))
      (mint-user id-new u1 tx-sender))))

(define-read-only (get-crafting-resources (token-id uint))
  (let ((token-urr (map-get? crafting-system {id: token-id})))
    (ok token-urr)))

(define-public (set-crafting-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set crafting-system {id: token-id} resource-needed))))


(map-set crafting-system {id: u5} (list {resource-id: u3, resource-qty: u4}))
(map-set crafting-system {id: u8} (list {resource-id: u4, resource-qty: u4}))
(map-set crafting-system {id: u11} (list {resource-id: u7, resource-qty: u1} {resource-id: u10, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set crafting-system {id: u14} (list {resource-id: u3, resource-qty: u4}))
(map-set crafting-system {id: u17} (list {resource-id: u4, resource-qty: u4}))
(map-set crafting-system {id: u20} (list {resource-id: u16, resource-qty: u1} {resource-id: u19, resource-qty: u1} {resource-id: u2, resource-qty: u7}))
(map-set crafting-system {id: u23} (list {resource-id: u3, resource-qty: u2}))
(map-set crafting-system {id: u26} (list {resource-id: u4, resource-qty: u2}))
(map-set crafting-system {id: u29} (list {resource-id: u25, resource-qty: u1} {resource-id: u28, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set crafting-system {id: u32} (list {resource-id: u3, resource-qty: u2}))
(map-set crafting-system {id: u35} (list {resource-id: u4, resource-qty: u2}))
(map-set crafting-system {id: u38} (list {resource-id: u34, resource-qty: u1} {resource-id: u37, resource-qty: u1} {resource-id: u2, resource-qty: u5}))
(map-set crafting-system {id: u41} (list {resource-id: u3, resource-qty: u1}))
(map-set crafting-system {id: u44} (list {resource-id: u4, resource-qty: u1}))
(map-set crafting-system {id: u47} (list {resource-id: u43, resource-qty: u1} {resource-id: u46, resource-qty: u1} {resource-id: u2, resource-qty: u5}))


;; Acquisition

(define-map acquisition-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (buy-item (id-new uint))
  (begin
    (asserts! (not (is-none (unwrap-panic (get-acquisition-resources id-new)))) err-not-some)
    (let ((acquisition-resources (unwrap-panic (get-acquisition-resources id-new)))
          (verified-ownership (fold and (map is-owned-needed (unwrap-panic acquisition-resources)) true)))
      (asserts! (is-some acquisition-resources) err-not-some)
      (asserts! verified-ownership err-insufficient-balance)
      (some (map burn-wrapper (unwrap-panic acquisition-resources)))
      (mint-user id-new u1 tx-sender))))

(define-read-only (get-acquisition-resources (token-id uint))
  (let ((token-urr (map-get? acquisition-system {id: token-id})))
    (ok token-urr)))

(define-public (set-acquisition-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set acquisition-system {id: token-id} resource-needed))))


(map-set acquisition-system {id: u5} (list {resource-id: u1, resource-qty: u15}))
(map-set acquisition-system {id: u6} (list {resource-id: u1, resource-qty: u40} {resource-id: u3, resource-qty: u7}))
(map-set acquisition-system {id: u9} (list {resource-id: u1, resource-qty: u5} {resource-id: u4, resource-qty: u20}))
(map-set acquisition-system {id: u12} (list {resource-id: u1, resource-qty: u500} {resource-id: u3, resource-qty: u11} {resource-id: u4, resource-qty: u11}))
(map-set acquisition-system {id: u14} (list {resource-id: u1, resource-qty: u15}))
(map-set acquisition-system {id: u16} (list {resource-id: u1, resource-qty: u50} {resource-id: u3, resource-qty: u17}))
(map-set acquisition-system {id: u18} (list {resource-id: u1, resource-qty: u5} {resource-id: u4, resource-qty: u20}))
(map-set acquisition-system {id: u21} (list {resource-id: u1, resource-qty: u400} {resource-id: u3, resource-qty: u12} {resource-id: u4, resource-qty: u12}))
(map-set acquisition-system {id: u25} (list {resource-id: u1, resource-qty: u15} {resource-id: u3, resource-qty: u4}))
(map-set acquisition-system {id: u27} (list {resource-id: u1, resource-qty: u230} {resource-id: u4, resource-qty: u3}))
(map-set acquisition-system {id: u30} (list {resource-id: u1, resource-qty: u670} {resource-id: u3, resource-qty: u7} {resource-id: u4, resource-qty: u7}))
(map-set acquisition-system {id: u34} (list {resource-id: u1, resource-qty: u150} {resource-id: u3, resource-qty: u4}))
(map-set acquisition-system {id: u36} (list {resource-id: u1, resource-qty: u230} {resource-id: u4, resource-qty: u3}))
(map-set acquisition-system {id: u38} (list {resource-id: u1, resource-qty: u370} {resource-id: u3, resource-qty: u6} {resource-id: u4, resource-qty: u6}))
(map-set acquisition-system {id: u42} (list {resource-id: u1, resource-qty: u25} {resource-id: u3, resource-qty: u2}))
(map-set acquisition-system {id: u43} (list {resource-id: u1, resource-qty: u120} {resource-id: u3, resource-qty: u5}))
(map-set acquisition-system {id: u45} (list {resource-id: u1, resource-qty: u1} {resource-id: u4, resource-qty: u10}))


;; Fighting 
;; Fight Needed Resources

(define-map fight-needed-resources {fight-number: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (start-fight (fight-number uint)) 
  (begin
    (asserts! (not (is-none (unwrap-panic (get-fight-needed-resources fight-number)))) err-not-some)
    (let  ((fight-resources-needed (unwrap-panic (get-fight-needed-resources fight-number)))
          (verified-ownership (fold and (map is-owned-needed (unwrap-panic fight-resources-needed)) true))) 
      (asserts! (is-some fight-resources-needed) err-not-some)
      (asserts! verified-ownership err-insufficient-balance)
      (some (map burn-wrapper (unwrap-panic fight-resources-needed)))
      (ok true))))

(define-read-only (get-fight-needed-resources (fight-number uint))
  (let ((token-urr (map-get? fight-needed-resources {fight-number: fight-number})))
    (ok token-urr)))

(define-public (set-fight-needed-resources (fight-number uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set fight-needed-resources {fight-number: fight-number} resource-needed))))

(map-set fight-needed-resources {fight-number: u1} (list {resource-id: u2, resource-qty: u10}))
(map-set fight-needed-resources {fight-number: u2} (list {resource-id: u2, resource-qty: u12}))
(map-set fight-needed-resources {fight-number: u3} (list {resource-id: u2, resource-qty: u15}))
(map-set fight-needed-resources {fight-number: u4} (list {resource-id: u2, resource-qty: u19}))
(map-set fight-needed-resources {fight-number: u5} (list {resource-id: u2, resource-qty: u30}))
(map-set fight-needed-resources {fight-number: u6} (list {resource-id: u2, resource-qty: u32}))
(map-set fight-needed-resources {fight-number: u7} (list {resource-id: u2, resource-qty: u36}))
(map-set fight-needed-resources {fight-number: u8} (list {resource-id: u2, resource-qty: u42}))
(map-set fight-needed-resources {fight-number: u9} (list {resource-id: u2, resource-qty: u50}))
(map-set fight-needed-resources {fight-number: u10} (list {resource-id: u2, resource-qty: u70}))

;; Fight Rewards

(define-map fight-reward-system { fight-number: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-read-only (get-fight-rewards (fight-number uint))
  (let ((token-urr (map-get? fight-reward-system {fight-number: fight-number})))
    (ok token-urr)))

(define-public (set-fight-rewards (fight-number uint) (resource-rewarded (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set fight-reward-system {fight-number: fight-number} resource-rewarded))))

(define-public (reward-fighting (fight-number uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (not (is-none (unwrap-panic (get-fight-rewards fight-number)))) err-not-some)
    (let  ((fighting-rewards (unwrap-panic (get-fight-rewards fight-number)))) 
      (asserts! (is-some fighting-rewards) err-not-some)
      (ok (fold mint-rewards (unwrap-panic fighting-rewards) user)))))

(map-set fight-reward-system {fight-number: u1} (list {resource-id: u1, resource-qty: u100}))
(map-set fight-reward-system {fight-number: u2} (list {resource-id: u1, resource-qty: u120}))
(map-set fight-reward-system {fight-number: u3} (list {resource-id: u1, resource-qty: u150}))
(map-set fight-reward-system {fight-number: u4} (list {resource-id: u1, resource-qty: u190}))
(map-set fight-reward-system {fight-number: u5} (list {resource-id: u1, resource-qty: u300} {resource-id: u7, resource-qty: u1}))
(map-set fight-reward-system {fight-number: u6} (list {resource-id: u1, resource-qty: u320}))
(map-set fight-reward-system {fight-number: u7} (list {resource-id: u1, resource-qty: u360}))
(map-set fight-reward-system {fight-number: u8} (list {resource-id: u1, resource-qty: u420}))
(map-set fight-reward-system {fight-number: u9} (list {resource-id: u1, resource-qty: u500}))
(map-set fight-reward-system {fight-number: u10} (list {resource-id: u1, resource-qty: u700} {resource-id: u13, resource-qty: u1}))

;; Sleeping Rewards center

(define-map sleeping-reward-system {sleeping-time: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (reward-sleeping (sleeping-time uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (not (is-none (unwrap-panic (get-sleeping-rewards sleeping-time)))) err-not-some)
    (let  ((sleeping-rewards (unwrap-panic (get-sleeping-rewards sleeping-time)))) 
      (asserts! (is-some sleeping-rewards) err-not-some)
      (ok (fold mint-rewards (unwrap-panic sleeping-rewards) user)))))

(define-read-only (get-sleeping-rewards (sleeping-time uint))
  (let ((token-urr (map-get? sleeping-reward-system {sleeping-time: sleeping-time})))
    (ok token-urr)))

(define-public (set-sleeping-rewards (sleeping-time uint) (resource-achieved (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (map-set sleeping-reward-system {sleeping-time: sleeping-time} resource-achieved))))

(map-set sleeping-reward-system {sleeping-time: u5} (list {resource-id: u2, resource-qty: u5}))
(map-set sleeping-reward-system {sleeping-time: u10} (list {resource-id: u2, resource-qty: u15}))
(map-set sleeping-reward-system {sleeping-time: u20} (list {resource-id: u2, resource-qty: u40}))
