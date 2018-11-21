const StarNotary = artifacts.require("StarNotary");

contract("StarNotary", accounts => {
  const name = "My first ethereum star!";
  const story = "Incredible creation story.";
  const deg = "29";
  const mag = "30";
  const cent = "31";
  const tokenId = 1;

  beforeEach(async function() {
    this.contract = await StarNotary.new({ from: accounts[0] });
  });

  /**
   * Test the following functions
   *  createStar
   */
  describe("can create a star", () => {
    it("can create a star and get its attributes", async function() {
      await this.contract.createStar(name, story, deg, mag, cent, tokenId, {
        from: accounts[0]
      });

      const createdStarInfo = await this.contract.tokenIdToStarInfo(tokenId);
      assert.equal(createdStarInfo[0], name);
      assert.equal(createdStarInfo[1], story);
      assert.equal(createdStarInfo[2], deg);
      assert.equal(createdStarInfo[3], mag);
      assert.equal(createdStarInfo[4], cent);
    });
  });

  /**
   * Tests the following functions
   *  ownerOf
   *  putStarUpForSale
   *  starsForSale
   *  buyStar
   */
  describe("buying and selling stars", () => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let randomMaliciousUser = accounts[3];

    let starId = 1;
    let starPrice = web3.toWei(0.01, "ether");

    beforeEach(async function() {
      await this.contract.createStar(name, story, deg, mag, cent, starId, {
        from: user1
      });
    });

    it("user1 can put up their star for sale", async function() {
      assert.equal(await this.contract.ownerOf(starId), user1);
      await this.contract.putStarUpForSale(starId, starPrice, { from: user1 });

      assert.equal(await this.contract.starsForSale(starId), starPrice);
    });

    describe("user2 can buy a star that was put up for sale", () => {
      beforeEach(async function() {
        await this.contract.putStarUpForSale(starId, starPrice, {
          from: user1
        });
      });

      it("user2 is the owner of the star after they buy it", async function() {
        await this.contract.buyStar(starId, {
          from: user2,
          value: starPrice,
          gasPrice: 0
        });
        assert.equal(await this.contract.ownerOf(starId), user2);
      });

      it("user2 ether balance changed correctly", async function() {
        let overpaidAmount = web3.toWei(0.05, "ether");
        const balanceBeforeTransaction = web3.eth.getBalance(user2);
        await this.contract.buyStar(starId, {
          from: user2,
          value: overpaidAmount,
          gasPrice: 0
        });
        const balanceAfterTransaction = web3.eth.getBalance(user2);

        assert.equal(
          balanceBeforeTransaction.sub(balanceAfterTransaction),
          starPrice
        );
      });
    });
  });

  describe("check if star exists", () => {
    it("can check if created star exists", async () => {
      const starToCheck = {
        name: "Star 1",
        story: "Story of star 1",
        dec: "40",
        mag: "41",
        cent: "42"
      };
      const tokenId = 0;
      this.contract = await StarNotary.new({ from: accounts[0] });
      await this.contract.createStar(
        starToCheck.name,
        starToCheck.story,
        starToCheck.dec,
        starToCheck.mag,
        starToCheck.cent,
        tokenId,
        {
          from: accounts[0]
        }
      );

      assert(
        this.contract.checkIfStarExist(
          starToCheck.dec,
          starToCheck.mag,
          starToCheck.cent
        ),
        true
      );
    });
  });
});

var expectThrow = async function(promise) {
  try {
    await promise;
  } catch (error) {
    assert.exists(error);
    return;
  }

  assert.fail("Expected an error but didnt see one!");
};
