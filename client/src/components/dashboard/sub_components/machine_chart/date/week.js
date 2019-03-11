import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Chart from '../CHART';
import { connect } from 'react-redux';
import { 
	get_n2_months,
	get_n2_years,
	get_n2_weeks,
	get_n2_plus_150_years,
	get_n2_plus_150_months,
	get_n2_plus_150_weeks,
	get_n2_plus_50_years,
	get_n2_plus_50_months,
	get_n2_plus_50_weeks,
	N2ChartData,
	N2PLUS150ChartData,
	N2PLUS50ChartData
} from '../../../../../actions/authentication';
import { empty } from '../../../../../is-empty';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444',
		flexDirection: "row",	
	},
  button: {
    margin: theme.spacing.unit,
	},
	formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },	
});


class Week extends Component {
constructor(){
    super();
    this.state = {
				years: [],
				months: [],
				weeks: [],
				chartData: [],
    		week: 0,
  			month: 0,
  			year: 0,
        openWeek: false,
        openMonth: false,
        openYear: false,
    }
}

componentDidMount(){
	const { machine } = this.props;
	if(machine === "N2"){
		this.props.get_n2_years();
	}else if(machine === "N2Plus150"){
		this.props.get_n2_plus_150_years();
	}else if(machine === "N2Plus50"){
		this.props.get_n2_plus_50_years();
	}
	
}

static getDerivedStateFromProps(nextProps, prevState){
	const  { machine } = nextProps;
	if(machine === "N2"){
		if(nextProps.N2!==prevState.N2){
			if(empty(nextProps.N2.Years)){
				return { years: [] };
			}			
			else if(empty(nextProps.N2.Months) && !empty(nextProps.N2.Years)){
				return { months: [], years: nextProps.N2.Years };
			}	
			else if(!empty(nextProps.N2.Months) && !empty(nextProps.N2.Years)){
				return { months: nextProps.N2.Months, years: nextProps.N2.Years };
			}
			else if(!empty(nextProps.N2.Months) && !empty(nextProps.N2.Years) && empty(nextProps.N2.Weeks)){
				return { months: nextProps.N2.Months, years: nextProps.N2.Years, weeks:  nextProps.N2.Weeks};
			}		
			else if(!empty(nextProps.N2.Months) && !empty(nextProps.N2.Years) && !empty(nextProps.N2.Weeks) && empty(nextProps.N2.ChartData)){
				return { months: nextProps.N2.Months, years: nextProps.N2.Years, weeks:  nextProps.N2.Weeks, chartData:  [] };
			}	
			else{
				return { years: nextProps.N2.Years, months: nextProps.N2.Months, weeks: nextProps.N2.Weeks, chartData: nextProps.N2.ChartData };
			}
			
		}else { return null };
	}
	else if(machine === "N2Plus150"){
			if(nextProps.N2_Plus_150!==prevState.N2_Plus_150){
				if(empty(nextProps.N2_Plus_150.Years)){
					return { years: [] };
				}			
				else if(empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years)){
					return { months: [], years: nextProps.N2_Plus_150.Years };
				}	
				else if(!empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years)){
					return { months: nextProps.N2_Plus_150.Months, years: nextProps.N2_Plus_150.Years };
				}
				else if(!empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years) && empty(nextProps.N2_Plus_150.Weeks)){
					return { months: nextProps.N2_Plus_150.Months, years: nextProps.N2_Plus_150.Years, weeks:  nextProps.N2_Plus_150.Weeks};
				}		
				else if(!empty(nextProps.N2_Plus_150.Months) && !empty(nextProps.N2_Plus_150.Years) && !empty(nextProps.N2_Plus_150.Weeks) && empty(nextProps.N2_Plus_150.ChartData)){
					return { months: nextProps.N2_Plus_150.Months, years: nextProps.N2_Plus_150.Years, weeks:  nextProps.N2_Plus_150.Weeks, chartData:  [] };
				}	
				else{
					return { years: nextProps.N2_Plus_150.Years, months: nextProps.N2_Plus_150.Months, weeks: nextProps.N2_Plus_150.Weeks, chartData: nextProps.N2_Plus_150.ChartData };
				}
				
			}else { return null };	
	}	
	else if(machine === "N2Plus50"){
		if(nextProps.N2_Plus_50!==prevState.N2_Plus_50){
			if(empty(nextProps.N2_Plus_50.Years)){
				return { years: [] };
			}			
			else if(empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years)){
				return { months: [], years: nextProps.N2_Plus_50.Years };
			}	
			else if(!empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years)){
				return { months: nextProps.N2_Plus_50.Months, years: nextProps.N2_Plus_50.Years };
			}
			else if(!empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years) && empty(nextProps.N2_Plus_50.Weeks)){
				return { months: nextProps.N2_Plus_50.Months, years: nextProps.N2_Plus_50.Years, weeks:  nextProps.N2_Plus_50.Weeks};
			}		
			else if(!empty(nextProps.N2_Plus_50.Months) && !empty(nextProps.N2_Plus_50.Years) && !empty(nextProps.N2_Plus_50.Weeks) && empty(nextProps.N2_Plus_50.ChartData)){
				return { months: nextProps.N2_Plus_50.Months, years: nextProps.N2_Plus_50.Years, weeks:  nextProps.N2_Plus_50.Weeks, chartData:  [] };
			}	
			else{
				return { years: nextProps.N2_Plus_50.Years, months: nextProps.N2_Plus_50.Months, weeks: nextProps.N2_Plus_50.Weeks, chartData: nextProps.N2_Plus_50.ChartData };
			}
			
		}else { return null };	
	}else{
		return null;
	}


}		

