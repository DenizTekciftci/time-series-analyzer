export function MovingAverage(data, windowSize){
    console.log(data)
    if(data.length == 0)
        return null;

    let index = windowSize
    const queue = data.slice(0, windowSize)
    const movingAverageData = [Mean(queue)]
    for(index; index < data.length; index++){
        queue.push(data[index])
        queue.shift()
        movingAverageData.push(Mean(queue))
    }
    return movingAverageData
}

function Mean(data){
    if(data.length == 0)
        return null;
    return data.reduce((a, b) => a + b) / data.length;
}