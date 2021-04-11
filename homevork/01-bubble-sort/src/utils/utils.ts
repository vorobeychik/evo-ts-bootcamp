export function generateRandomNumbers(range:number,maxValue:number):number[]{
    return [...new Array(range).fill(0)].map((el:number) => Math.floor(Math.random() * maxValue))
}

export function sortStep(arr:number[]):[number[],boolean]{

    let result:number[] = arr;

    for(let i = 0;i < result.length - 1;i++){
        if(arr[i] > arr[i + 1]){
            [arr[i],arr[i + 1]] = [arr[i + 1],arr[i]]
            return [result,false]
        }
    }

    return [result,true]
}

