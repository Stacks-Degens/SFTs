;; Wrapper

;; Constants

(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u101))
(define-constant err-invalid-sender (err u102))
(define-constant err-not-some (err u103))
(define-constant err-invalid-destination-contract (err u104))
(define-constant err-inexistent-item (err u105))
(define-constant err-already-claimed (err u106))

;; Transfer

(define-public (transfer-wrapper (token-id uint) (amount uint) (sender principal) (recipient principal)) 
  (if (< token-id u5) 
    (contract-call? .resources transfer token-id amount sender recipient) 
    (if (< token-id u50) 
      (contract-call? .items transfer token-id amount sender recipient) 
      (if (< token-id u58) 
        (contract-call? .collection-1 transfer token-id amount sender recipient) 
        err-inexistent-item))))


;; Balance

(define-read-only (get-balance-wrapper (token-id uint) (who principal)) 
  (if (< token-id u5) 
    (contract-call? .resources get-balance token-id who) 
    (if (< token-id u50) 
      (contract-call? .items get-balance token-id who) 
      (if (< token-id u58) 
        (contract-call? .collection-1 get-balance token-id who)
        err-inexistent-item))))

(define-private (merge-who (token-id uint) (who principal))
  (merge {token-id: token-id} {who: who}))

;; create list of tuples for given who
(define-private (construct-list-who (who principal)) 
  (list who who who who who who who who who who ))

(define-private (create-balance-tuple (token-id uint) (who principal)) 
  {token-id: token-id, who: who })

(define-private (get-data-balance-all-items (balance-tuple {token-id: uint, who: principal})) 
  {token-id: (get token-id balance-tuple), balance: (get-balance-wrapper (get token-id balance-tuple) (get who balance-tuple))})


(define-private (get-data-balance-all-items-2 (token-id uint) (who principal)) 
  {token-id: token-id , balance: (get-balance-wrapper token-id who )})

(define-read-only (all-balances-user (who principal) (token-id-list (list 60 uint))) 
  (map get-data-balance-all-items-2 token-id-list (construct-list-who who)))


;; Token Name

(define-read-only (get-token-name-wrapper (token-id uint)) 
  (if (< token-id u5) 
    (contract-call? .resources get-token-name token-id) 
    (if (< token-id u50) 
      (contract-call? .items get-token-name token-id) 
      (if (< token-id u58) 
        (contract-call? .collection-1 get-token-name token-id)
        err-inexistent-item))))

(define-private (get-data-token-name (id uint))
  {id: id, token-name-data: (unwrap-panic (get-token-name-wrapper id))})

(define-read-only (get-all-token-name-data (token-id-list (list 100 uint))) 
  (map get-data-token-name token-id-list))


;; Mint

(define-public (mint-wrapper (token-id uint) (amount uint) (recipient principal)) 
  (if (< token-id u5) 
    (contract-call? .resources mint token-id amount recipient) 
    (if (< token-id u50) 
      (contract-call? .items mint token-id amount recipient) 
      (if (< token-id u58) 
        (contract-call? .collection-1 mint token-id amount recipient)
        err-inexistent-item))))


(define-private (mint-wrapper-user (token-id uint) (amount uint) (recipient principal)) 
  (if (< token-id u5) 
    (as-contract (contract-call? .resources mint-user token-id amount recipient))
    (if (< token-id u50) 
      (as-contract (contract-call? .items mint-user token-id amount recipient))
      (if (< token-id u58) 
        (as-contract (contract-call? .collection-1 mint-user token-id amount recipient))
        err-inexistent-item))))

(define-private (mint-wrapper-admin (token-id uint) (amount uint) (recipient principal))
  (begin
    (some 
      (if (< token-id u5) 
        (contract-call? .resources mint token-id amount recipient) 
        (if (< token-id u50) 
          (contract-call? .items mint token-id amount recipient) 
          (if (< token-id u58) 
            (contract-call? .collection-1 mint token-id amount recipient)
            err-inexistent-item))))
    recipient))


(define-private (mint-rewards (reward-tuple {resource-id: uint, resource-qty: uint}) (user principal)) 
  (mint-wrapper-admin (get resource-id reward-tuple) (get resource-qty reward-tuple) user))

;; Burn

(define-public (burn-wrapper (burn-tuple {resource-id: uint, resource-qty: uint}))
  (if (< (get resource-id burn-tuple) u5)
    (contract-call? .resources burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender) 
    (if (< (get resource-id burn-tuple) u50) 
      (contract-call? .items burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender)
      (if (< (get resource-id burn-tuple) u58)
        (contract-call? .collection-1 burn (get resource-id burn-tuple) (get resource-qty burn-tuple) tx-sender)
        err-inexistent-item))))


