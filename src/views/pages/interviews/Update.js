import Utils from '../../../services/Utils.js'

let getInterview = async(id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch("http://localhost:3000/api/v1/interviews/" + id , options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let updateInterview = async(id, interview) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(interview),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/api/v1/interviews/` + id , options)
        const json = await response.json();
        console.log("response", json)
        let notice = document.getElementById("notice");
        if (json.participant)
            notice.innerHTML = json.participant[0].message;
        else {
            notice.innerHTML = "Interview Updated";
        }
        return json

    } catch (err) {
        console.log('Error getting documents', err)
    }
}


let Update = {
    render: async() => {
        let request = Utils.parseRequestURL()
        let interview = await getInterview(request.id)
        console.log(JSON.stringify(interview))
        return /*html*/ `
                    <section class="section">
                    <div class="field">
                        <p id="notice">

                        </p>
                    </div
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">User Name:</label>
                            <input class="input" id="user_name" type="text" value = ${interview["data"].user_name}>
                        </p>
                    </div>
                    <div class="field">
                        <p  class="control has-icons-left has-icons-right">
                            <label for="user_id">User Id:</label>
                            <input class="input" id="user_id" type="number" value = ${interview["data"].user_id}>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Title:</label>
                            <input class="input" id="topic" type="text" value = ${interview["data"].topic}>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right" >
                            <label for="title">Role:</label>
                            <input class="input" id="role" type="text" value = ${interview["data"].role}>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Start Time:</label>

                            <input class="input" id="start_time" type="datetime-local" value = moment(${interview["data"].schedule_at}).format("yyyy-MM-ddThh:mm:ss")>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">End Time:</label>
                            <input class="input" id="end_time" type="datetime-local" value = moment(${interview["data"].end_time}).format("yyyy-MM-ddThh:mm:ss")>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Meeting Link:</label>
                            <input class="input" id="meet_link" type="text" value = ${interview["data"].meet_link}>
                        </p>
                    </div>

                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" id="edit_btn">
                            Edit
                            </button>
                        </p>
                    </div>

            </section>
                   
        `
    },

    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted

    after_render: async(id) => {
        await document.getElementById("edit_btn").addEventListener("click", () => {
            let user_name = document.getElementById("user_name").value;
            let user_id = document.getElementById("user_id").value;
            let topic = document.getElementById("topic").value;
            let role = document.getElementById("role").value;
            let start_time = document.getElementById("start_time").value;
            let end_time = document.getElementById("end_time").value;
            let meet_link = document.getElementById("meet_link").value;


            if (end_time < start_time) {
                let notice = document.getElementById("notice");
                notice.innerHTML = "End time is before start time";
            }
            let data = {
                interview: {
                    user_name: user_name,
                    user_id: user_id,
                    topic: topic,
                    role: role,
                    end_time: end_time,
                    start_time: start_time,
                    meet_link: meet_link
                }
            }
            console.log(data)
            updateInterview(id, data)
        })
    }
}

export default Update;