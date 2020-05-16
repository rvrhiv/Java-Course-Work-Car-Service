
export async function addData(data) {

    const response = await fetch('/api/events/create', {
        method: "POST",
        dataType: "JSON",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // console.log(response.status);
    // console.log(await response.json());
    // if (response.ok) {
    //     eventModel.isNewEventModalOpen = false;
    // }
}
