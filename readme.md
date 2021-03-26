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
