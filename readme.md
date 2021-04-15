# Labs "Cross platform programming"

- [x] Get menu method
- [x] Send order method
- [x] Tcp Server
- [x] Tcp Client
- [x] Add logger lib
- [x] Implement UUID
- [x] Implement RPC Interface
- [x] Implement different formats on server (json, xml)
- [x] Implement different formats on client (json, xml)
- [X] Implement Http REST Api
- [ ] Implement GRPC

# TCP Server

## Run server

```
npm run server
```
or in dev mode (will reload when code changes)
```
npm run server
```

Arguments:

**-f, --format** - format of data transfer, possible values: json, xml

## Get menu

**Request**:

```json
{
    "id": "uuid",
    "method": "get_menu",
    "params": {}
}
```

**Response**

```json
{
  "id": "5a9f9955-05f6-45ef-8e14-9f3826bef30a",
  "error": null,
  "result": [
    {
      "id": "1",
      "uuid": "07ea2212-ff98-48d6-833c-b2c0579a3832",
      "name": "Спагетти",
      "price": 150,
      "weight": 600
    },
    {
      "id": "2",
      "uuid": "0732f33f-7527-4e37-8cee-2612520b7345",
      "name": "Борщ",
      "price": 250,
      "weight": 500
    }
  ]
}
```

## Send order

**Request**

```json
{
  "id": "56a1e7ab-2807-4ef8-8973-48a8c4ef785e",
  "method": "send_order",
  "params": {
    "dishes": [
      {
        "id": "1",
        "count": 1
      },
      {
        "id": "2",
        "count": 1
      }
    ]
  }
}
```

**Response**

```json
{
  "id": "56a1e7ab-2807-4ef8-8973-48a8c4ef785e",
  "error": null,
  "result": {
    "id": "6228599f-25ce-49dc-9d93-100ed380c4ee",
    "dishes": [
      {
        "dish": {
          "id": "1",
          "uuid": "4b839e78-e8af-4f42-88cc-6fc46b261d70",
          "name": "Спагетти",
          "price": 150,
          "weight": 600
        },
        "count": 1
      },
      {
        "dish": {
          "id": "2",
          "uuid": "b88b0df3-d16d-4009-898d-a7ecd8bb0f94",
          "name": "Борщ",
          "price": 250,
          "weight": 500
        },
        "count": 1
      }
    ],
    "sum": 400
  }
}
```

Logs example (json)

```
[2021-04-15 10:31:22] info: TCP Server is running on 127.0.0.1:54321
[2021-04-15 10:31:32] info: Client connected: 127.0.0.1:54467
[2021-04-15 10:31:32] info: Received data: {"id":"a470f59e-40ca-49f0-8a1c-7c84a7eda9ac","method":"get_menu","params":{}}
[2021-04-15 10:31:32] info: Sending response: {"id":"a470f59e-40ca-49f0-8a1c-7c84a7eda9ac","error":null,"result":[{"id":"1","uuid":"b27cc68b-1977-4a07-811c-0bc33a840e44","name":"Спагетти","price":150,"weight":600},{"id":"2","uuid":"eff7206a-624b-4fd8-94e0-939120faa95b","name":"Борщ","price":250,"weight":500}]}
[2021-04-15 10:31:32] info: Client connection closed: 127.0.0.1:54467
[2021-04-15 10:31:40] info: Client connected: 127.0.0.1:54468
[2021-04-15 10:31:40] info: Received data: {"id":"da5c1771-596a-4ee9-83ca-b2ba1cd10bb9","method":"send_order","params":{"dishes":[{"id":"1","count":1}]}}
[2021-04-15 10:31:40] info: Orders [
  {
    id: 'cce2d9fd-2114-49b9-9654-ac00aeec8029',
    dishes: [
      {
        dish: {
          id: '1',
          uuid: '41bcb4a4-3088-43ed-8d61-85f84cc17145',
          name: 'Спагетти',
          price: 150,
          weight: 600
        },
        count: 1
      },
      [length]: 1
    ],
    sum: 150
  },
  [length]: 1
]
[2021-04-15 10:31:40] info: Sending response: {"id":"da5c1771-596a-4ee9-83ca-b2ba1cd10bb9","error":null,"result":{"id":"cce2d9fd-2114-49b9-9654-ac00aeec8029","dishes":[{"dish":{"id":"1","uuid":"41bcb4a4-3088-43ed-8d61-85f84cc17145","name":"Спагетти","price":150,"weight":600},"count":1}],"sum":150}}
[2021-04-15 10:31:40] info: Client connection closed: 127.0.0.1:54468
```

