
// export function loadTableData(tableName) {
//     let data = [];
//     //take the data from the promise
//     getDataInPromise(tableName).then(array => {
//         array.forEach(object => {
//             data.push(object);
//         })
//     });
//     return data;
// }

export async function loadTableData(tableName) {
    const response = await fetch('/api/' + tableName, {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json();
}