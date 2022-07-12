let selectCurrency = document.getElementById("currency-select")
let currencyContainer = document.getElementById("currency-container")

let currencySymbols = []
let currencyPrice = []

function getData() {
    let baseCurrency = selectCurrency.value
    currencyContainer.innerHTML = ""

    let api = "https://api.exchangerate.host/latest?base=" + baseCurrency

    fetch(api)
    .then(response => response.json())
    .then(currency => {
        currencySymbols.push(Object.keys(currency.rates))
        currencyPrice.push(Object.values(currency.rates))
    
        for (let i = 0; i < currencySymbols[0].length; i++) {
            let symbol = currencySymbols[0][i]
            let price = currencyPrice[0][i]
    
            currencyContainer.innerHTML += `
                <div class="col-12 col-md-5 col-lg-3 bg-dark rounded-3 p-2">
                    ${symbol}/${baseCurrency}<br>1 ${baseCurrency} = ${price} ${symbol}
                </div>
            `
        }
    })
}

selectCurrency.addEventListener("change", function() {
    getData()
    location.reload()
})

window.setInterval(function() {
    getData()
    location.reload()
}, 30000)

getData()