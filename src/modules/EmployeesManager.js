const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/employees/${id}`).then(r=>r.json())
    },
    getAll() {
        return fetch (`${remoteURL}/employees`).then(r=>r.json())

    }
}