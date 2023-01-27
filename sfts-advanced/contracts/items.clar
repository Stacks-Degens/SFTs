(impl-trait .sip013-semi-fungible-token-trait.sip013-semi-fungible-token-trait)
(impl-trait .sip013-transfer-many-trait.sip013-transfer-many-trait)


(define-fungible-token semi-fungible-token)
(define-non-fungible-token semi-fungible-token-id {token-id: uint, owner: principal})
(define-map token-balances {token-id: uint, owner: principal} uint)
(define-map token-supplies uint uint)
(define-constant contract-owner tx-sender)
(define-data-var contract-admin principal .main-sc)

(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u101))
(define-constant err-invalid-sender (err u102))
(define-constant err-not-some (err u103))
(define-constant err-invalid-destination-contract (err u104))
(define-constant err-admin-only (err u105))

(define-read-only (get-contract-admin) 
  (var-get contract-admin))

(define-public (set-contract-admin (new-contract-admin principal)) 
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (var-set contract-admin new-contract-admin))))

;; Ownership

(define-read-only (is-owned-needed  (item {resource-id: uint, resource-qty: uint}))
  (ok (>= (get-balance-uint (get resource-id item) tx-sender) (get resource-qty item))))

(define-private (tag-nft-token-id (nft-token-id {token-id: uint, owner: principal}))
  (begin
    (and
      (is-some (nft-get-owner? semi-fungible-token-id nft-token-id))
      (try! (nft-burn? semi-fungible-token-id nft-token-id (get owner nft-token-id))))
    (nft-mint? semi-fungible-token-id nft-token-id (get owner nft-token-id))))

;; Mint

(define-public (mint (token-id uint) (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (< token-id u50) err-invalid-destination-contract)
    (try! (ft-mint? semi-fungible-token amount recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (map-set token-supplies token-id (+  (unwrap-panic (get-total-supply token-id)) amount))
    (print {type: "sft_mint", token-id: token-id, amount: amount, recipient: recipient})
    (ok true)))

(define-public (mint-user (token-id uint) (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-admin)) err-admin-only)
    (asserts! (< token-id u50) err-invalid-destination-contract)
    (try! (ft-mint? semi-fungible-token amount recipient))
    (try! (tag-nft-token-id {token-id: token-id, owner: recipient}))
    (set-balance token-id (+ (get-balance-uint token-id recipient) amount) recipient)
    (map-set token-supplies token-id (+  (unwrap-panic (get-total-supply token-id)) amount))
    (print {type: "sft_mint", token-id: token-id, amount: amount, recipient: recipient})
    (ok true)))

;; Balances

(define-private (set-balance (token-id uint) (balance uint) (owner principal))
  (map-set token-balances {token-id: token-id, owner: owner} balance))

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

;; Transfer

