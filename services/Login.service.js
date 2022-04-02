export default async function LOGIN(userInfo, callback) {
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    }

    fetch("/api/login", config)
    .then(prom => prom.json())
    .then(response => {
        callback(response, true)
    }).catch(error => {
        console.log(error)
        callback(null, false)
    })
}
