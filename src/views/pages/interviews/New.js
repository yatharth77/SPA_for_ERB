import Utils from '../../../services/Utils.js'

let createInterview = async(interview) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(interview),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/api/v1/interviews`, options)
        const json = await response.json();
        console.log("response", json)
        let notice = document.getElementById("notice");
        if (json.participant)
            notice.innerHTML = json.participant[0].message;
        else if (json.status)
            notice.innerHTML = json.status + json.error;
        else {
            notice.innerHTML = "Interview Created";
        }
        return json

    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let New = {
    render: async() => {
        return /*html*/ `
                <section class="section">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">User Name:</label>
                            <input class="input" id="user_name" type="text">
                        </p>
                    </div>
                    <div class="field">
                        <p  class="control has-icons-left has-icons-right">
                            <label for="user_id">User Id:</label>
                            <input class="input" id="user_id" type="number">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Title:</label>
                            <input class="input" id="title" type="text">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Role:</label>
                            <input class="input" id="role" type="text">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Start Time:</label>
                            <input class="input" id="start_time" type="datetime-local">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">End Time:</label>
                            <input class="input" id="end_time" type="datetime-local">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Meeting Link:</label>
                            <input class="input" id="meet_link" type="text">
                        </p>
                    </div>

                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" id="create_btn">
                            Create
                            </button>
                        </p>
                    </div>

            </section>
        `
    },

    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted

    after_render: async(id) => {
        await document.getElementById("create_btn").addEventListener("click", () => {
            let user_name = document.getElementById("user_name").value;
            let user_id = document.getElementById("user_id").value;
            let title = document.getElementById("title").value;
            let role = document.getElementById("role").value;
            let schedule_at = document.getElementById("start_time").value;
            let end_time = document.getElementById("end_time").value;
            let meet_link = document.getElementById("meet_link").value;
            if (end_time < schedule_at) {
                let notice = document.getElementById("notice");
                notice.innerHTML = "End time is before start time";
            }
            let data = {
                interview: {
                    user_id: user_id,
                    topic: title,
                    role: role,
                    schedule_at: schedule_at + ':00.000Z',
                    end_time: end_time + ':00.000Z',
                    meet_link: meet_link,
                    user_name: user_name
                }
            }
            console.log(data)
            createInterview(data)
        })
    }
}

export default New;