(define-public (transfer (token-id uint) (amount uint) (sender principal) (recipient principal))
  (let  ((sender-balance (get-balance-uint token-id sender)))
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

(define-public (transfer-wrapper (transfer-tuple {resource-id: uint, resource-qty: uint})) 
  (transfer (get resource-id transfer-tuple) (get resource-qty transfer-tuple) tx-sender 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG))

(define-private (transfer-many-iter (item {token-id: uint, amount: uint, sender: principal, recipient: principal}) (previous-response (response bool uint)))
  (match previous-response prev-ok (transfer (get token-id item) (get amount item) (get sender item) (get recipient item)) prev-err previous-response))

(define-private (transfer-many-memo-iter (item {token-id: uint, amount: uint, sender: principal, recipient: principal, memo: (buff 34)}) (previous-response (response bool uint)))
  (match previous-response prev-ok (transfer-memo (get token-id item) (get amount item) (get sender item) (get recipient item) (get memo item)) prev-err previous-response))

;; Burn

(define-public (burn (token-id uint) (amount uint) (sender principal))
  (let  ((sender-balance (get-balance-uint token-id sender)))
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

(define-map token-uri { id: uint } { url: (string-ascii 70) })

(define-public (set-token-uri (token-id uint) (token-url (string-ascii 70)))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (map-set token-uri {id: token-id} {url: token-url}) 
    (ok true)))

(define-read-only (get-token-uri (token-id uint))
  (let ((token-urr  (get url (map-get? token-uri {id: token-id}))))
    (ok token-urr)))

(map-set token-uri {id: u5} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/5.json"})
(map-set token-uri {id: u6} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/6.json"})
(map-set token-uri {id: u7} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/7.json"})
(map-set token-uri {id: u8} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/8.json"})
(map-set token-uri {id: u9} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/9.json"})
(map-set token-uri {id: u10} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/10.json"})
(map-set token-uri {id: u11} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/11.json"})
(map-set token-uri {id: u12} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/12.json"})
(map-set token-uri {id: u13} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/13.json"})
(map-set token-uri {id: u14} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/14.json"})
(map-set token-uri {id: u15} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/15.json"})
(map-set token-uri {id: u16} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/16.json"})
(map-set token-uri {id: u17} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/17.json"})
(map-set token-uri {id: u18} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/18.json"})
(map-set token-uri {id: u19} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/19.json"})
(map-set token-uri {id: u20} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/20.json"})
(map-set token-uri {id: u21} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/21.json"})
(map-set token-uri {id: u22} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/22.json"})
(map-set token-uri {id: u23} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/23.json"})
(map-set token-uri {id: u24} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/24.json"})
(map-set token-uri {id: u25} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/25.json"})
(map-set token-uri {id: u26} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/26.json"})
(map-set token-uri {id: u27} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/27.json"})
(map-set token-uri {id: u28} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/28.json"})
(map-set token-uri {id: u29} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/29.json"})
(map-set token-uri {id: u30} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/30.json"})
(map-set token-uri {id: u31} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/31.json"})
(map-set token-uri {id: u32} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/32.json"})
(map-set token-uri {id: u33} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/33.json"})
(map-set token-uri {id: u34} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/34.json"})
(map-set token-uri {id: u35} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/35.json"})
(map-set token-uri {id: u36} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/36.json"})
(map-set token-uri {id: u37} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/37.json"})
(map-set token-uri {id: u38} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/38.json"})
(map-set token-uri {id: u39} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/39.json"})
(map-set token-uri {id: u40} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/40.json"})
(map-set token-uri {id: u41} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/41.json"})
(map-set token-uri {id: u42} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/42.json"})
(map-set token-uri {id: u43} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/43.json"})
(map-set token-uri {id: u44} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/44.json"})
(map-set token-uri {id: u45} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/45.json"})
(map-set token-uri {id: u46} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/46.json"})
(map-set token-uri {id: u47} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/47.json"})
(map-set token-uri {id: u48} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/48.json"})
(map-set token-uri {id: u49} {url: "ipfs://QmdrB3pecXRiTcPUoX6mresftQHfXfSebpZNyVKzuGa57S/49.json"})

;; Token Name

(define-map token-name { id: uint } { name: (string-ascii 18), type: (string-ascii 10), values: {dmg: uint, health: uint, defense: uint} })

(define-public (set-token-name (token-id uint) (token-details {name: (string-ascii 18), type: (string-ascii 10), values: {dmg: uint, health: uint, defense: uint}}))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (map-set token-name {id: token-id} token-details) 
    (ok true)))

(define-read-only (get-token-name (token-id uint))
  (let ((token-urr  (map-get? token-name {id: token-id})))
    (ok token-urr)))


(map-set token-name {id: u5} {name: "wooden_sword_1", type: "sword", values: {dmg: u1, health: u0, defense: u0}})
(map-set token-name {id: u6} {name: "wooden_sword_2", type: "sword", values: {dmg: u2, health: u0, defense: u0}})
(map-set token-name {id: u7} {name: "wooden_sword_3", type: "sword", values: {dmg: u4, health: u0, defense: u0}})
(map-set token-name {id: u8} {name: "iron_sword_1", type: "sword", values: {dmg: u3, health: u0, defense: u0}})
(map-set token-name {id: u9} {name: "iron_sword_2", type: "sword", values: {dmg: u6, health: u0, defense: u0}})
(map-set token-name {id: u10} {name: "iron_sword_3", type: "sword", values: {dmg: u9, health: u0, defense: u0}})
(map-set token-name {id: u11} {name: "enhanced_sword_1", type: "sword", values: {dmg: u11, health: u0, defense: u0}})
(map-set token-name {id: u12} {name: "enhanced_sword_2", type: "sword", values: {dmg: u15, health: u0, defense: u0}})
(map-set token-name {id: u13} {name: "enhanced_sword_3", type: "sword", values: {dmg: u19, health: u0, defense: u0}})

(map-set token-name {id: u14} {name: "wooden_armor_1", type: "armor", values: {dmg: u0, health: u10, defense: u5}})
(map-set token-name {id: u15} {name: "wooden_armor_2", type: "armor", values: {dmg: u0, health: u15, defense: u8}})
(map-set token-name {id: u16} {name: "wooden_armor_3", type: "armor", values: {dmg: u0, health: u20, defense: u11}})
(map-set token-name {id: u17} {name: "iron_armor_1", type: "armor", values: {dmg: u0, health: u15, defense: u10}})
(map-set token-name {id: u18} {name: "iron_armor_2", type: "armor", values: {dmg: u0, health: u25, defense: u14}})
(map-set token-name {id: u19} {name: "iron_armor_3", type: "armor", values: {dmg: u0, health: u35, defense: u18}})
(map-set token-name {id: u20} {name: "enhanced_armor_1", type: "armor", values: {dmg: u0, health: u50, defense: u25}})
(map-set token-name {id: u21} {name: "enhanced_armor_2", type: "armor", values: {dmg: u0, health: u65, defense: u30}})
(map-set token-name {id: u22} {name: "enhanced_armor_3", type: "armor", values: {dmg: u0, health: u80, defense: u35}})

(map-set token-name {id: u23} {name: "wooden_shield_1", type: "shield", values: {dmg: u0, health: u0, defense: u5}})
(map-set token-name {id: u24} {name: "wooden_shield_2", type: "shield", values: {dmg: u0, health: u0, defense: u10}})
(map-set token-name {id: u25} {name: "wooden_shield_3", type: "shield", values: {dmg: u0, health: u0, defense: u15}})
(map-set token-name {id: u26} {name: "iron_shield_1", type: "shield", values: {dmg: u0, health: u0, defense: u13}})
(map-set token-name {id: u27} {name: "iron_shield_2", type: "shield", values: {dmg: u0, health: u0, defense: u19}})
(map-set token-name {id: u28} {name: "iron_shield_3", type: "shield", values: {dmg: u0, health: u0, defense: u25}})
(map-set token-name {id: u29} {name: "enhanced_shield_1", type: "shield", values: {dmg: u0, health: u0, defense: u35}})
(map-set token-name {id: u30} {name: "enhanced_shield_2", type: "shield", values: {dmg: u0, health: u0, defense: u45}})
(map-set token-name {id: u31} {name: "enhanced_shield_3", type: "shield", values: {dmg: u0, health: u0, defense: u55}})

(map-set token-name {id: u32} {name: "wooden_helmet_1", type: "helmet", values: {dmg: u0, health: u10, defense: u0}})
(map-set token-name {id: u33} {name: "wooden_helmet_2", type: "helmet", values: {dmg: u0, health: u17, defense: u0}})
(map-set token-name {id: u34} {name: "wooden_helmet_3", type: "helmet", values: {dmg: u0, health: u24, defense: u0}})
(map-set token-name {id: u35} {name: "iron_helmet_1", type: "helmet", values: {dmg: u0, health: u20, defense: u0}})
(map-set token-name {id: u36} {name: "iron_helmet_2", type: "helmet", values: {dmg: u0, health: u30, defense: u0}})
(map-set token-name {id: u37} {name: "iron_helmet_3", type: "helmet", values: {dmg: u0, health: u40, defense: u0}})
(map-set token-name {id: u38} {name: "enhanced_helmet_1", type: "helmet", values: {dmg: u0, health: u55, defense: u0}})
(map-set token-name {id: u39} {name: "enhanced_helmet_2", type: "helmet", values: {dmg: u0, health: u70, defense: u0}})
(map-set token-name {id: u40} {name: "enhanced_helmet_3", type: "helmet", values: {dmg: u0, health: u85, defense: u0}})

(map-set token-name {id: u41} {name: "wooden_shoes_1", type: "shoes", values: {dmg: u0, health: u0, defense: u2}})
(map-set token-name {id: u42} {name: "wooden_shoes_2", type: "shoes", values: {dmg: u0, health: u0, defense: u4}})
(map-set token-name {id: u43} {name: "wooden_shoes_3", type: "shoes", values: {dmg: u0, health: u0, defense: u6}})
(map-set token-name {id: u44} {name: "iron_shoes_1", type: "shoes", values: {dmg: u0, health: u0, defense: u5}})
(map-set token-name {id: u45} {name: "iron_shoes_2", type: "shoes", values: {dmg: u0, health: u0, defense: u8}})
(map-set token-name {id: u46} {name: "iron_shoes_3", type: "shoes", values: {dmg: u0, health: u0, defense: u11}})
(map-set token-name {id: u47} {name: "enhanced_shoes_1", type: "shoes", values: {dmg: u0, health: u0, defense: u14}})
(map-set token-name {id: u48} {name: "enhanced_shoes_2", type: "shoes", values: {dmg: u0, health: u0, defense: u18}})
(map-set token-name {id: u49} {name: "enhanced_shoes_3", type: "shoes", values: {dmg: u0, health: u0, defense: u22}})