componentDidUpdate(prevProps, prevState) {
	const { machine } = this.props;
	if(machine === "N2"){
		if(prevProps.N2!==this.props.N2){
			if(empty(this.props.N2.Years)){
				this.setState({
					years: [],
				})
			}else if(empty(this.props.N2.Months) && !empty(this.props.N2.Years)){
				this.setState({
					months: [],
					years: this.props.N2.Years,
				})
			}else if(empty(this.props.N2.Weeks) && !empty(this.props.N2.Months) && !empty(this.props.N2.Years)){
				this.setState({
					weeks: [],
					months: this.props.N2.Months,
					years: this.props.N2.Years,
				})
			}
			else if(empty(this.props.N2.ChartData) && !empty(this.props.N2.Weeks) && !empty(this.props.N2.Months) && !empty(this.props.N2.Years)){
				this.setState({
					weeks: this.props.N2.Weeks,
					years: this.props.N2.Years,
					months: this.props.N2.Months,
					chartData: []
				})
			}else{
				this.setState({
					weeks: this.props.N2.Weeks,
					years: this.props.N2.Years,
					months: this.props.N2.Months,
					chartData:  this.props.N2.ChartData,
				})
			}
		
		}else{ return null; }
	}
	else if(machine === "N2Plus150"){
			if(prevProps.N2_Plus_150!==this.props.N2_Plus_150){
				if(empty(this.props.N2_Plus_150.Years)){
					this.setState({
						years: [],
					})
				}else if(empty(this.props.N2_Plus_150.Months) && !empty(this.props.N2_Plus_150.Years)){
					this.setState({
						months: [],
						years: this.props.N2_Plus_150.Years,
					})
				}else if(empty(this.props.N2_Plus_150.Weeks) && !empty(this.props.N2_Plus_150.Months) && !empty(this.props.N2_Plus_150.Years)){
					this.setState({
						weeks: [],
						months: this.props.N2_Plus_150.Months,
						years: this.props.N2_Plus_150.Years,
					})
				}
				else if(empty(this.props.N2_Plus_150.ChartData) && !empty(this.props.N2_Plus_150.Weeks) && !empty(this.props.N2_Plus_150.Months) && !empty(this.props.N2_Plus_150.Years)){
					this.setState({
						weeks: this.props.N2_Plus_150.Weeks,
						years: this.props.N2_Plus_150.Years,
						months: this.props.N2_Plus_150.Months,
						chartData: []
					})
				}else{
					this.setState({
						weeks: this.props.N2_Plus_150.Weeks,
						years: this.props.N2_Plus_150.Years,
						months: this.props.N2_Plus_150.Months,
						chartData:  this.props.N2_Plus_150.ChartData,
					})
				}
			
			}else{ return null; }
	}
	else if(machine === "N2Plus50"){
		if(prevProps.N2_Plus_50!==this.props.N2_Plus_50){
			if(empty(this.props.N2_Plus_50.Years)){
				this.setState({
					years: [],
				})
			}else if(empty(this.props.N2_Plus_50.Months) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					months: [],
					years: this.props.N2_Plus_50.Years,
				})
			}else if(empty(this.props.N2_Plus_50.Weeks) && !empty(this.props.N2_Plus_50.Months) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					weeks: [],
					months: this.props.N2_Plus_50.Months,
					years: this.props.N2_Plus_50.Years,
				})
			}
			else if(empty(this.props.N2_Plus_50.ChartData) && !empty(this.props.N2_Plus_50.Weeks) && !empty(this.props.N2_Plus_50.Months) && !empty(this.props.N2_Plus_50.Years)){
				this.setState({
					weeks: this.props.N2_Plus_50.Weeks,
					years: this.props.N2_Plus_50.Years,
					months: this.props.N2_Plus_50.Months,
					chartData: []
				})
			}else{
				this.setState({
					weeks: this.props.N2_Plus_50.Weeks,
					years: this.props.N2_Plus_50.Years,
					months: this.props.N2_Plus_50.Months,
					chartData:  this.props.N2_Plus_50.ChartData,
				})
			}
		
		}else{ return null; }
	}

}

