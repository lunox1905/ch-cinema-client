const convertPrice = (price) => {
    if(!price) return  0
    var str = '';
    price = price.toString()
    for(let i = 0; i < price.length; i++) {
        str += price[i]
        if((price.length -1 -i) % 3 === 0 && i !== price.length-1) {
            str += '.';
        }
    }
    return str
}

export default convertPrice