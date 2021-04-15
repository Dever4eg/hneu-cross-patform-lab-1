# TCP Server

## Run server

```
npm run server
```

## Get menu

**Request**:

```
get_menu
```

**Response**

```
UUID%"Dish name"%Price%Weight
```

Example

```
3%"Hot-dog"%500%400
```

## Send order

**Request**

```
send_order
UUID:count
UUID:count
UUID:count
```

**Response**

```
id:id;sum=sum
UUID%"Dish name"%Price%Weight%Count
```

Example

```
id:42;sum=534
3%"Hot-dog"%500%400%1
```

# TCP Client

```
npm run client <COMMAND>
```

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

TODO:

- [x] Add logger lib
- [x] Implement UUID
- [x] Implement RPC Interface
- [x] Implement different formats on server
- [x] Implement different formats on client
- [ ] Implement GRPC

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