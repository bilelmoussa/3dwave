import axios from 'axios';
import { 
	GET_ERRORS, 
	SET_CURRENT_USER,
	N2_YEARS,
	N2_PLUS_150_YEARS,
	N2_PLUS_50_YEARS,
	N2_MONTHS,
	N2_PLUS_150_MONTHS,
	N2_PLUS_50_MONTHS,
	N2_WEEKS,
	N2_PLUS_150_WEEKS,
	N2_PLUS_50_WEEKS,
	N2_WEEK_CHART_DATA,
	N2_PLUS_150_WEEK_CHART_DATA,
	N2_PLUS_50_WEEK_CHART_DATA,
	N2_MONTH_CHART_DATA,
	N2_PLUS_150_MONTH_CHART_DATA,
	N2_PLUS_50_MONTH_CHART_DATA,
	N2_YEAR_CHART_DATA,
	N2_PLUS_150_YEAR_CHART_DATA,
	N2_PLUS_50_YEAR_CHART_DATA,
	N2_WEEK_TABLE_DATA,
	N2_PLUS_150_WEEK_TABLE_DATA,
	N2_PLUS_50_WEEK_TABLE_DATA,
	RATIOS,
	N2_SELECT_DATE,
	N2_PLUS_150_SELECT_DATE,
	N2_PLUS_50_SELECT_DATE,
	QUOTES_NUMBER,
	CLIENTS,
	TURNOVER,
	NOTIFICATION_ERROR,
	NOTIFICATION_SUCCESS,
	NOTIFICATION_WARNING,
	NOTIFICATION_INFO,
	USERS_LIST,
	LOADING
} from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';


export const AddOrRemoveLoading = (loading, dispatch)  => {
	dispatch({
		type: LOADING,
		payload: loading
	})
}

export const loginUser = (user, history) => dispatch => {
	AddOrRemoveLoading(true, dispatch)
    axios.post('/api/user/login', user)
            .then(res => {
				const  { token } = res.data;
                localStorage.setItem('jwtToken', token);
				setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
				history.push('/dashboard');
				AddOrRemoveLoading(false, dispatch)
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
				});
				AddOrRemoveLoading(false, dispatch)
            });
			
}

export const registerUser = (user, history) => dispatch => {
	AddOrRemoveLoading(true, dispatch)
    axios.post('/api/user/register', user)
            .then(res =>{ 
				history.push('/login');
				AddOrRemoveLoading(false, dispatch)
			})
            .catch(err => {
				console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
				});
				AddOrRemoveLoading(false, dispatch)
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
	if(history){
		history.push('/login')
	}
}

export const delete_Error = () => dispatch =>{
	let new_err = { }
	dispatch({
		type: GET_ERRORS,
		payload: new_err
	})
}


export const ErrorsMessage = (err, dispatch) =>{
	console.log(err)
	let message = "There is a Server Error  Please Relaod The Page !"
	dispatch({
		type: NOTIFICATION_ERROR,
		payload: {message: message}
	})
	setTimeout(() => {
		CloseNotification("error")
	}, 6000);
}


export const post_N2 = (Part) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.post('/api/N2/saveparts', Part)
			.then(res=>{
				AddOrRemoveLoading(false, dispatch)
			})
			.catch(err => {
				ErrorsMessage(err, dispatch);
				AddOrRemoveLoading(false, dispatch)
			})
}

export const post_N2_plus_150 = (Part) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.post('/api/N2_plus_150/saveparts', Part)
			.then(res=>{
				AddOrRemoveLoading(false, dispatch)
			})
			.catch(err => {
				ErrorsMessage(err, dispatch);
				AddOrRemoveLoading(false, dispatch)
			})
}

export const post_N2_plus_50 = (Part) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.post('/api/N2_plus_50/saveparts', Part)
			.then(res=>{
				AddOrRemoveLoading(false, dispatch);
			})
			.catch(err => {
				ErrorsMessage(err, dispatch);
				AddOrRemoveLoading(false, dispatch);
			})
}


