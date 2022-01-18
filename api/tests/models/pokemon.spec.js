const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model: conection to Database", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Pokemon Table", () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('Name', () => {
      it("Should throw an error if name is Null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Should work when its a valid name", async () => {
        await Pokemon.create({ name: "pikachu" });
        const r = await Pokemon.findOne({ where: { name: "pikachu" } });
        expect(r.dataValues.name).to.equal("pikachu");
      });
    })

    describe('Id', () => {
      it("Should Create an ID", async () => {
        await Pokemon.create({ name: "pikachu" });
        const r = await Pokemon.findOne({ where: { name: "pikachu" } });
        expect(r.dataValues).to.have.own.property("id");
        expect(r.dataValues.id).to.not.equal("");
      });
    })
    
    describe('Attack', () => {
      it('Should Create an Attack', async () => {
        await Pokemon.create({name: "Pikachu"})
        const r = await Pokemon.findOne({where:{name:"Pikachu"}})
        expect(r.dataValues).to.have.own.property("attack")
        expect(r.dataValues.attack).to.not.equal("");
      })
    })

    describe('Hp', () => {
      it('Should Create an Hp', async () => {
        await Pokemon.create({name: "Pikachu"})
        const r = await Pokemon.findOne({where:{name:"Pikachu"}})
        expect(r.dataValues).to.have.own.property("hp")
        expect(r.dataValues.hp).to.not.equal("");
      })
    })
    
  });
});
