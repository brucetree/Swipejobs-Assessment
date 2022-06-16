import React, {useEffect} from "react";
import {Fragment,useState} from "react";
import Moment from 'react-moment';
import Accept from "./Button/acceptButton";
import Reject from "./Button/declineButton";
import './App.css';
import logo from './Image/logo.png';
import datesIcon from './Image/datesIcon.png'
import locationIcon from './Image/locationIcon.png'
import requirementIcon from './Image/requirementIcon.png'
import reportIcon from './Image/reportToIcon.png'

function App() {

  const worker_id='7f90df6e-b832-44e2-b624-3143d428001f';

  const [firstname, setFirstname]=useState('');
  const [lastname, setLastname]=useState('');
  const [jobId,setJobId]=useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [imageUrl, setImageUrl]=useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [reportName, setReportName]=useState('');

  const [shifts, setShifts]=useState([]);
  const [requirements, setRequirements]=useState([]);

  const [distance, setDistance]=useState(0);
  const [reportNumber,setReportNumber]=useState(0);
  const [index, setIndex]=useState(0);
  const [dataLength, setDataLength]=useState(0);
  const [salary, setSalary]=useState(0);


  //function to fecth user profile
  async function fetchUserProfile(){
    const url_profile='https://test.swipejobs.com/api/worker/'+worker_id+'/profile'
    let response= await fetch(url_profile);
    return await response.json();
  }

  //function to fecth user jobs
  async function fetchJobs(){
    const url_profile='https://test.swipejobs.com/api/worker/'+worker_id+'/matches'
    let response= await fetch(url_profile);
    return await response.json();
  }

  useEffect(()=>{
    fetchUserProfile().then((data) => {
      setFirstname(data.firstName);
      setLastname(data.lastName);
    })
        .catch(error => console.log('User Profile error is', error));

    fetchJobs().then((data) => {
      setDataLength(data.length);
      //ensure the index will not be out of range
      if (index>dataLength-1){
        setIndex(0);
      }
      //use useState to store data
      setJobTitle(data[index].jobTitle.name);
      setImageUrl(data[index].jobTitle.imageUrl);
      setCompanyName(data[index].company.name);
      setCompanyAddress(data[index].company.address.formattedAddress);
      setDistance(data[index].milesToTravel);
      setShifts(data[index].shifts);
      setRequirements(data[index].requirements);
      setSalary(data[index].wagePerHourInCents);
      setReportName(data[index].company.reportTo.name);
      setReportNumber(data[index].company.reportTo.phone);
      setJobId(data[index].jobId);
    })
        .catch(error => console.log('User jobs error is', error));
  },[index,dataLength])

  //function to get next job when click button
  const addNumber=()=>{
    setIndex(index+1);
  }
  //function to convert date type
  const toUpperCaseFilter = (d) => {
    return d.toUpperCase();
  };

  return(
      <div className='App'>
        <div className='header'>
          <img src={logo} alt='Failed' className='logo'/>
          <div className='userName'>
            {firstname} {lastname}
          </div>
        </div>
        <div className='outLayer'>

        <div className='mainImageArea'>
          <img src={imageUrl} alt='Failed' className='mainImage'/>

        </div>
        <div className='innerLayer'>
            {/*Job title area*/}
            <div className='jobNameArea'>
            <div className='jobTtile'> {jobTitle}</div>
            <div className='companyName'> {companyName}</div>
            </div>
          {/*Distance and hourly rate area*/}
          <div className='distanceArea'>
            <div className='distance'>
              <div className='distanceTitle'>Distance</div>
              <div className='distanceMiles'>{distance.toFixed(2)} miles</div>
            </div>
            <div className='hourlyRate'>
              <div className='hourlyRateTitle'>Hourly Rate</div>
              <div className='hourlyRateSalary'>${(salary/100).toFixed(2)}</div>
            </div>
          </div>

          {/*Shift dates area*/}
          <div className='shiftDateArea'>
            <div className='innerArea'>
            <img className='itemIcon' src={datesIcon} alt='Failed'/>
          <div className='shiftDate'>
            <div className='infoTitle'> Shift Dates</div>
            <div className='shiftDateItem'>
            {shifts.map((item,index)=>{
              return(
                  <Fragment key={index}>
                    <div className='item'>
                      <Moment filter={toUpperCaseFilter} format="MMM d,ddd hh:mm A ">{item.startDate}
                      </Moment>
                      - <Moment filter={toUpperCaseFilter} format="hh:mm A">{item.endDate}
                    </Moment>
                    </div>
                  </Fragment>
              )
          })}
            </div>
          </div>
            </div>
            <div className='line'> </div>
          </div>

          {/*Location area*/}
          <div className='locationArea'>
            <div className='innerArea'>
            <img className='itemIcon' src={locationIcon} alt='Failed'/>
            <div className='location'>
              <div className='infoTitle'>Location</div>
              <div className='locationItem'>
                <div className='item'>{companyAddress}</div>
                <div className='smallItem'>{distance} miles from your job search location</div>
              </div>
            </div>
            </div>
            <div className='line'> </div>
          </div>

          {/*Requirements area*/}
          <div className='requirementsArea'>
            <div className='innerArea'>
              <img className='itemIcon' src={requirementIcon} alt='Failed'/>
              <div className='requirements'>
                <div className='infoTitle'>Requirements</div>
                <div className='requirementsItem'>
              {requirements ? (requirements.map((item,index)=>{
              return(
                  <Fragment key={index}>
                    <div className='item'>-{item}</div>
                  </Fragment>
              )
          })) : 'None'}
                </div>
            </div>
            </div>
            <div className='line'> </div>
          </div>

          {/*Report To Area*/}
          <div className='reportToArea'>
            <div className='innerArea'>
            <img className='itemIcon' src={reportIcon} alt='Failed'/>
            <div className='reportTo'>
              <div className='infoTitle'>Report To</div>
              <div className='item'>
                {reportName} {reportNumber ? (reportNumber) : ''}
              </div>
            </div>
            </div>
            <div className='buttonGroup'>
              <Reject addNumber={addNumber} jobId={jobId}/>
              <Accept addNumber={addNumber} jobId={jobId}/>
            </div>
          </div>

        </div>
        </div>
      </div>
  )
}

export default App;
