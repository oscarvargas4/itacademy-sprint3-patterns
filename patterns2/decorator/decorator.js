class Value {
    constructor(value) {
        this.value = value;
    }

    gettotalValue() {
        return(this.value);
    }
}

class ValueDecorator {
    constructor(value, currency, rate) {
        this.value = value;
        this.currency = currency;
        this.rate = rate;
        this.valueConverted = value * rate;
    }

    get converted() {
        return `Currency change: ${this.currency} at rate of ${this.rate} equals to: ${this.gettotalValueConverted()}`;
        // return this.gettotalValueConverted();
    }

    gettotalValueToBeConverted() {
        return this.value.gettotalValue();
    }

    gettotalValueConverted() {
        
        return this.value.gettotalValue() * this.rate;
    }
}

// class ConvertedValueDecorator extends ValueDecorator {
//     constructor() {
//         super();
//     }

//     gettotalValueConverted(currency, rate) {
//         this.valueConverted = this.gettotalValueToBeConverted * rate;
//         return `Currency change: ${currency} at rate of ${rate} equals to: ${this.valueConverted}`;
//     }
// }

const value = new Value(2000);
console.log(value.gettotalValue());

const decoratedValue = new ValueDecorator(value, "USD to Eur", 2);
console.log(decoratedValue.gettotalValueToBeConverted());
console.log(decoratedValue.converted);

// const convertedDecoratedValue = new ConvertedValueDecorator(value);
// console.log(convertedDecoratedValue.gettotalValueConverted("USD to Eur", 0.819908));

// const valueDecorated = new ConvertedValueDecorator(value);
// console.log(value.gettotalValueToBeConverted())
// console.log(valueDecorated.gettotalValueConverted("USD_EUR", 0.819908));