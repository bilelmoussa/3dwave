import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {empty} from '../../../../is-empty';

const styles = theme =>({

})

class CircleChart extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            val: 0,
        }
    }

    componentDidMount(){
        if(!empty(this.props.data)){
            const { title, val } = this.props.data;
            this.setState({
                title: title,
                val: val
            })
        }
      }

      static getDerivedStateFromProps(nextProps, prevState){
          if(nextProps.data !== prevState.data){
              if(empty(nextProps.data)){
                 return null;
              }else{
                  return {
                      title: nextProps.data.title,
                      val: nextProps.data.val,
                  }
              }
          }else{
              return null;
          }
      }
      
      componentDidUpdate(prevProps, prevState){
          if(prevProps.data !== this.props.data){
              if(empty(this.props.data)){
                return null;
              }else{
                  this.setState({
                      title: this.props.data.title,
                      val: this.props.data.val
                  })
              }
          }else{
              return null;
          }
      }
      

 


   
	
    render(){
        const { title, val } = this.state;
        let r_color;


        const  class_name = () =>{
            if(val < 40){
                r_color = "red";
            }
            else if(val > 40 && val < 60){
                r_color = "yellow";
            }else{
                r_color = "green";
            }
        }

        const TextValue = () =>{
            if(title === "Filamant Comsumption"){
                return(
                    <text x="18" y="20.35" className={`percentage ${r_color}`}>{`${val}`}</text>
                )
            }else{
                return(
                    <text x="18" y="20.35" className={`percentage ${r_color}`}>{`%${val}`}</text>
                )
            }
        }
        
        class_name();

        return (
        <div className="Card_item">
            <Card className="card">
                <div className="single-chart">
                        <svg viewBox="0 0 36 36" className={`circular-chart ${r_color}`}>
                                <path className="circle-bg"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    strokeDasharray={`${val}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              { TextValue()}
                        </svg>
                        <Typography className="SingleChartTitle" variant="h6">{title}</Typography>
                </div>	
			</Card >
        </div>
        )
    }
}

export default withStyles(styles)(CircleChart);