function to_date(data){
	let date = new Date(data);
	let new_form_d = date.toISOString().substring(0, 16);
	return new_form_d;
}



function time_hours(value){
	let num = value * 60;
	let hours = Math.floor(num / 60);  
	let index_p = String(value).indexOf('.');
	let before_col = String(value).slice(index_p);
	let minutes_H = Math.round(Number(`0${before_col}`) * 60);
	
	if(minutes_H.toString().length < 2){
		 minutes_H =  `0${minutes_H}`;
	}
	
	if(hours.toString().length < 2){
		hours = `0${hours}`;
	}
	
	if(index_p === -1){
		return hours + ":00";
	}else{
		return hours + ":" + minutes_H;
	}
	
}



export const put_N2 = (query) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.put('/api/N2/updateparts', query)
			.then(res=>{
				AddOrRemoveLoading(false, dispatch)
			})
			.catch(err => {
				ErrorsMessage(err, dispatch);
				AddOrRemoveLoading(false, dispatch)
			})
}

export const put_N2_plus_150 = (query) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.put('/api/N2_plus_150/updateparts', query)
			.then(res=>{
				AddOrRemoveLoading(false, dispatch)
			})
			.catch(err => {
				ErrorsMessage(err, dispatch);
				AddOrRemoveLoading(false, dispatch)
			})
}

export const put_N2_plus_50 = (query) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.put('/api/N2_plus_50/updateparts', query)
			.then(res=>{
				AddOrRemoveLoading(false, dispatch)
			})
			.catch(err => {
				ErrorsMessage(err, dispatch);
				AddOrRemoveLoading(false, dispatch)
			})
}

export const delete_N2 = (id) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.delete('/api/N2/deleteparts', { data: { id } } )
		.then(res=>{
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err => {
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const delete_N2_plus_150 = (id) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.delete('/api/N2_plus_150/deleteparts', { data: { id } })
		.then(res=>{
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err => {
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const delete_N2_plus_50 = (id) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.delete('/api/N2_plus_50/deleteparts', { data: { id } })
		.then(res=>{
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err => {
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}



//GET DATA FOR SELECT
export const get_n2_years = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	 axios.get('/api/N2/years')
		.then(res => {
			console.log(res)
			dispatch({
				type: N2_YEARS,
				payload: res.data.years
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err =>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const get_n2_plus_150_years = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/N2_plus_150/years')
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_150_YEARS,
			   payload: res.data.years
		   })
		   AddOrRemoveLoading(false, dispatch)
	   })
	   .catch(err =>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
	   })
}

export const get_n2_plus_50_years = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/N2_plus_50/years')
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_50_YEARS,
			   payload: res.data.years
		   })
		   AddOrRemoveLoading(false, dispatch)
	   })
	   .catch(err =>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
	   })
}

export const get_n2_months = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2/months/${year}`)
	   .then(res => {
		   dispatch({
			   type: N2_MONTHS,
			   payload: res.data.months
		   })
		   AddOrRemoveLoading(false, dispatch)
	   })
	   .catch(err =>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
	   })
}

export const get_n2_plus_150_months = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_150/months/${year}`)
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_150_MONTHS,
			   payload: res.data.months
		   })
		   AddOrRemoveLoading(false, dispatch)
	   })
	   .catch(err =>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
	   })
}

export const get_n2_plus_50_months = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_50/months/${year}`)
	   .then(res => {
		   dispatch({
			   type: N2_PLUS_50_MONTHS,
			   payload: res.data.months
		   })
		   AddOrRemoveLoading(false, dispatch)
	   })
	   .catch(err =>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
	   })
}

export const get_n2_weeks = (year, month) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2/weeks/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_WEEKS,
				payload: res.data.weeks
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const get_n2_plus_150_weeks = (year, month) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_150/weeks/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_WEEKS,
				payload: res.data.weeks
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const get_n2_plus_50_weeks = (year, month) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_50/weeks/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_WEEKS,
				payload: res.data.weeks
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}




//CHART DATA
export const N2WeekChartData = (year, month, week) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2/week_chart/${year}/${month}/${week}`)
		.then(res=>{
			dispatch({
				type: N2_WEEK_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const N2PLUS150WeekChartData = (year, month, week) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_150/week_chart/${year}/${month}/${week}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_WEEK_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch);
		})
}

