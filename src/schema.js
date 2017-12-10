const fetch = require('node-fetch')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql')

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    description: '...',

    fields: () => ({
        bs: {
            type: GraphQLString,
            resolve: company => company.bs
        },
        catchPhrase: {
            type: GraphQLString,
            resolve: company => company.catchPhrase
        },
        name: {
            type: GraphQLString,
            resolve: company => company.name
        },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: user => user[0].name
        },
        email: {
            type: GraphQLString,
            resolve: user => user[0].email
        },
        username: {
            type: GraphQLString,
            resolve: user => user[0].username
        },
        company: {
            type: CompanyType,
            resolve: user => user[0].company
        }
    }),
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            user: {
                type: UserType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(`https://jsonplaceholder.typicode.com/users/?id=${args.id}`)
                    .then(res => res.json())
            }
        })
    })
})