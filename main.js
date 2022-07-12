let selectCurrency = document.getElementById("currency-select")
let currencyContainer = document.getElementById("currency-container")

function getData() {
    let baseCurrency = selectCurrency.value

    currencyContainer.innerHTML = ""

    let api = "https://api.exchangerate.host/latest?base=" + baseCurrency

    fetch(api)
    .then(response => response.json())
    .then(currency => {
        Object.entries(currency.rates).forEach(item => {
            const symbol = item[0]
            const price = item[1]

            currencyContainer.innerHTML += `
            <div class="col-12 col-md-5 col-lg-3 bg-dark rounded-3 p-2">
                ${symbol}/${baseCurrency}<br>1 ${baseCurrency} = ${price} ${symbol}
            </div>
            `
        })
    })
}

selectCurrency.addEventListener("change", function() {
    getData()
})

window.setInterval(function() {
    getData()
}, 30000)

getData()