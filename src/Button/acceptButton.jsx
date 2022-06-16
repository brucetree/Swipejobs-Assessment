import React from "react";
import '../Css/acceptButton.css'
const Accept=(props)=>{

    const {addNumber, jobId}=props;
    const worker_id='7f90df6e-b832-44e2-b624-3143d428001f';
    //function to accept job
    async function fetchAccept(){
        const url_profile='https://test.swipejobs.com/api/worker/'+worker_id+'/job/'+jobId+'/accept'
        let response= await fetch(url_profile);
        return await response.json();
    }

    const acceptJobs=()=>{
        fetchAccept().then((data)=>{
            if (data.error){
                alert("Accept Fails");
            }
            alert("Accept Successful")
            addNumber();
        })
    }

    return<>
    <button className='accept' onClick={acceptJobs}>I'll Take it</button>
    </>
}

export default Accept;