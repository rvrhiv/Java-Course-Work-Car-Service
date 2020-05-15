
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