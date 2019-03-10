import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Week from './date/week';
import Month from './date/month';
import Year from './date/year';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	app_nav: {
		backgroundColor: '#272727' ,
		borderBottom: '1px solid #444',
		flexDirection: "row",	
	}
})

function TabContainer(props) {
  return (
    <Card component="div" style={{overflow: 'auto', margin: '0', width: '100%'  }}>
      {props.children}
    </Card>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

function empty(data){
  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  { 
    return false; 
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true; 
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  if(typeof data === "string" &&  ( data === "" || data === null )){
	  return true;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}



class N2 extends Component{
	constructor(){
		super();
		this.state = {
			value: 0,
		}
	}
	


	handleChange = (event, value) => {
    this.setState({ value });
	};

	render(){
		const { classes } = this.props;
		const { value } = this.state;

		return(
			<div className={classes.root}>
				<AppBar className={classes.app_nav}  position="static">
					<Tabs value={value} onChange={this.handleChange}>
							<Tab label="Week" />
							<Tab label="Month" />
							<Tab label="Year" />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer><Week /></TabContainer>}
				{value === 1 && <TabContainer><Month  /></TabContainer>}
				{value === 2 && <TabContainer><Year  /></TabContainer>}

			</div>
		)
		
	}	
}


N2.propTypes = {
	classes: PropTypes.object.isRequired,
};




export default  withStyles(styles)(N2);