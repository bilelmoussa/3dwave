import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { empty } from '../../../../is-empty';
import MachineTimer from './MachineTimer';
import { Get_N2_Timer, Get_N2_Plus_150_Timer, Get_N2_Plus_50_Timer, AddClientTimer  } from '../../../../actions/authentication';



class CountDown extends Component {
    constructor(){
        super();
        this.state = {
            N2_selectedDate: 0,
            N2Plus150_selectedDate: 0,
            N2Plus50_selectedDate: 0,
        };
    }

    componentDidMount(){
        this.props.Get_N2_Timer();
        this.props.Get_N2_Plus_150_Timer();
        this.props.Get_N2_Plus_50_Timer();


        if(empty(this.props.N2.N2_selectedDate)){
            this.setState({
                N2_selectedDate: 0,
                N2Plus150_selectedDate: 0,
                N2Plus50_selectedDate: 0,
            })
        }else{
            this.setState({
                N2_selectedDate: this.props.N2.N2_selectedDate,
                N2Plus150_selectedDate: this.props.N2_Plus_150.N2Plus150_selectedDate,
                N2Plus50_selectedDate: this.props.N2_Plus_50.N2Plus50_selectedDate,
            })
        }
        
    }

    

  
    static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.N2 !== prevState.N2){
			if(empty(nextProps.N2.N2_selectedDate)){
				return {N2_selectedDate: 0};
			}else{
				return { N2_selectedDate: nextProps.N2.N2_selectedDate };
			}
        }
        
        if(nextProps.N2_Plus_150 !== prevState.N2_Plus_150){
			if(empty(nextProps.N2_Plus_150.N2Plus150_selectedDate)){
				return { N2Plus150_selectedDate: 0 };
			}else{
				return { N2Plus150_selectedDate: nextProps.N2_Plus_150.N2Plus150_selectedDate };
			}
		}
        
        if(nextProps.N2_Plus_50 !== prevState.N2_Plus_50){
			if(empty(nextProps.N2_Plus_50.N2Plus50_selectedDate)){
				return { N2Plus50_selectedDate: 0 };
			}else{
				return { N2Plus50_selectedDate: nextProps.N2_Plus_50.N2Plus50_selectedDate };
			}
		}else{
			return null
        }
        
    }
    
    componentDidUpdate(prevProps, prevState){

		if(prevProps.N2 !== this.props.N2){
			if(empty(this.props.N2.N2_selectedDate)){
                this.setState({N2_selectedDate: 0 });
			}else{
                this.setState({N2_selectedDate: this.props.N2.N2_selectedDate});
			}
        }
        if(prevProps.N2_Plus_150 !== this.props.N2_Plus_150){
			if(empty(this.props.N2_Plus_150.N2Plus150_selectedDate)){
                this.setState({N2Plus150_selectedDate: 0 });
			}else{
                this.setState({N2Plus150_selectedDate: this.props.N2_Plus_150.N2Plus150_selectedDate});
			}
        }
        if(prevProps.N2_Plus_50 !== this.props.N2_Plus_50){
			if(empty(this.props.N2_Plus_50.N2Plus50_selectedDate)){
                this.setState({N2Plus50_selectedDate: 0 });
			}else{
                this.setState({N2Plus50_selectedDate: this.props.N2_Plus_50.N2Plus50_selectedDate});
			}
        }else{
            return null;
        }
        
	}



    render(){
        const { N2_selectedDate, N2Plus150_selectedDate, N2Plus50_selectedDate } = this.state;

        const selectDate = {
            N2_selectedDate: N2_selectedDate || 0,
            N2Plus150_selectedDate: N2Plus150_selectedDate || 0,
            N2Plus50_selectedDate: N2Plus50_selectedDate  || 0
        }

        return(

            <div id="Timer">
                    <MachineTimer data={selectDate.N2_selectedDate} MachineName={"N2"}/>
                    <MachineTimer data={selectDate.N2Plus150_selectedDate} MachineName={"N2 Plus 150"}/>
                    <MachineTimer data={selectDate.N2Plus50_selectedDate} MachineName={"N2 Plus 50"}/>
            </div>

        )
    }
}

CountDown.propTypes = {
    N2: PropTypes.object.isRequired,
    N2_Plus_150: PropTypes.object.isRequired,
    N2_Plus_50: PropTypes.object.isRequired,
    Get_N2_Timer: PropTypes.func.isRequired,
    Get_N2_Plus_150_Timer: PropTypes.func.isRequired,
    Get_N2_Plus_50_Timer: PropTypes.func.isRequired,
    AddClientTimer: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    N2: state.N2,
    N2_Plus_150: state.N2_Plus_150,
    N2_Plus_50: state.N2_Plus_50
});

export default connect(mapStateToProps, { Get_N2_Timer, Get_N2_Plus_150_Timer, Get_N2_Plus_50_Timer, AddClientTimer })(CountDown);