export const N2PLUS50WeekChartData = (year, month, week) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_50/week_chart/${year}/${month}/${week}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_WEEK_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch);
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch);
		})
}

//MONTH CHART
export const N2MonthChartData = (year, month) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2/month_chart/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_MONTH_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch);
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch);
		})
}

export const N2Plus150MonthChartData = (year, month) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_150/month_chart/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_MONTH_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const N2Plus50MonthChartData = (year, month) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get(`/api/N2_plus_50/month_chart/${year}/${month}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_MONTH_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}


//YEAR CHART
export const N2YearChartData = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2/year_chart/${year}`)
		.then(res=>{
			dispatch({
				type: N2_YEAR_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const N2Plus150YearChartData = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2_plus_150/year_chart/${year}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_150_YEAR_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch);
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch);
		})
}

export const N2Plus50YearChartData = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2_plus_50/year_chart/${year}`)
		.then(res=>{
			dispatch({
				type: N2_PLUS_50_YEAR_CHART_DATA,
				payload: res.data.data
			})
			AddOrRemoveLoading(false, dispatch);
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch);
		})
}

export const ClearChartData = (machine, target) => dispatch =>{
	if(machine === "N2"){
		if(target === "week"){
			dispatch({
				type: N2_WEEK_CHART_DATA,
				payload: []
			})
		}
		else if(target === "Month"){
			dispatch({
				type: N2_MONTH_CHART_DATA,
				payload: []
			})
		}else if(target === "Year"){
			dispatch({
				type: N2_YEAR_CHART_DATA,
				payload: []
			})
		}
	}else if(machine === "N2Plus150"){
		if(target === "week"){
			dispatch({
				type: N2_PLUS_150_WEEK_CHART_DATA,
				payload: []
			})
		}else if(target === "Month"){
			dispatch({
				type: N2_PLUS_150_MONTH_CHART_DATA,
				payload: []
			})
		}else if(target === "Year"){
			dispatch({
				type: N2_PLUS_150_YEAR_CHART_DATA,
				payload: []
			})
		}
		
	}else if(machine === "N2Plus50"){
		if(target === "week"){
			dispatch({
				type: N2_PLUS_50_WEEK_CHART_DATA,
				payload: []
			})
		}else if(target === "Month"){
			dispatch({
				type: N2_PLUS_50_MONTH_CHART_DATA,
				payload: []
			})
		}else if(target === "Year"){
			dispatch({
				type: N2_PLUS_50_YEAR_CHART_DATA,
				payload: []
			})
		}

	}
}


//TABLE DATA
export const N2WeekTableData = (year, month, week) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2/week_table/${year}/${month}/${week}`)
		.then(res=>{
			let new_rows = [];
			res.data.data.forEach((part, index)=>{
				part.FilamantComsumption = Number(part.FilamantComsumption).toFixed(2);
				part.FailRate = Number(part.FailRate).toFixed(4);
				part.TemplateEfficiency = Number(part.TemplateEfficiency).toFixed(4);
				part.rows.forEach((row, i)=>{
					row.id = i;
					row.timeAndDate = to_date(row.timeAndDate);
					row.finishingTime = to_date(row.finishingTime);
					row.workingHours = time_hours(row.workingHours);
					row.actualWh = time_hours(row.actualWh);
					row.template = time_hours(row.template);						
				})
				new_rows.push(part);
			});
			dispatch({
				type: N2_WEEK_TABLE_DATA,
				payload: new_rows
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
} 

export const N2Plus150WeekTableData = (year, month, week) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2_plus_150/week_table/${year}/${month}/${week}`)
		.then(res=>{
			let new_rows = [];
			res.data.data.forEach((part, index)=>{
				part.FilamantComsumption = Number(part.FilamantComsumption).toFixed(2);
				part.FailRate = Number(part.FailRate).toFixed(4);
				part.TemplateEfficiency = Number(part.TemplateEfficiency).toFixed(4);
				part.rows.forEach((row, i)=>{
					row.id = i;
					row.timeAndDate = to_date(row.timeAndDate);
					row.finishingTime = to_date(row.finishingTime);
					row.workingHours = time_hours(row.workingHours);
					row.actualWh = time_hours(row.actualWh);
					row.template = time_hours(row.template)						
				})
				new_rows.push(part);
			});
			dispatch({
				type: N2_PLUS_150_WEEK_TABLE_DATA,
				payload: new_rows
			})
			AddOrRemoveLoading(false, dispatch)
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
}

export const N2Plus50WeekTableData = (year, month, week) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/N2_plus_50/week_table/${year}/${month}/${week}`)
		.then(res=>{
			let new_rows = [];
			res.data.data.forEach((part, index)=>{
				part.FilamantComsumption = Number(part.FilamantComsumption).toFixed(2);
				part.FailRate = Number(part.FailRate).toFixed(4);
				part.TemplateEfficiency = Number(part.TemplateEfficiency).toFixed(4);
				part.rows.forEach((row, i)=>{
					row.id = i;
					row.timeAndDate = to_date(row.timeAndDate);
					row.finishingTime = to_date(row.finishingTime);
					row.workingHours = time_hours(row.workingHours);
					row.actualWh = time_hours(row.actualWh);
					row.template = time_hours(row.template)						
				})
				new_rows.push(part);
			});
			dispatch({
				type: N2_PLUS_50_WEEK_TABLE_DATA,
				payload: new_rows
			})
			AddOrRemoveLoading(false, dispatch);
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch);
		})
}  

