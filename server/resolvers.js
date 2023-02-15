const resolvers = {
    Query: {
      fruits: (_, args, contextValue) => {
        const { schema, table } = args;
        const body = {
          "operation": "sql",
          "sql": `SELECT * FROM ${schema}.${table}`,
        }
  
        return contextValue.dataSources.hdbApi.sqlQuery(body);
      },
      fruit: (_, args, contextValue) => {
        const { schema, table, name } = args;
        const body = {
          "operation": "sql",
          "sql": `SELECT * FROM ${schema}.${table} where name = "${name}"`
        };
  
        return contextValue.dataSources.hdbApi.sqlQuery(body);
      },
    },
    Mutation: {
      // There are four args parent, args, contextValue and info
      createSchema: (_, { schema }, contextValue) => {
        const body = {
          operation: "create_schema",
          schema,
        };
  
        return contextValue.dataSources.hdbApi.noSqlQuery(body);
      },
      createTable: (parent, { body }, contextValue, info) => {
        body = {
          ...body,
          operation: "create_table",
        }
  
        return contextValue.dataSources.hdbApi.noSqlQuery(body);
      },
      insertRecords: (parent, { schema, table, records }, contextValue, info) => {
        const body = {
          operation: "insert",
          schema,
          table,
          records
        }
  
        return contextValue.dataSources.hdbApi.noSqlQuery(body);
      }
    }
  };

  export default resolvers;
