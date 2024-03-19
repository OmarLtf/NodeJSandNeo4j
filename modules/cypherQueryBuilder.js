class CypherQueryBuilder {
    constructor() { }

    // Method to generate a Cypher query to create nodes from a list of objects
    static createNodesQueryFromList(label, objects) {
        if (!Array.isArray(objects) || objects.length === 0) {
            throw new Error('Invalid input. Expected a non-empty array of objects.');
        }

        const nodesString = objects
            .map(obj => {
                const properties = Object.entries(obj)
                    .map(([key, value]) => `${key}: '${value}'`)
                    .join(', ');
                return `(:${label} {${properties}})`;
            })
            .join(', ');

        return `CREATE ${nodesString} `;
    }

    static createRelationToExistingNodes(o1, o2, r, label1, label2, labelR) {
        if (!o1 || !o2 || !r || !label1 || label1 === "" || !label2 || label2 === "" || !labelR || labelR === "") {
            throw new Error("Invalid input. Expected non null objects")
        }

        return `MATCH (e:${label1} {${Object.entries(o1).map(([key, value]) => `${key}: '${value}'`).join(', ')}}), (s:${label2} {${Object.entries(o2).map(([key, value]) => `${key}: '${value}'`).join(', ')}}) CREATE (e) -[r:${labelR} {${Object.entries(r).map(([key, value]) => `${key}: '${value}'`).join(', ')}}]-> (s)`

    }

    static createMatchQueryWithRelationOpportunity(o1) {
        if (!o1 || o1 == {}) {
            throw new Error("Invalic input expected an object and a label")
        }
        return `match (o:Opportunity ${o1.opportunityName !== "" ? `where o.opportunityName = '${o1.opportunityName}'` : ''} ) -[n:NEEDS]-> (s:Skill) <-[hs:HAS_SKILL]- (e:Employee)
        match (e:Employee) -[ha:HAS_STATUS]-> (a:Availability) return e.firstName, e.lastName, e.age, a.availabilityName`
    }

    static createMatchQueryWithRelationCity(o1) {
        if (!o1 || o1 == {}) {
            throw new Error("Invalic input expected an object and a label")
        }
        return `match (o:Opportunity) -[r:RUNS_IN]-> (c:City ${o1.cityName !== '' ? `where c.cityName = '${o1.cityName}'` : ''})
        
        return o['<id>'], o.opportunityName, c.cityName`
    }
}



module.exports = { CypherQueryBuilder }