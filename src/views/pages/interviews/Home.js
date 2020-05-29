// --------------------------------
//  Define Data Sources
// --------------------------------

let getInterviewsList = async() => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        // const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/interviews`, options)
        const response = await fetch(`http://localhost:3000/api/v1/interviews`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Home = {
        render: async() => {
                let interviews = await getInterviewsList()
                let view = /*html*/ `
        <section class="section">
            <h1> List of All Interviews </h1>
            <br>
            <ul>
                ${ interviews["data"].map(interview => 
                    /*html*/`<a href="#/interview/p/${interview.id}">
                                <div>
                                    <ul>
                                        <li>${interview.topic}</li> 
                                        <li>${interview.meet_link}</li> 
                                        <li>${interview.schedule_at}</li> 
                                        <li>${interview.end_time}</li> 
                                    </ul> 
                                </div>
                            </a> <hr>`
                    ).join('\n ')
                }
            </ul>
            <button>
                        <a href="#/interview/new">New</a>
                    </button>
        </section>
    `
        return view
    },
    after_render: async() => {}

}

export default Home;