Logs example (xml)

```
[2021-04-15 10:34:44] info: TCP Server is running on 127.0.0.1:54321
[2021-04-15 10:34:55] info: Client connected: 127.0.0.1:54491
[2021-04-15 10:34:55] info: Received data: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<procedure>
  <id>5a6243a6-28f0-4939-83eb-b801e97a24f3</id>
  <method>get_menu</method>
  <params/>
</procedure>
[2021-04-15 10:34:55] info: Sending response: <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<response>
  <id>5a6243a6-28f0-4939-83eb-b801e97a24f3</id>
  <error/>
  <result>
    <id>1</id>
    <uuid>c68b6a7f-8f9f-41a6-935c-58de31301e4b</uuid>
    <name>Спагетти</name>
    <price>150</price>
    <weight>600</weight>
  </result>
  <result>
    <id>2</id>
    <uuid>6ea82fbc-506b-4ae6-85ab-246d67d96ffb</uuid>
    <name>Борщ</name>
    <price>250</price>
    <weight>500</weight>
  </result>
</response>
[2021-04-15 10:34:55] info: Client connection closed: 127.0.0.1:54491
```

# TCP Client

```
npm run client <COMMAND>
```

Arguments:

**-f, --format** - format of data transfer, possible values: json, xml

## Available commands

**get_menu**

example

```
node client get_menu
```

output

```
Menu received from server:
1: Колбаса, 600g,$150
2: Борщ, 500g, $250
```

**send_order**

example

```
node client send_order 1 2
```


output

```
Created order, with id: 1
1 PCS, Колбаса, 600g, $150
1 PCS, Борщ, 500g, $250
Summary cost: $400
```

# HTTP Server (REST Api)

## Running

```shell
npm run http-server
```

or in dev mode (will reload when code changes)

```shell
npm run http-server-dev
```

## Endpoints

### GET /dishes

```shell
curl -X GET http://127.0.0.1:8081/dishes | jq
```

```json
[
  {
    "id": "1",
    "uuid": "89258154-d278-45fd-a8fd-b24f1471fc98",
    "name": "Спагетти",
    "price": 150,
    "weight": 600
  },
  {
    "id": "2",
    "uuid": "56eb45c7-0b7f-4f72-a90e-25f310ccc368",
    "name": "Борщ",
    "price": 250,
    "weight": 500
  }
]
```

### POST /orders

```shell
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"dishes": [{"id": "14", "count": 2}]}' \
  http://127.0.0.1:8081/orders | jq
```

Error response
```json
{
  "status": "error",
  "error": "Dish with id 14 not found"
}
```

Success response
```json
{
  "status": "ok",
  "result": {
    "id": "19e4fbfe-0e59-445c-a321-09fe2287bf6a",
    "dishes": [
      {
        "dish": {
          "id": "2",
          "uuid": "912e4341-fa6d-4ae3-ac2e-889738fec88d",
          "name": "Борщ",
          "price": 250,
          "weight": 500
        },
        "count": 2
      }
    ],
    "sum": 500
  }
}
```

# GRPC Server

## Running

```shell
npm run grpc-server
```

or in dev mode (will reload when code changes)

```shell
npm run grpc-server-dev
```

Proto files: [/src/server/grpc/proto/restaurant.proto](/src/server/grpc/proto/restaurant.proto)

## Methods

### Get Menu

![Image](/images/grpc/get-menu.png)

### Send Order

![Image](/images/grpc/send-order.png)
