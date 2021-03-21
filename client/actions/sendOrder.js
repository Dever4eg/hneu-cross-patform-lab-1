const { connect } = require("../tcp")

const deserializeOrder = (data) => {
    const [infoRow, ...rows] = data.toString().split('\n')
    const [idRow, sumRow] = infoRow.split(';')
    const [,id] = idRow.split('=')
    const [,sum] = sumRow.split('=')

    const dishes = rows.filter(row => !!row).map(row => {
        const [id, name, price, weight, count] = row.split('%')

        return {
            count: parseInt(count),
            id: parseInt(id),
            name: name,
            price: parseInt(price),
            weight: parseInt(weight),
        }
    })

    return { id, dishes, sum }
}

module.exports = () => {
    connect(client => {
        const ids = process.argv.slice(3)

        if (ids.length === 0) {
            console.log('Select dish Ids')
            process.exit()
        }

        let payload = 'send_order\n' + ids.map(id => `${id}:1`).join('\n')

        client.write(payload)
        client.on('data', data => {
            const order = deserializeOrder(data)
            console.log(`Created order, with id: ${order.id}`)
            order.dishes.forEach(({ name, price, weight, count }) => {
                console.log(`${count} PCS, ${name}, ${weight}g, $${price}`)
            })
            console.log(`Summary cost: $${order.sum}`)
        })
        client.end()
    })
}
