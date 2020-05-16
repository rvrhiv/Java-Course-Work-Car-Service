
export async function addData(whitchTable, data) {

    const response = await fetch('/api/' + whitchTable, {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(response.status);
    console.log(await response.json());
}