//CLEAR TABLE DATA
export const ClearTableData = (machine) => dispatch =>{
	if(machine === "N2"){
		dispatch({
			type: N2_WEEK_TABLE_DATA,
			payload: []
		})
	}else if(machine === "N2Plus150"){
		dispatch({
			type: N2_PLUS_150_WEEK_TABLE_DATA,
			payload: []
		})
	}else if(machine === "N2Plus50"){
		dispatch({
			type: N2_PLUS_50_WEEK_TABLE_DATA,
			payload: []
		})
	}
}

//CLEAR SELECT MONTHS
export const ClearSelectMonths = (machine) => dispatch =>{
	if(machine === "N2"){
		dispatch({
			type: N2_MONTHS,
			payload: []
		})
	}else if(machine === "N2Plus150"){
		dispatch({
			type: N2_PLUS_150_MONTHS,
			payload: []
		})
	}else if(machine === "N2Plus50"){
		dispatch({
			type: N2_PLUS_50_MONTHS,
			payload: []
		})
	}
}


//CLEAR SELECT WEEKS
export const ClearSelectWeeks = (machine) => dispatch =>{
	if(machine === "N2"){
		dispatch({
			type: N2_WEEKS,
			payload: []
		})
	}else if(machine === "N2Plus150"){
		dispatch({
			type: N2_PLUS_150_WEEKS,
			payload: []
		})
	}else if(machine === "N2Plus50"){
		dispatch({
			type: N2_PLUS_50_WEEKS,
			payload: []
		})
	}
}