;; Ownership

(define-private (is-owned-needed-wrapper (item {resource-id: uint, resource-qty: uint})) 
  (unwrap-panic 
    (if (< (get resource-id item) u5) 
      (contract-call? .resources is-owned-needed item) 
      (if (< (get resource-id item) u50) 
        (contract-call? .items is-owned-needed item) 
        (if (< (get resource-id item) u58) 
          (contract-call? .collection-1 is-owned-needed item) 
          err-inexistent-item)))))

(define-private (verified-ownership-function (resources-needed (list 100 { resource-id: uint, resource-qty: uint} )))
  (fold and (map is-owned-needed-wrapper resources-needed) true)) 

;; Starter kit

(define-map starter-kit-system { user: principal } { claimed: bool })

(define-read-only (get-starter-kit-status (user principal))
  (let ((claimed (map-get? starter-kit-system {user: user})))
    (ok claimed)))

(define-public (claim-starter-kit)
  (begin 
    (asserts! (is-none (map-get? starter-kit-system {user: tx-sender})) err-already-claimed)
    (some (mint-wrapper-user u1 u100 tx-sender))
    (some (mint-wrapper-user u2 u100 tx-sender))
    (some (mint-wrapper-user u3 u30 tx-sender))
    (ok (map-set starter-kit-system {user: tx-sender} {claimed: true}))))

;; Level-up

(define-map level-up-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (level-up (id-new uint))
  (begin
    (asserts! (not (is-none (unwrap-panic (get-level-up-resources id-new)))) err-not-some)
    (let  ((level-up-resources (unwrap-panic (get-level-up-resources id-new))))
      (asserts! (verified-ownership-function (unwrap-panic level-up-resources)) err-insufficient-balance)
      (some (map  burn-wrapper (unwrap-panic level-up-resources)))
      (mint-wrapper-user id-new u1 tx-sender))))

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

(define-constant level-up-id-list (list u6 u7 u9 u10 u12 u13 u15 u16 u18 u19 u21 u22 u24 u25 u27 u28 u30 u31 u33 u34 u36 u37 u39 u40 u42 u43 u45 u46 u48 u49))

(define-private (get-data-level-up (id uint))
  {id: id, level-up-data: (unwrap-panic (map-get? level-up-system {id: id}))})

(define-read-only (get-all-level-up-data (token-id-list (list 100 uint))) 
  (map get-data-level-up token-id-list))

;; Crafting

(define-map crafting-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (craft-item (id-new uint))
  (begin
    (asserts! (not (is-none (unwrap-panic (get-crafting-resources id-new)))) err-not-some)
    (let  ((crafting-resources (unwrap-panic (get-crafting-resources id-new))))
      (asserts! (verified-ownership-function (unwrap-panic crafting-resources)) err-insufficient-balance)
      (some (map burn-wrapper (unwrap-panic crafting-resources)))
      (mint-wrapper-user id-new u1 tx-sender))))

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
;; collection 1
(map-set crafting-system {id: u52} (list {resource-id: u3, resource-qty: u2} {resource-id: u4, resource-qty: u4}))
(map-set crafting-system {id: u53} (list {resource-id: u3, resource-qty: u2} {resource-id: u50, resource-qty: u4}))
(map-set crafting-system {id: u54} (list {resource-id: u3, resource-qty: u2} {resource-id: u51, resource-qty: u4}))
(map-set crafting-system {id: u55} (list {resource-id: u3, resource-qty: u2} {resource-id: u4, resource-qty: u5}))
(map-set crafting-system {id: u56} (list {resource-id: u3, resource-qty: u2} {resource-id: u50, resource-qty: u5}))
(map-set crafting-system {id: u57} (list {resource-id: u3, resource-qty: u2} {resource-id: u51, resource-qty: u5}))

(define-constant crafting-id-list (list u5 u8 u11 u14 u17 u20 u23 u26 u29 u32 u35 u38 u41 u44 u47 u52 u53 u54 u55 u56 u57))

(define-private (get-data-crafting (id uint))
  {id: id, crafting-data: (unwrap-panic (map-get? crafting-system {id: id}))})

(define-read-only (get-all-crafting-data (token-id-list (list 100 uint))) 
  (map get-data-crafting token-id-list))

;; Acquisition

