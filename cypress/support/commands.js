import { da, faker } from "@faker-js/faker"

Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
})
Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: '/produtos',
        headers: { authorization: token },
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        failOnStatusCode: false
    })
})
Cypress.Commands.add('acesso', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            "email": email,
            "password": senha
        },
        failOnStatusCode: false
    })
});
Cypress.Commands.add('cadastraUser_POST', (nome, email, senha, adm) => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": adm
        }
    })
});
Cypress.Commands.add('cadastrarUsuario_PUT', (nome, email, senha, administrador) => {
    cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": administrador
        },
        failOnStatusCode: false
    })
})