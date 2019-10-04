// Try edit message
const data = [{
  message: 'Hello world',
  crrect:2
},
{
  message: 'Hello world',
  crrect:2
}]
console.log(queryBuildToFlat(data))
function queryBuildToFlat(query) {
    let obj = {};
    queryBuild(query, '', obj);
    return obj;
}
function queryBuild(query, dept, qArr) {
    for (const key in query) {
        const getKey = dept ? 'round_'+(Number(dept)+1) + '_' + key : key;
        if (typeof query[key] === 'string' && query[key] !== undefined && query[key] !== '') {
            if (key === 'dob') {
                const dobD = new Date(query[key]);
                if (dobD.toString() !== 'Invalid Date') {
                    qArr[getKey] = dobD
                }
            } else {
                qArr[getKey] = query[key];
            }
        } else if (typeof query[key] === 'object' && Object.getPrototypeOf(query[key]).constructor.name !== 'Date' && Object.getPrototypeOf(query[key]).constructor.name !== 'Timestamp') {
            queryBuild(query[key], key, qArr);
        } else if (Object.getPrototypeOf(query[key]).constructor.name === 'Date') {
            if (query[key].toString() !== 'Invalid Date') {
                qArr[getKey] = query[key];
            }
        } else if (Object.getPrototypeOf(query[key]).constructor.name === 'Timestamp') {
            if (query[key].toDate().toString() !== 'Invalid Date') {
                qArr[getKey] = query[key].toDate();
            }
        } else {
            if (query[key] !== undefined && query[key] !== '') {
                qArr[getKey] = query[key];
            }
        }

    }
    return qArr;
}
