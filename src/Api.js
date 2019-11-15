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

    fetchQuestion(id) {
        return fetch(
            `https://private-anon-d1ec5b723b-blissrecruitmentapi.apiary-mock.com/questions/${id}`
        )
            .then(res => {
                if (!res.ok) {
                    throw res.error();
                }
                return res.json();
            })
    }

    putQuestion(question) {
        return fetch(`https://private-anon-d1ec5b723b-blissrecruitmentapi.apiary-mock.com/questions/${question.id}`, {
            method: "PUT",
            body: JSON.stringify(question)
        }).then(res => {
            console.log(res)
            return res
        })
    }

    shareUrl(destination_email, content_url) {
        return fetch(`https://private-anon-d1ec5b723b-blissrecruitmentapi.apiary-mock.com/share?destination_email=${destination_email}&content_url=${content_url}`, {
            method: "POST"
        }).then(res => {
            console.log(res)
            return res
        })
    }

    checkHealth() {
        return Promise.race([
            fetch(
                "https://private-anon-8c60d0d41b-blissrecruitmentapi.apiary-mock.com/health"
            ),
            new Promise((_, reject) => setTimeout(() => reject("timeout"), 10000)) // fetch timeout
        ])
            .then(res => new Promise((resolve, _) => setTimeout(() => resolve(res), 1000))) // Wait at least 1000 so you can see the loading page
            .then(res => res.json())
            .then(body => body['status'] === "OK")
    }
}
export default new ApiService()