//GET 4 Ratio
export const getAllMachineRatio = (year) => dispatch =>{
	AddOrRemoveLoading(true, dispatch);
	axios.get(`/api/All_Machines/stat/${year}`)
	.then(res=>{
		dispatch({
			type: RATIOS,
			payload: res.data
		})
		AddOrRemoveLoading(false, dispatch)
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}


let Timer_N2 = 0;
let Timer_N2_Plus_150 = 0;
let Timer_N2_Plus_50 = 0;


export const AddClientTimer = (machine, values) => dispatch =>{
	if(machine === "N2"){
		let  seconds = values * 3600;

			clearInterval(Timer_N2);
			dispatch({
				type: N2_SELECT_DATE,
				payload: 0
			});

			Timer_N2 = setInterval(function(){
				let nextSeconds = seconds--
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2)
					nextSeconds = 0;
				}

				dispatch({
					type: N2_SELECT_DATE,
					payload: nextSeconds
				});
		
			}, 1000);
		
	}
	else if(machine === "N2Plus150"){
		let  seconds = values * 3600;

			clearInterval(Timer_N2_Plus_150);
			dispatch({
				type: N2_PLUS_150_SELECT_DATE,
				payload: 0
			});

			Timer_N2_Plus_150 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_150)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_150_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);
		
		
		
	}
	else if(machine === "N2Plus50"){
		let  seconds = values * 3600;

			clearInterval(Timer_N2_Plus_50);
			dispatch({
				type: N2_PLUS_50_SELECT_DATE,
				payload: 0
			});

			Timer_N2_Plus_50 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_50)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_50_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);
	
	}
}

export const AddServerTimer = (machine, values) => dispatch => {

	if(machine === "N2"){
		let seconds = values * 3600;
		AddOrRemoveLoading(true, dispatch);
		axios.post('/api/timer/start_n2_timer', {values: seconds})
			.then(res=>{
				let message = "N2 Timer Has Started !";
				dispatch({
					type: NOTIFICATION_SUCCESS,
					payload: {message: message}
				})
				AddOrRemoveLoading(false, dispatch);
				setTimeout(() => {
					CloseNotification("success")
				}, 6000);
			})
			.catch(err=>{
				console.log(err);
				clearInterval(Timer_N2);
				dispatch({
					type: N2_SELECT_DATE,
					payload: 0
				})
				AddOrRemoveLoading(false, dispatch);
				ErrorsMessage(err, dispatch);
		})

	}else if(machine === "N2Plus150"){
		let seconds = values * 3600;
		AddOrRemoveLoading(true, dispatch)
		axios.post('/api/timer/start_n2plus150_timer', {values: seconds})
			.then(res=>{
				let message = "N2 Plus 150 Timer Has Started !";
				dispatch({
					type: NOTIFICATION_SUCCESS,
					payload: {message: message}
				})
				AddOrRemoveLoading(false, dispatch)
				setTimeout(() => {
					CloseNotification("success")
				}, 6000);
			})
			.catch(err=>{
				console.log(err);
				clearInterval(Timer_N2_Plus_150);
				dispatch({
					type: N2_PLUS_150_SELECT_DATE,
					payload: 0
				})
				AddOrRemoveLoading(false, dispatch)
				ErrorsMessage(err, dispatch);
		})

	}else if(machine === "N2Plus50"){
		let seconds = values * 3600;
		AddOrRemoveLoading(true, dispatch)
		axios.post('/api/timer/start_n2plus50_timer', {values: seconds})
			.then(res=>{
				let message = "N2 Plus 50 Timer Has Started !";
				dispatch({
					type: NOTIFICATION_SUCCESS,
					payload: {message: message}
				})
				AddOrRemoveLoading(false, dispatch)
				setTimeout(() => {
					CloseNotification("success")
				}, 6000);
			})
			.catch(err=>{
				console.log(err);
				clearInterval(Timer_N2_Plus_50);
				dispatch({
					type: N2_PLUS_50_SELECT_DATE,
					payload: 0
				})
				AddOrRemoveLoading(false, dispatch)
				ErrorsMessage(err, dispatch);
		})
	}

	
}



