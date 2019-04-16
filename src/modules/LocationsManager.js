const remoteURL = "http://localhost:5002"

export default {
    get (id) {
        return fetch(`${remoteURL}/locations/${id}`).then(r=>r.json())
    },
    getAll() {
        return fetch(`${remoteURL}/locations`).then(r=>r.json())
    }
}