handleChange = event => {
	const { machine } = this.props;
	const { year, month } = this.state;

	this.setState({ [event.target.name]: event.target.value });
	if(machine == "N2"){
		if(event.target.name === "year"){
			this.props.get_n2_months(event.target.value);
		}else if(event.target.name === "month"){
			this.props.get_n2_weeks(year, event.target.value);
		}else if(event.target.name === "week"){
			this.props.N2ChartData(year, month, event.target.value)
		}
	}
	else if(machine === "N2Plus150"){
		if(event.target.name === "year"){
			this.props.get_n2_plus_150_months(event.target.value);
		}else if(event.target.name === "month"){
			this.props.get_n2_plus_150_weeks(year, event.target.value);
		}else if(event.target.name === "week"){
			this.props.N2PLUS150ChartData(year, month, event.target.value)
		}
	}
	else if(machine === "N2Plus50"){
		if(event.target.name === "year"){
			this.props.get_n2_plus_50_months(event.target.value);
		}else if(event.target.name === "month"){
			this.props.get_n2_plus_50_weeks(year, event.target.value);
		}else if(event.target.name === "week"){
			this.props.N2PLUS50ChartData(year, month, event.target.value)
		}
	}

};

handleCloseYear = () => {this.setState({ openYear: false })}
handleCloseMonth = () => {this.setState({ openMonth: false })}
handleCloseWeek = () => {this.setState({ openWeek: false })}

handleOpenYear = () => {this.setState({ openYear: true })}
handleOpenMonth = () => {this.setState({ openMonth: true })}
handleOpenWeek = () => {this.setState({ openWeek: true })}

render() {
  const { classes, machine } = this.props;
	const { openWeek, openMonth, openYear, week,  month, year, months, years, weeks, chartData } = this.state;

	let YearList = () =>{
		return years.map((year, i) => { return <MenuItem key={i} value={year}>Year {year}</MenuItem> });
	}

	let MonthList = () =>{
		return months.map((month, i) => { return <MenuItem key={i} value={month}>Month {month}</MenuItem> })
	}
	
	let WeekList = () =>{
		return weeks.map((week, i) => { return <MenuItem key={i} value={week}>Week {week}</MenuItem> })
	}

    return (
		
    <div className={classes.root}>
			<AppBar className={classes.app_nav}  position="static">
				<form autoComplete="off">
					<FormControl className={classes.formControl} >
						<InputLabel htmlFor="Week">Week</InputLabel>
						<Select
							open={openWeek}
							onClose={this.handleCloseWeek}
							onOpen={this.handleOpenWeek}
							value={week}
							onChange={this.handleChange}
							inputProps={{
								name: 'week',
								id: 'Week',
							}}
						>

								{WeekList()}

					  </Select>
					</FormControl>

					<FormControl className={classes.formControl} >
						<InputLabel htmlFor="Month">Month</InputLabel>
						<Select
							open={openMonth}
							onClose={this.handleCloseMonth}
							onOpen={this.handleOpenMonth}
							value={month}
							onChange={this.handleChange}
							inputProps={{
								name: 'month',
								id: 'Month',
							}}
						>

							{MonthList()}

						</Select>
					</FormControl>

					<FormControl className={classes.formControl} >
						<InputLabel htmlFor="Year">Year</InputLabel>
						<Select
							open={openYear}
							onClose={this.handleCloseYear}
							onOpen={this.handleOpenYear}
							value={year}
							onChange={this.handleChange}
							inputProps={{
								name: 'year',
								id: 'Year',
							}}
						>

              	{YearList()}

						</Select>
					</FormControl>

      	    </form>
		</AppBar>
				
        <Chart machine={machine} ChartData={chartData} Target="week" />

	</div>

    )
  }
}

Week.propTypes = {
	classes: PropTypes.object.isRequired,
	get_n2_years: PropTypes.func.isRequired,
	get_n2_months: PropTypes.func.isRequired,
	get_n2_weeks: PropTypes.func.isRequired,
	get_n2_plus_150_years: PropTypes.func.isRequired,
	get_n2_plus_150_months: PropTypes.func.isRequired,
	get_n2_plus_150_weeks: PropTypes.func.isRequired,
	get_n2_plus_50_years: PropTypes.func.isRequired,
	get_n2_plus_50_months: PropTypes.func.isRequired,
	get_n2_plus_50_weeks: PropTypes.func.isRequired,
	N2ChartData: PropTypes.func.isRequired,
	N2PLUS150ChartData: PropTypes.func.isRequired,
	N2PLUS50ChartData: PropTypes.func.isRequired, 
}

const mapStateToProps = (state) => ({
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50
});

export default connect(mapStateToProps, { get_n2_years, get_n2_months, get_n2_weeks, get_n2_plus_150_years, get_n2_plus_150_months, get_n2_plus_150_weeks, get_n2_plus_50_years , get_n2_plus_50_months, get_n2_plus_50_weeks, N2ChartData, N2PLUS150ChartData, N2PLUS50ChartData  })(withStyles(styles)(Week))