import React from "react";
import '../Css/declineButton.css'
const Reject=(props)=>{

    const {addNumber, jobId}=props;
    const worker_id='7f90df6e-b832-44e2-b624-3143d428001f';
    //function to accept job
    async function fetchReject(){
        const url_profile='https://test.swipejobs.com/api/worker/'+worker_id+'/job/'+jobId+'/reject'
        let response= await fetch(url_profile);
        return await response.json();
    }

    const rejectJobs=()=>{
        fetchReject().then((data)=>{
            if (data.error){
                alert('Reject Fails');
            }
            alert("Reject Successful")
            addNumber();
        })
    }

    return<>
        <button className='deny' onClick={rejectJobs}>No Thanks</button>
    </>
}

export default Reject;