# Star Notary Service

The app provides an implementation of a star notary service on the ethereum rinkeby network and that can used locally (through ganache).

The user can:

- create non-fungible asset (through standard ERC721), in this case, a star
- and interact with this star (put it for sale, authorize another user, buy it from current owner...)

## StarNotary Contract

The contract implements the ERC721 standard (through openzeppelin).

### Metadata

A star contract has a:

- name
- story
- coordinates:
  - dec
  - mag
  - cent
- tokenId

### Available functions

It implements the following functions (directly or by inheriting from ERC721):
createStar(), putStarUpForSale(), buyStar(), checkIfStarExist(), mint(), approve(), safeTransferFrom(), SetApprovalForAll(), getApproved(), isApprovedForAll(), ownerOf(), starsForSale()

## Contract Deployment

The contract was deployed on rinkeby (through infura) at the address `0x4A6fe246fBB2cA90Ee11836AB24c981527a7573c`.

### createStar

The following star was created by the address `0x42a7f54541e77625369DCE4C0de503B373CD2E83`:

- name: First star!
- story: star number on ethereum rinkeby! Udacity rocks!
- dec: 20
- mag: 30
- cent: 40
- tokenId: 100

The transaction hash of the creation is `0xd7d670fbd09be58e7fe30e6211ba904898055f99465faea26a086a82071dd9b9`.

### putStarUpForSale

Then the star was put for sale for a price of 1 eth. The transaction of the put up for sale is `0x227921e307970b49727b17efa8df2eaa564e988e54a4a1cc3b1ad9dfb183f0c6`.

### Transactions log

You can view the transaction on `https://rinkeby.etherscan.io/` by using either the transaction hash, the address of the contract or the wallet address.
