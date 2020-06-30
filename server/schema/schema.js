const authors = require('../models/authors')
const books =  require('../models/books')

const graphql = require('graphql')

const _ = require('lodash')

const {GraphQLObjectType, 
       GraphQLString, 
       GraphQLSchema, 
       GraphQLID, 
       GraphQLInt,
       GraphQLList,
       GraphQLNonNull
    } = graphql


const tipePengarang = new GraphQLObjectType({
    name: 'Pengarang',
        fields: () => ({
            id: {type: GraphQLID},
            nama: {type: GraphQLString},
            umur: {type: GraphQLInt},
            books: {
                type: new GraphQLList(tipeBuku),
                resolve(parent, args){
                    // return _.filter(books, {authorid: parent.id});
                    return books.find({authorid: parent.id});
                }

            }
        })
})


const tipeBuku = new GraphQLObjectType(
    {
        name: 'Buku',
        fields: () => ({
            id: {type: GraphQLID},
            judul: {type: GraphQLString},
            jenis: {type: GraphQLString},
            author : {
                type: tipePengarang,
                resolve(parent, args){
                    console.log(parent)
                    // return _.find(authors, {id: parent.authorid});
                    return authors.findById(parent.authorid);
                }
            }
        })
    })

const QueryPusat =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: tipeBuku,
            args: {id: {type: GraphQLID }},
            resolve(parent, args) {
                //code get data from db/ other source
                console.log(typeof(args.id))
                // return _.find(books, {id: args.id});
                return books.findById(args.id)
            }
        },
        pengarang: {
            type: tipePengarang,
            args: {id: {type: GraphQLID }},
            resolve(parent, args) {
                //code get data from db/ other source
                console.log(typeof(args.id))
                // return _.find(authors, {id: args.id});
                return authors.findById(args.id)
            }
        },
    books: {
        type: new GraphQLList(tipeBuku),
        resolve(parent, args) {
            return books.find({})
        }
    },
    authors: {
        type: new GraphQLList(tipePengarang),
        resolve(parent, args) {
            return authors.find({})
        }
    }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: tipePengarang,
            args: {
                nama: {type: GraphQLString},
                umur: {type: GraphQLInt}
            },
            resolve(parent, args){
                let pengarang = new authors({
                    nama: args.nama,
                    umur: args.umur
                });

                return pengarang.save()
            }
        },
        addBook:{
            type: tipeBuku,
            args: {
                judul: { type: new GraphQLNonNull(GraphQLString) },
                jenis: { type: new GraphQLNonNull(GraphQLString) },
                authorid: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new books({
                    judul: args.judul,
                    jenis: args.jenis,
                    authorid: args.authorid
                });

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: QueryPusat,
    mutation: Mutation
})