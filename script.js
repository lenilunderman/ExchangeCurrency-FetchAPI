const currencyOneEl = document.getElementById('currencyOne');
const currencyTwoEl = document.getElementById('currencyTwo');
const currencyInputOne = document.getElementById('amountOne')
const currencyInputTwo = document.getElementById('amountTwo');
let swap = document.getElementById('swap');
let rate = document.getElementById('rate');

//Exchange Rate API key
const API_KEY = 'b018473ac34aeb5ec6f9e338';

function calculate(){
    console.log('the application is running...')
    const currency_one = currencyOneEl.value;
    console.log(currency_one)
    const currency_two = currencyTwoEl.value;

    // fetch the data from the server
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currency_one}`)
    /*
    ### "base-code-only-on-pro" if a request to the free.exchangerate-api.com 
         endpoint is for a base code other than USD or EUR."
    */
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let rates = data.conversion_rates[currency_two];
            console.log(rates)
            rate.innerText = `1 ${currency_one} = ${rates} ${currency_two}`;
            currencyInputTwo.value = (currencyInputOne.value * rates).toFixed(2);
        }
    );
}

currencyOneEl.addEventListener('change', calculate);
currencyInputOne.addEventListener('input', calculate);

currencyTwoEl.addEventListener('change', calculate);
currencyInputTwo.addEventListener('input', calculate);
swap.addEventListener('click', function(){
    let temp = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = temp;

    calculate();
});

calculate();