export const  StopTimer_N2 = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/timer/stop_n2_timer')
	.then(res=>{
		let message = "N2  Timer Has Stopped !";
		let message_2 = "N2 Timer Has Already Stopped !";

		clearInterval(Timer_N2);
		dispatch({
			type: N2_SELECT_DATE,
			payload: 0
		});
		AddOrRemoveLoading(false, dispatch)
		if(res.data.success){
			dispatch({
				type: NOTIFICATION_WARNING,
				payload: {message: message}
			})
			setTimeout(() => {
				CloseNotification("warning")
			}, 6000);
		}else{
			dispatch({
				type: NOTIFICATION_INFO,
				payload: {message: message_2}
			})
			setTimeout(() => {
				CloseNotification("info")
			}, 6000);
		}

	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}


export const Get_N2_Timer  = () => dispatch =>{
	if(Timer_N2 === 0){
		AddOrRemoveLoading(true, dispatch)
		axios.get('/api/timer/get_n2_timer')
		.then(res=>{
			let  seconds =  res.data.value;
			clearInterval(Timer_N2);
			dispatch({
				type: N2_SELECT_DATE,
				payload: 0
			});

			AddOrRemoveLoading(false, dispatch);

			Timer_N2 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_SELECT_DATE,
					payload: nextSeconds
				})
			}, 1000);

		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
	}
}

export const  StopTimer_N2_Plus_150 = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/timer/stop_n2plus150_timer')
	.then(res=>{
		let message = "N2 Plus 150 Timer Has Stopped !";
		let message_2 = "N2 Plus 150 Timer Has Already Stopped !";

		clearInterval(Timer_N2_Plus_150);
		dispatch({
			type: N2_PLUS_150_SELECT_DATE,
			payload: 0
		});

		AddOrRemoveLoading(false, dispatch)

		if(res.data.success){
			dispatch({
				type: NOTIFICATION_WARNING,
				payload: {message: message}
			})
			setTimeout(() => {
				CloseNotification("warning")
			}, 6000);
		}else{
			dispatch({
				type: NOTIFICATION_INFO,
				payload: {message: message_2}
			})
			setTimeout(() => {
				CloseNotification("info")
			}, 6000);
		}

	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}



export const Get_N2_Plus_150_Timer  = () => dispatch =>{
	if(Timer_N2_Plus_150 === 0){
		AddOrRemoveLoading(true, dispatch)

		axios.get('/api/timer/get_n2plus150_timer')
		.then(res=>{
			let seconds = res.data.value;

			Timer_N2_Plus_150 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_150)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_150_SELECT_DATE,
					payload: nextSeconds
				})
				AddOrRemoveLoading(false, dispatch)

			}, 1000);

	
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
	}
}


