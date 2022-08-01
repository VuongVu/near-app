## Deploy
```near deploy --accountId=nearapp.near-dev.testnet --wasmFile=build/release/contract.wasm```

## Call function
```near call nearapp.near-dev.testnet setProduct '{"product": {"id": "0", "name": "BBQ", "description": "Grilled chicken and beef served with vegetables and chips.", "location": "Berlin, Germany", "price": "1000000000000000000000000", "image": "https://i.imgur.com/yPreV19.png"}}' --accountId=near-dev.testnet```

## View 
```near view nearapp.near-dev.testnet getProduct '{"id": "0"}'```

## Buy
```near call buyer.near-dev.testnet buyProduct '{"productId": "0"}' --depositYocto=1000000000000000000000000 --accountId=buyer.near-dev.testnet```
