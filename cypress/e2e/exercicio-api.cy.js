/// <reference types="cypress" />
import contrato from "..//contracts/produtos.contract";
import { faker } from '@faker-js/faker';
//Manter o server ligado no CDM = npm start 

describe('Testes da Funcionalidade Usuários', () => {
  it('Deve validar contrato de usuários -  POST', () => {
    cy.request('usuarios').then((response) => {
      return contrato.validateAsync(response.body)
    })
  });
  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    })
  });
  it.only('Deve cadastrar um usuário com sucesso - POST', () => {
    const name = faker.person.firstName()
    const email = faker.internet.email();
    const senha = faker.number.binary(255)
    cy.cadastraUser_POST(name, email, senha, 'false').then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
  });
  it('Deve validar um usuário com email inválido - POST', () => {
    cy.acesso('fulan@qa.com', 'teste').then((response) => {
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
    })
  });
  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    let nome = faker.person.firstName() + Math.floor(Math.random() * 1000)
    let email = "Faker" + Math.floor(Math.random() * 1000) + '@ebac.com'
    let senha = faker.number.binary(255) + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario_PUT(nome, email, senha, 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body: {
            "nome": nome,
            "email": email,
            "password": 'success',
            "administrador": 'true'
          }
        }).should(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
          expect(response.status).to.equal(200)
        })
      });
  });
  it('Deve deletar um usuário previamente cadastrado -  DELETE ', () => {
    let nome = 'Teste' + Math.floor(Math.random() * 1000)
    let email = 'teste.qa' + Math.floor(Math.random() * 1000) + '@ebac.com'
    let senha = 'teste' + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario_PUT(nome, email, senha, 'false')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`
        }).should(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
        })
      })
  });
});