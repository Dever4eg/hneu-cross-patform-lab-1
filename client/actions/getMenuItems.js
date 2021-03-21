const { connect } = require("../tcp")

const deserializeData = (payload) => {
    return payload
        .toString()
        .split('\n')
        .filter(line => !!line)
        .map(line => {
            const [id, name, price, weight] = line.split('%')
            return {
                id: parseInt(id),
                name: name,
                price: parseInt(price),
                weight: parseInt(weight),
            }
        })
}

module.exports = () => {
    connect(client => {
        client.write('get_menu')
        client.on('data', data => {
            const menu = deserializeData(data)
            console.log('Menu received from server:')
            menu.forEach(({ id, name, price, weight }) => {
                console.log(`${id}: ${name}, ${weight}g, $${price}`)
            })
        })
        client.end()
    })
}
