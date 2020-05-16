
export async function updateData(whichTable, data) {

    console.log(data);

    const response = await fetch('/api/' + whichTable + '/' + data.id, {
        method: "PUT",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log(response.status);
    console.log(await response.json());
}
