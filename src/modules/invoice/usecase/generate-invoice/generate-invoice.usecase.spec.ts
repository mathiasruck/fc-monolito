import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn()
    }
}

describe("Generate invoice use case unit test", () => {

    it("should generate an invoice", async () => {

        const repository = MockRepository()
        const usecase = new GenerateInvoiceUsecase(repository)

        const input = {
            id: "1",
            name: "Mathias",
            document: "99-888",
            street: "Rua A",
            number: "88",
            complement: "Casa Azul",
            city: "Tallinn",
            state: "Harjumaa",
            zipCode: "987556",
            items: [
                {
                    id: "2",
                    name: "Phone",
                    price: 500
                },
                {
                    id: "3",
                    name: "Phone Cover",
                    price: 5
                }],
        }
        const result = await usecase.execute(input)

        expect(repository.generate).toBeCalled()
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: input.items[0].id,
                name: input.items[0].name,
                price: input.items[0].price
            }),
            expect.objectContaining({
                id: input.items[1].id,
                name: input.items[1].name,
                price: input.items[1].price
            }),
        ]));
        const expectedTotal = result.items.map(item => item.price)
            .reduce((sum, current) => sum + current);
        const actualTotal = input.items.map(item => item.price)
            .reduce((sum, current) => sum + current);
        expect(expectedTotal).toEqual(actualTotal);
    })
})
