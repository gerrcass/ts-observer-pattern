class BitcoinPrice {
    constructor() {
        this.observers = [];
        const el = document.querySelector("#fake-realtime-value");
        el.addEventListener("input", () => {
            this.notify(el.value);
        });
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        const index = this.observers.findIndex((obs) => obs === observer);
        this.observers.splice(index, 1);
    }
    notify(data) {
        this.observers.forEach((obs) => obs.update(data));
    }
}
class PriceDisplay {
    constructor() {
        const el = document.querySelector("#price");
        this.el = el;
    }
    update(data) {
        const value = Number(data);
        this.el.innerText = `$${value.toFixed(2)}`;
    }
}
const value = new BitcoinPrice();
const display = new PriceDisplay();
value.subscribe(display);
setTimeout(() => value.unsubscribe(display), 5000);
