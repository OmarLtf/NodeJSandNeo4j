const { createSession } = require("../neo4jRepos/neo4")


const testNeo = async (entity = "") => {
    const session = createSession()
    if (entity === "" || !(typeof (entity) === typeof (""))) throw new Error("invalid input expexted non empty string")
    try {

        return await session.run(`MATCH (n:${entity}) return n`)

    } catch (error) {
        throw new Error(error)
    } finally {
        await session.close()
    }
}

const testRunQueyry = async (query) => {
    const session = createSession()
    try {


        return await session.run(query)


    } catch (error) {
        throw new Error(error)
    } finally {
        await session.close()
    }
}


const testCreateRelations = async (queries) => {
    const session = createSession()
    try {
        if (!Array.isArray(queries) || queries.length === 0) {
            throw new Error("expected non empty array")
        }


    } catch (error) {
        throw new Error(error)
    } finally {
        await session.close()
    }
}


module.exports = { testNeo, testRunQueyry }