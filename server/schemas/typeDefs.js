const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Date

  type userDate {
    date: Date!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    savedItems: [Item]
  }

  input updateItem {
    itemImages: String
    purchasePrice: Float
    purchaseDate: Date
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID): User
    me: User
  }

  type Item {
    _id: ID
    itemImages: String!
    itemName: String!
    purchasePrice: Float!
    price: Float!
    profit: Float!
    quantity: Int!
    percent: Float!
    purchaseDate: Date!
  }

  input itemInput {
    _id: ID
    itemImages: String
    itemName: String
    purchasePrice: Float
    price: Float
    profit: Float
    quantity: Int
    percent: Float
    purchaseDate: Date
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    updateUser(username: String, email: String): User

    deleteUser: User 

    login(email: String!, password: String!): Auth

    #saveItem(item: itemInput): User

    deleteItem(_id: ID): Item 

    updateItem(_id: ID, itemName: String!, itemImages: String!, purchaseDate: Date!): Item 

    saveItem(purchasePrice: Float!, price: Float!, itemName: String!, percent: Float!, profit: Float!, quantity: Int!, purchaseDate: Date!, itemImages: String!): Item
  }
`;

module.exports = typeDefs;
