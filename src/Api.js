class ApiService {
    fetchQuestions(limit, offset, filter) {
        return fetch(
            `https://private-anon-d1ec5b723b-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=${filter}`
        )
            .then(res => {
                if (!res.ok) {
                    throw res.error();
                }
                return res.json();
            })
    }

    checkHealth() {
        return Promise.race([
            fetch(
                "https://private-anon-8c60d0d41b-blissrecruitmentapi.apiary-mock.com/health"
            ),
            new Promise((_, reject) => setTimeout(() => reject("timeout"), 10000)) // fetch timeout
        ])
            // .then(res => new Promise((resolve, _) => setTimeout(() => resolve(res), 1000))) // Wait at least 1000 so you can see the loading page
            .then(res => res.json())
            .then(body => body['status'] === "OK")
    }
}
export default new ApiService()