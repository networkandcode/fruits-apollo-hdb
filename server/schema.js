const typeDefs = `
  input CreateTableBody {
    schema: String!
    table: String!
    hash_attribute: String!
  }

  input FruitInput {
    name: String!
    "calories per 100 gm"
    calories: Int!
  }

  type Query {
    fruits(schema: String!, table: String!): [Fruit]
    fruit(schema: String!, table: String!, name: String!): [Fruit]
  }

  type Mutation {
    createSchema(schema: String!): ApiResponse!
    createTable(body: CreateTableBody!): ApiResponse!
    insertRecords(schema: String!, table: String!, records: [FruitInput!]! ): ApiResponse!
  }

  type Fruit {
    id: ID!
    name: String!
    calories: Int!
  }

  type ApiResponse {
    status: Int!
    message: String!
  }
`;

export default typeDefs;
