import {app, sequelize} from "../express";
import request from "supertest";
import {Umzug} from "umzug";
import {migrator} from "../../config-migration/migrator";

let migration: Umzug<any>;

describe("E2E test for client", () => {

    beforeEach(async () => {
        migration = migrator(sequelize)
        await migration.up()
    })

    afterAll(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "Mathias",
                email: "mathias@gmail.com",
                document: "123456",
                address: {
                    street: "street MR",
                    number: "50",
                    complement: "complement my home",
                    city: "city A",
                    state: "state A",
                    zipCode: "332211-231"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Mathias");
        expect(response.body.email).toBe("mathias@gmail.com");
        expect(response.body.document).toBe("123456");
        expect(response.body.address.street).toBe("street MR");
        expect(response.body.address.number).toBe("50");
        expect(response.body.address.complement).toBe("complement my home");
        expect(response.body.address.city).toBe("city A");
        expect(response.body.address.state).toBe("state A");
        expect(response.body.address.zipCode).toBe("332211-231");
    })
})
