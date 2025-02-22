const user = {
    id: "USER-123456",
    name: {
        first: "Alice",
        last: "Liddell"
    },
    email: "alice@example.com",
    address: {
        shipping: {
            street: "123 Rabbit Hole",
            city: "Wonderland",
            state: "Fantasy",
            postalCode: "12345",
            country: "WL"
        },
        billing: {
            street: "456 Mad Hatter Lane",
            city: "Tea Party",
            state: "Fantasy",
            postalCode: "67890",
            country: "WL"
        }
    },
    payment: {
        total: "100.00",
        currency: "USD",
        details: {
            subtotal: "75.00",
            tax: "15.00",
            shipping: "10.00"
        },
        transactions: [
            {
                id: "TXN-123", amount: "50.00", description: "Magic Potion"
            },
            {
                id: "TXN-456", amount: "50.00", description: "EnchantedSword"
            }
        ]
    }
};



const {
    id, name: { first, last }, email } = user

console.log(first)
document.getElementById("personal-info").innerHTML = `
<h2> personal info</h2>
<p> ID: ${id}<p/>
<p> Name: ${first} ${last}<p/>
<p> email: ${email}<p/>

`




const {
    address: {
        shipping: {
            street,
            city,
            state,
            postalCode,
            country
        }
    }
} = user;

console.log({ street, city, state, postalCode, country });

document.getElementById("shipping-address").innerHTML = `
    <h2>SHIPPING</h2>
    <p>Street: ${street}</p>
    <p>City: ${city}</p>
    <p>State: ${state}</p>
    <p>Postal Code: ${postalCode}</p>
    <p>Country: ${country}</p>
`;




const {
    address: { billing }
} = user
document.getElementById("billing-address").innerHTML = `
    <h2>BILLING</h2>
    <p>Street: ${billing.street}</p>
    <p>City: ${billing.city}</p>
    <p>State: ${billing.state}</p>
    <p>Postal Code: ${billing.postalCode}</p>
    <p>Country: ${billing.country}</p>
`;




//transactions

const {
    payment: { transactions= [] }
} = user;



document.getElementById("transactions").innerHTML = `
    <h2>TRANSACTIONS</h2>
    <p> transactions: ${transactions[0]}</p>
    
`;



console.log(transactions)