export const  StopTimer_N2_Plus_50 = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)

	axios.get('/api/timer/stop_n2plus50_timer')
	.then(res=>{
		let message = "N2 Plus 50 Timer Has Stopped !";
		let message_2 = "N2 Plus 50 Timer Has Already Stopped !";

		clearInterval(Timer_N2_Plus_50);
		dispatch({
			type: N2_PLUS_50_SELECT_DATE,
			payload: 0
		});
		AddOrRemoveLoading(false, dispatch)

		if(res.data.success){
			dispatch({
				type: NOTIFICATION_WARNING,
				payload: {message: message}
			})
			setTimeout(() => {
				CloseNotification("warning")
			}, 6000);
		}else{
			dispatch({
				type: NOTIFICATION_INFO,
				payload: {message: message_2}
			})
			setTimeout(() => {
				CloseNotification("info")
			}, 6000);
		}


	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}


export const Get_N2_Plus_50_Timer  = () => dispatch =>{
	if(Timer_N2_Plus_50 === 0){
		AddOrRemoveLoading(true, dispatch)
		axios.get('/api/timer/get_n2plus50_timer')
		.then(res=>{
			let seconds = res.data.value;

			Timer_N2_Plus_50 = setInterval(function(){
				let nextSeconds = seconds--;
				if(nextSeconds === 0 ){
					clearInterval(Timer_N2_Plus_50)
					nextSeconds = 0;
				}
				dispatch({
					type: N2_PLUS_50_SELECT_DATE,
					payload: nextSeconds
				})
				AddOrRemoveLoading(false, dispatch)
			}, 1000);

	
		})
		.catch(err=>{
			ErrorsMessage(err, dispatch);
			AddOrRemoveLoading(false, dispatch)
		})
	}

}


//QuotesNumber
export const AddQuotesNumber = (value) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.post('/api/CR/AddQuotesNumber', {QuotesNumber: value})
	.then(res=>{
		let message = "New Quotes Number Value has added !"
		dispatch({
			type: QUOTES_NUMBER,
			payload: res.data.value
		})
		dispatch({
			type: NOTIFICATION_SUCCESS,
			payload: {message: message}
		})
		AddOrRemoveLoading(false, dispatch)
		setTimeout(() => {
			CloseNotification("success")
		}, 6000);
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}

export const GetQuotesNumber = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/CR/GetQuotesNumber')
	.then(res=>{
		dispatch({
			type: QUOTES_NUMBER,
			payload: res.data.value
		})
		AddOrRemoveLoading(false, dispatch)
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}

//Clients
export const AddClients = (value) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.post('/api/CR/AddClients', {Clients: value})
	.then(res=>{
		let message = "New Clients Value has added !"
		dispatch({
			type: CLIENTS,
			payload: res.data.value
		})
		dispatch({
			type: NOTIFICATION_SUCCESS,
			payload: {message: message}
		})
		AddOrRemoveLoading(false, dispatch)
		setTimeout(() => {
			CloseNotification("success")
		}, 6000);
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}

export const GetClients = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/CR/GetClients')
	.then(res=>{
		dispatch({
			type: CLIENTS,
			payload: res.data.value
		})
		AddOrRemoveLoading(false, dispatch)
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}

//Turnover
export const AddTurnover = (value) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.post('/api/CR/AddTurnover', {Turnover: value})
	.then(res=>{
		let message = "New Turnover Value has added !"
		dispatch({
			type: TURNOVER,
			payload: res.data.value
		})
		dispatch({
			type: NOTIFICATION_SUCCESS,
			payload: {message: message}
		})
		AddOrRemoveLoading(false, dispatch)
		setTimeout(() => {
			CloseNotification("success")
		}, 6000);
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch);
	})
}

export const GetTurnover = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/CR/GetTurnover')
	.then(res=>{
		dispatch({
			type: TURNOVER,
			payload: res.data.value
		})
		AddOrRemoveLoading(false, dispatch)
	})
	.catch(err=>{
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}

export const CloseNotification = (type) => dispatch =>{

	if(type === "error"){
		dispatch({
			type: NOTIFICATION_ERROR,
			payload: {}
		})
	}else if(type === "success"){
		dispatch({
			type: NOTIFICATION_SUCCESS,
			payload: {}
		})
	}else if(type === "warning"){
		dispatch({
			type: NOTIFICATION_WARNING,
			payload: {}
		})
	}else if(type === "info"){
		dispatch({
			type: NOTIFICATION_INFO,
			payload: {}
		})
	}

}

export const GetUsersList = () => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.get('/api/user/fetch_users')
	.then(res=>{
		
		res.data.users.forEach((user, i)=>{
			user.id = i + 1;
		})

		dispatch({
			type: USERS_LIST,
			payload: res.data.users
		})
		AddOrRemoveLoading(false, dispatch)
	})
	.catch(err=>{
		console.log(err);
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})
}

export const ChangeAdminRole = (Users, User) => dispatch =>{
	AddOrRemoveLoading(true, dispatch)
	axios.put('/api/user/update_user_role', {role: User.role, user_name: User.user_name})
	.then(res=>{
		dispatch({
			type: USERS_LIST,
			payload: Users
		})
		AddOrRemoveLoading(false, dispatch)
	})
	.catch(err=>{
		console.log(err);
		ErrorsMessage(err, dispatch);
		AddOrRemoveLoading(false, dispatch)
	})

}