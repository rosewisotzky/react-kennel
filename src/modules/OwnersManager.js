const remoteURL = "http://localhost:5002"

export default {
    get (id) {
        return fetch(`${remoteURL}/owners/${id}`).then(r=>r.json())
    },
    getAll() {
        return fetch(`${remoteURL}/owners`).then(r=>r.json())
    }
}