## Deploy
```near deploy --accountId=nearapp.near-dev.testnet --wasmFile=build/release/contract.wasm```

## Call function
```near call nearapp.near-dev.testnet initialTicket '{"newTicket": {"id": "1", "name": "Summer Paradise", "description": "It is time to announce the biggest festival event for 2022", "price": "1000000000000000000000000", "remaining": 10, "image": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/summer-paradise-festival-poster-template-design-bf44e0cc69fdd137fbe8ab1d2bb1c607_screen.jpg?ts=1651983595"}}' --accountId=near-dev.testnet```

## View 
```near view nearapp.near-dev.testnet getTicket '{"id": "1"}'```

## Buy
```near call nearapp.near-dev.testnet buyTicket '{"ticketId": "1"}' --depositYocto=1000000000000000000000000 --accountId=buyer.near-dev.testnet```
