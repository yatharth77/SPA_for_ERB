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

let deleteInterview = async(id, interview) => {
    const options = {
        method: 'DELETE',
        body: JSON.stringify(interview),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch("http://localhost:3000/api/v1/interviews/" + id , options)
        const json = await response.json();
        console.log(json)
        alert("Interview has been deleted")
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let InterviewShow = {

    render: async() => {
        console.log("Inside render")
        let request = Utils.parseRequestURL()
        let interview = await getInterview(request.id)

        return /*html*/ ` <section class = "section">
                    <p id="title"> Interview Title: ${interview["data"].id} </p> 
                    <p id="title"> Interview Title: ${interview["data"].topic} </p> 
                    <p id="meet_link"> Meeting Link: ${interview["data"].meet_link} </p> 
                    <p id="start_time"> Start Time: ${ interview["data"].schedule_at} </p> 
                    <p id="end_time"> End Time: ${ interview["data"].end_time} </p> 
                    <p id="role"> Role: ${ interview["data"].role} </p> 

                    <a href="#/interview/edit/${interview["data"].id}">
                    <button class="button is-primary" id="edit_btn">Edit
                    </button></a>
                    <button class="button is-primary" id="delete_btn">
                        <a href="#/interview">Delete</a>
                    </button>
                    </section>
                    `
    },
    after_render: async(id) => {
        console.log("Inside after_render")

        await document.getElementById("delete_btn").addEventListener("click", () => {
            let title = document.getElementById("title");
            let meet_link = document.getElementById("meet_link").value;
            let start_time = document.getElementById("start_time").value;
            let end_time = document.getElementById("end_time").value;
            let role = document.getElementById("role").value;

            let data = {
                interview: {
                    id: id,
                    title: title,
                    meet_link: meet_link,
                    start_time: start_time,
                    end_time: end_time,
                    role: role
                }
            }
            console.log(data)
            deleteInterview(id, data)
        })
    }
}


export default InterviewShow;