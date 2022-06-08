function calcpi(decimals) {
    // Taylor Series Method
    let i = 1n;
    let y = 20 + decimals
    let x = 3n * (10n ** BigInt(y));
    let pi = x;
    while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
    }
    let value = String(pi / (10n ** 20n)).replace(/\D/g, '').replace(/(\d{1})(\d*)/, '$1.$2')
    return value
}

export default calcpi