(define-map acquisition-system { id: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (buy-item (id-new uint))
  (begin
    (asserts! (not (is-none (unwrap-panic (get-acquisition-resources id-new)))) err-not-some)
    (let  ((acquisition-resources (unwrap-panic (get-acquisition-resources id-new)))) 
      (asserts! (verified-ownership-function (unwrap-panic acquisition-resources)) err-insufficient-balance)
      (some (map burn-wrapper (unwrap-panic acquisition-resources)))
      (mint-wrapper-user id-new u1 tx-sender))))

(define-read-only (get-acquisition-resources (token-id uint))
    (let ((token-urr (map-get? acquisition-system {id: token-id})))
      (ok token-urr)))

(define-public (set-acquisition-resources (token-id uint) (resource-needed (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set acquisition-system {id: token-id} resource-needed))))


(map-set acquisition-system {id: u3} (list {resource-id: u1, resource-qty: u3}))
(map-set acquisition-system {id: u4} (list {resource-id: u1, resource-qty: u5}))
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
;; collection 1
(map-set acquisition-system {id: u50} (list {resource-id: u1, resource-qty: u500}))
(map-set acquisition-system {id: u51} (list {resource-id: u1, resource-qty: u1000}))
(map-set acquisition-system {id: u52} (list {resource-id: u1, resource-qty: u15}))
(map-set acquisition-system {id: u53} (list {resource-id: u1, resource-qty: u50}))
(map-set acquisition-system {id: u54} (list {resource-id: u1, resource-qty: u100}))
(map-set acquisition-system {id: u55} (list {resource-id: u1, resource-qty: u30}))
(map-set acquisition-system {id: u56} (list {resource-id: u1, resource-qty: u100}))
(map-set acquisition-system {id: u57} (list {resource-id: u1, resource-qty: u200}))

(define-constant acquisition-id-list (list u3 u4 u5 u6 u9 u14 u16 u18 u21 u25 u27 u30 u34 u36 u38 u42 u43 u45 u50 u51 u52 u53 u54 u55 u56 u57))

(define-private (get-data-acquisition (id uint))
  {id: id, acquisition-data: (unwrap-panic (map-get? acquisition-system {id: id}))})

(define-read-only (get-all-acquisition-data (token-id-list (list 100 uint))) 
  (map get-data-acquisition token-id-list))

;; Fighting 

;; Fight status

(define-map fight-status-system { user: principal } { next-fight: uint })

(define-read-only (get-fight-status (user principal)) 
  (let ((next-fight (map-get? fight-status-system {user: user}))) 
    (ok next-fight)))

;; Fight Needed Resources

(define-map fight-needed-resources {fight-number: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (start-fight (fight-number uint)) 
  (begin
    (asserts! (not (is-none (unwrap-panic (get-fight-needed-resources fight-number)))) err-not-some)
    (let ((fight-resources-needed (unwrap-panic (get-fight-needed-resources fight-number)))) 
      (asserts! (verified-ownership-function (unwrap-panic fight-resources-needed)) err-insufficient-balance)
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

(define-constant fight-resources-id-list (list u1 u2 u3 u4 u5))

(define-private (get-data-fight-resources (id uint))
  {fight-number: id, fight-resources-data: (unwrap-panic (map-get? fight-needed-resources {fight-number: id}))})

(define-read-only (get-all-fight-resources-data (token-id-list (list 100 uint))) 
  (map get-data-fight-resources token-id-list))

;; Fight Rewards

(define-map fight-reward-system { fight-number: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (reward-fighting (fight-number uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (not (is-none (unwrap-panic (get-fight-rewards fight-number)))) err-not-some)
    (let ((fighting-rewards (unwrap-panic (get-fight-rewards fight-number)))) 
      (asserts! (is-some fighting-rewards) err-not-some)
      (map-set fight-status-system {user: user} {next-fight: (+ fight-number u1)})
      (ok (fold mint-rewards (unwrap-panic fighting-rewards) user)))))

(define-read-only (get-fight-rewards (fight-number uint))
  (let ((token-urr (map-get? fight-reward-system {fight-number: fight-number})))
    (ok token-urr)))

(define-public (set-fight-rewards (fight-number uint) (resource-rewarded (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set fight-reward-system {fight-number: fight-number} resource-rewarded))))

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

(define-constant fight-rewards-id-list (list u1 u2 u3 u4 u5 u6 u7 u8 u9 u10))

(define-private (get-data-fight-rewards (id uint))
  {fight-number: id, fight-rewards-data: (unwrap-panic (map-get? fight-reward-system {fight-number: id}))})

(define-read-only (get-all-fight-rewards-data (token-id-list (list 100 uint))) 
  (map get-data-fight-rewards token-id-list))

;; Sleeping reward center

(define-map sleeping-reward-system {sleeping-time: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (reward-sleeping (sleeping-time uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (not (is-none (unwrap-panic (get-sleeping-rewards sleeping-time)))) err-not-some)
    (let ((sleeping-rewards (unwrap-panic (get-sleeping-rewards sleeping-time)))) 
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

(define-constant sleeping-rewards-id-list (list u5 u10 u20))

(define-private (get-data-sleeping-rewards (id uint))
  {sleeping-time: id, sleeping-rewards-data: (unwrap-panic (map-get? sleeping-reward-system {sleeping-time: id}))})

(define-read-only (get-all-sleeping-rewards-data (token-id-list (list 100 uint))) 
  (map get-data-sleeping-rewards token-id-list))

;; Mining reward center

(define-map mining-reward-system { token-id: uint, mining-time: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (reward-mining (token-id uint) (mining-time uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (not (is-none (unwrap-panic (get-mining-rewards token-id mining-time)))) err-not-some)
    (let  ((mining-rewards (unwrap-panic (get-mining-rewards token-id mining-time)))) 
      (asserts! (is-some mining-rewards) err-not-some)
      (ok (fold mint-rewards (unwrap-panic mining-rewards) user)))))

(define-read-only (get-mining-rewards (token-id uint) (mining-time uint))
    (let ((token-urr (map-get? mining-reward-system {token-id: token-id, mining-time: mining-time})))
      (ok token-urr)))

(define-public (set-mining-rewards (token-id uint) (mining-time uint) (resource-achieved (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set mining-reward-system {token-id: token-id, mining-time: mining-time} resource-achieved))))


(map-set mining-reward-system {token-id: u55, mining-time: u5} (list {resource-id: u4, resource-qty: u1}))
(map-set mining-reward-system {token-id: u55, mining-time: u10} (list {resource-id: u4, resource-qty: u3}))
(map-set mining-reward-system {token-id: u55, mining-time: u20} (list {resource-id: u4, resource-qty: u5} {resource-id: u50, resource-qty: u1}))
(map-set mining-reward-system {token-id: u56, mining-time: u5} (list {resource-id: u4, resource-qty: u4}))
(map-set mining-reward-system {token-id: u56, mining-time: u10} (list {resource-id: u4, resource-qty: u11} {resource-id: u50, resource-qty: u2}))
(map-set mining-reward-system {token-id: u56, mining-time: u20} (list {resource-id: u4, resource-qty: u25} {resource-id: u50, resource-qty: u3} {resource-id: u51, resource-qty: u1}))
(map-set mining-reward-system {token-id: u57, mining-time: u5} (list {resource-id: u4, resource-qty: u12} {resource-id: u50, resource-qty: u1}))
(map-set mining-reward-system {token-id: u57, mining-time: u10} (list {resource-id: u4, resource-qty: u18} {resource-id: u50, resource-qty: u2} {resource-id: u51, resource-qty: u1}))
(map-set mining-reward-system {token-id: u57, mining-time: u20} (list {resource-id: u4, resource-qty: u29} {resource-id: u50, resource-qty: u4} {resource-id: u51, resource-qty: u3}))

(define-constant mining-rewards-id-list 
  (list 
    {token-id: u55, mining-time: u5} {token-id: u55, mining-time: u10} {token-id: u55, mining-time: u20}
    {token-id: u56, mining-time: u5} {token-id: u56, mining-time: u10} {token-id: u56, mining-time: u20}
    {token-id: u57, mining-time: u5} {token-id: u57, mining-time: u10} {token-id: u57, mining-time: u20}))

(define-private (get-data-mining-rewards (mining-tuple {token-id: uint, mining-time: uint}))
  {mining-time: (get mining-time mining-tuple), mining-item: (get token-id mining-tuple), mining-rewards-data: 
    (unwrap-panic 
      (map-get? mining-reward-system 
        {mining-time: (get mining-time mining-tuple), token-id: (get token-id mining-tuple)}))})

(define-read-only (get-all-mining-rewards-data (tuple-list (list 100 {token-id: uint, mining-time: uint}))) 
  (map get-data-mining-rewards tuple-list))

;; Harvesting reward center

(define-map harvesting-system { token-id: uint, harvesting-time: uint } (list 100 { resource-id: uint, resource-qty: uint }))

(define-public (reward-harvesting (token-id uint) (harvesting-time uint) (user principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (not (is-none (unwrap-panic (get-harvesting-rewards token-id harvesting-time)))) err-not-some)
    (let ((harvesting-rewards (unwrap-panic (get-harvesting-rewards token-id harvesting-time)))) 
      (asserts! (is-some harvesting-rewards) err-not-some)
      (ok (fold mint-rewards (unwrap-panic harvesting-rewards) user)))))

(define-read-only (get-harvesting-rewards (token-id uint) (harvesting-time uint))
    (let ((token-urr (map-get? harvesting-system {token-id: token-id, harvesting-time: harvesting-time})))
      (ok token-urr)))

(define-public (set-harvesting-rewards (token-id uint) (harvesting-time uint) (resource-achieved (list 100 {resource-id: uint, resource-qty: uint})))
  (begin 
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)    
    (ok (map-set harvesting-system {token-id: token-id, harvesting-time: harvesting-time} resource-achieved))))

(map-set harvesting-system {token-id: u52, harvesting-time: u5} (list {resource-id: u3, resource-qty: u1}))
(map-set harvesting-system {token-id: u52, harvesting-time: u10} (list {resource-id: u3, resource-qty: u3}))
(map-set harvesting-system {token-id: u52, harvesting-time: u20} (list {resource-id: u3, resource-qty: u7}))
(map-set harvesting-system {token-id: u53, harvesting-time: u5} (list {resource-id: u3, resource-qty: u5}))
(map-set harvesting-system {token-id: u53, harvesting-time: u10} (list {resource-id: u3, resource-qty: u12}))
(map-set harvesting-system {token-id: u53, harvesting-time: u20} (list {resource-id: u3, resource-qty: u26}))
(map-set harvesting-system {token-id: u54, harvesting-time: u5} (list {resource-id: u3, resource-qty: u20}))
(map-set harvesting-system {token-id: u54, harvesting-time: u10} (list {resource-id: u3, resource-qty: u45}))
(map-set harvesting-system {token-id: u54, harvesting-time: u20} (list {resource-id: u3, resource-qty: u100}))

(define-constant harvesting-rewards-id-list 
  (list 
    {token-id: u52, harvesting-time: u5} {token-id: u52, harvesting-time: u10} {token-id: u52, harvesting-time: u20}
    {token-id: u53, harvesting-time: u5} {token-id: u53, harvesting-time: u10} {token-id: u53, harvesting-time: u20}
    {token-id: u54, harvesting-time: u5} {token-id: u54, harvesting-time: u10} {token-id: u54, harvesting-time: u20}))

(define-private (get-data-harvesting-rewards (harvesting-tuple {token-id: uint, harvesting-time: uint}))
  {harvesting-time: (get harvesting-time harvesting-tuple), harvesting-item: (get token-id harvesting-tuple), harvesting-rewards-data: 
    (unwrap-panic 
      (map-get? harvesting-system 
        {harvesting-time: (get harvesting-time harvesting-tuple), token-id: (get token-id harvesting-tuple)}))})

(define-read-only (get-all-harvesting-rewards-data (tuple-list (list 100 {token-id: uint, harvesting-time: uint}))) 
  (map get-data-harvesting-rewards tuple-list))

(define-map enemy-system { fight-number: uint } {dmg: uint, health: uint, defense: uint})
(map-set enemy-system {fight-number: u1} {dmg: u2, health: u0, defense: u0})
(map-set enemy-system {fight-number: u2} {dmg: u4, health: u0, defense: u4})
(map-set enemy-system {fight-number: u3} {dmg: u5, health: u50, defense: u16})
(map-set enemy-system {fight-number: u4} {dmg: u4, health: u50, defense: u17})
(map-set enemy-system {fight-number: u5} {dmg: u7, health: u100, defense: u27})
(map-set enemy-system {fight-number: u6} {dmg: u9, health: u70, defense: u50})
(map-set enemy-system {fight-number: u7} {dmg: u11, health: u100, defense: u72})
(map-set enemy-system {fight-number: u8} {dmg: u14, health: u135, defense: u100})
(map-set enemy-system {fight-number: u9} {dmg: u16, health: u135, defense: u125})
(map-set enemy-system {fight-number: u10} {dmg: u17, health: u200, defense: u125})

(define-private (get-data-enemy (id uint))
  {fight-number: id, enemy-data: (unwrap-panic (map-get? enemy-system {fight-number: id}))})

(define-read-only (get-all-enemy-data (token-id-list (list 100 uint))) 
  (map get-data-enemy token-id-list))
