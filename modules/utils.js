class Utils {
    constructor() {

    }

    static formatData(data, attributes) {
        let send = []
        data.forEach(record => {
            let element = {}
            record._fields.forEach((item, index) => {
                element = {
                    ...element,
                    [attributes[index]]: item,
                }
            })
            send.push(element)
        })

        return send
    }
}



module.exports = { Utils }