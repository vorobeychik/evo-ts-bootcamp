
let arrEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let arrEnUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export function encode(str:string,shift:number):string{
    let resultString = str.split('').map((letter) => {
        const isUpper = letter === letter.toUpperCase();
        const arrOfLetters = isUpper ? arrEnUpper : arrEn;
        const letterIndex = arrOfLetters.indexOf(letter);

        if(shift <= 0){
            return decode(letter,Math.abs(shift))
        }

        return arrOfLetters[(letterIndex + shift) % 26]
    })

    return resultString.join('')
}


export function decode(str:string,shift:number):string{
    let resultString = str.split('').map((letter) => {
        const isUpper = letter === letter.toUpperCase();
        const arrOfLetters = isUpper ? arrEnUpper : arrEn;
        const letterIndex = arrOfLetters.indexOf(letter);
        let index = letterIndex - shift;

        if(shift <= 0){
            return encode(letter,Math.abs(shift))
        }

        while (index < 0){
            index += 26
        }

        return arrOfLetters[index]
    })


    return resultString.join('')
}
