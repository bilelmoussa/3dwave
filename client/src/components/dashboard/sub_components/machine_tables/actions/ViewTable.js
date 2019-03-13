import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { empty } from '../../../../../is-empty'
import { EditingState, IntegratedSorting,  PagingState, SortingState, CustomPaging, } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn, TableFixedColumns, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import { get_N2, put_N2, get_N2_plus_150, get_N2_plus_50, put_N2_plus_150, put_N2_plus_50, delete_N2 , delete_N2_plus_150, delete_N2_plus_50  } from '../../../../../actions/authentication';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { isChanged, isObEmpty } from '../../../../../is-empty';
import NumberFormat from 'react-number-format';

const styles = theme =>({
	lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
	div:{
		color: '#ffffff'
	},
	dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
})



const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);


const DeleteButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={ onExecute } title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={(
        <Input
          classes={{ root: classes.inputRoot }}
        />
)}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);

export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);



function validate_cell(data){
	
	if(empty(data.printedPart) || empty(data.workingHours) || empty(data.timeAndDate) ||  empty(data.finishingTime) ||  empty(data.dayNumber) ||  empty(data.failureCoef) ||  empty(data.actualWh) || empty(data.Date)){
		return true 
	}else{
		return false;
	}
	
}

function time_to_numb(value){
		let hours = Number(value.replace(/(\d{2}):(\d{2})/, '$1'));
		let before_col = value.replace(/(\d{2}):(\d{2})/, '$2');
		let minutes = Number(before_col)/60;
		let new_time =  hours + minutes;
		return new_time;
}



const Cell = (props) => {
  return <Table.Cell {...props} />;
};

const EditCell = (props) => {
  return <TableEditRow.Cell {...props} />;
};



const DateFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3');


const DateTimeFormatter = ({ value }) => value.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$1/$2/$3  $4:$5');


const TimeFormatter = ({ value }) =>{
	return value;	
};

const Time = ({ value, onValueChange }) => (
<NumberFormat
	customInput={TextField}
	format="##:##" 
	placeholder="--:--" 
	mask={['-', '-', '-', '-']}
	value={value}
	onChange={event => onValueChange(event.target.value)}
/>
)


const DateEditor = ({ value, onValueChange }) => (
	 <TextField
		input={<Input />}
        type="date"
        value={value}
		onChange={event => onValueChange(event.target.value)}
		InputLabelProps={{
          shrink: true,
        }}
      />
)

const DateTime = ({ value, onValueChange }) => (
	 <TextField
		input={<Input />}
        type="datetime-local"
        value={value}
		onChange={event => onValueChange(event.target.value)}
		InputLabelProps={{
          shrink: true,
        }}
      />
)


const DateTypeProvider = props => (
  <DataTypeProvider
    editorComponent={DateEditor}
	formatterComponent={DateFormatter}
    {...props}
  />)

const DateTimeTypeProvider = props => (
	<DataTypeProvider
		editorComponent={DateTime}
		formatterComponent={DateTimeFormatter}
		{...props}
	/>)


const TimeProvider = props =>(
	  <DataTypeProvider
			editorComponent={Time}
			formatterComponent={TimeFormatter}	
			{...props}
	/>
)


const getRowId = row => row.id;

class ViewTable extends Component{
	
	constructor(){
		super();
		this.state = {
				data: [],
				rows:[],
				columns:[
				  { name: 'printedPart', title: 'Printed Part' },
				  { name: 'workingHours', title: 'Working Hours' },
				  { name: 'timeAndDate', title: 'Time and date' },
				  { name: 'finishingTime', title: 'Finishing Time', dataType: 'datetime-local' },
				  { name: 'dayNumber', title: 'Day Number' },
				  { name: 'failureCoef', title: 'Failure Coef'},
				  { name : 'actualWh', title: 'Actual Wh' },
				  { name: 'Remarks', title: 'Remarks'},
				  { name: 'Date', title: 'Date', dataType:'date'}
				],
				tableColumnExtensions:[
					{ columnName: 'printedPart', width: 180},
					{ columnName: 'workingHours', width: 180},
					{ columnName: 'timeAndDate', width: 250},
					{ columnName: 'finishingTime', width: 250},
					{ columnName: 'dayNumber', width: 180},
					{ columnName: 'failureCoef', width: 180},
					{ columnName: 'actualWh', width: 180},
					{ columnName: 'Remarks', width: 180},
					{ columnName: 'Date', width: 180},
				],
				defaultSorting: [{ columnName: 'timeAndDate', direction: 'asc' }],
				sortingStateColumnExtensions: [
				{ columnName: 'timeAndDate', sortingEnabled: false },
				],
				dateColumns: ['Date'],
				dateTimeColumns: ['timeAndDate','finishingTime'],
				TimeColumns: ['workingHours', 'actualWh'],
				editingRowIds: [],
				addedRows: [],
				rowChanges: {},
				deletingRows: [],
				empty_row: [],
				totalCount: 1,
				pageSize: 1,
				currentPage: 0,
				columnOrder: ['printedPart','workingHours','timeAndDate', 'finishingTime', 'dayNumber', 'failureCoef', 'actualWh', 'Remarks', 'Date'],
				leftFixedColumns: [TableEditColumn.COLUMN_TYPE],
		};

		const getStateDeletingRows = () => {
			const { deletingRows } = this.state;
			return deletingRows;
		};

		const getStateRows = () => {
			const { rows } = this.state;
			return rows;
		};
	
		
		this.changeSorting = sorting => this.setState({ sorting });
		this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
		this.changeCurrentPage = (currentPage) => {  
			this.setState({ currentPage }); 
			if(this.props.machine === "N2"){
				this.setState({ rows: this.props.N2.Get_n2[currentPage].rows })
			}else if(this.props.machine === "N2_plus_150"){
				this.setState({ rows: this.props.N2_Plus_150.Get_n2_plus_150[currentPage].rows })
			}else if(this.props.machine === "N2_plus_50"){
				this.setState({ rows: this.props.N2_Plus_50.Get_n2_plus_50[currentPage].rows })
			}else{
				return null;
			}
			
		}; 
	
		this.changeAddedRows = addedRows => this.setState({
				addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
				printedPart: '',
				workingHours: "00:00",
				timeAndDate: '',
				finishingTime: '',
				dayNumber: '',
				failureCoef: '',
				actualWh: "00:00",
				Remarks: '',
				Date: '',
			})),
		});

		this.changeRowChanges = rowChanges => this.setState({ rowChanges });

		this.commitChanges = ({ added, changed, deleted }) => {
			let { rows } = this.state;
			const { machine } = this.props;
			
			if (changed) {
				let old_rows = rows;
				let keys = Object.keys(changed);
				let row_id; 
				for (const key of keys) {
					row_id = key;
				}
				
				
				if(!isChanged(changed)){

					rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
					
					const vale = {
						printedPart: rows[row_id].printedPart,
						workingHours: time_to_numb(rows[row_id].workingHours),
						timeAndDate: rows[row_id].timeAndDate,
						finishingTime: rows[row_id].finishingTime,
						dayNumber: rows[row_id].dayNumber,
						failureCoef: rows[row_id].failureCoef,
						actualWh: time_to_numb(rows[row_id].actualWh),
						Remarks: rows[row_id].Remarks,
						Date: rows[row_id].Date,
						_id: rows[row_id]._id,
					};
					
					if(isObEmpty(changed[row_id])){
						let query = Object.keys(changed[row_id]);
						for(let i = 0; i < query.length; i++){
							if(query[i] === "Remarks"){
							}else{
								rows[row_id][query[i]] = old_rows[row_id][query[i]];
							}
						}
						this.setState({empty_row: Object.values(changed)});
					}else if(validate_cell(rows[row_id])){
						this.setState({empty_row: Object.values(changed)});
					}else if(!/(\d{2}):(\d{2})/.test(String(rows[row_id].workingHours)) || !/(\d{2}):(\d{2})/.test(String(rows[row_id].actualWh))){
						this.setState({empty_row: Object.values(changed)});
					}
					else{
						
						let keys = Object.keys(changed[row_id]);
						let chnged_val = [];
						for(let i = 0; i < keys.length; i++){
							 chnged_val.push([keys[i], vale[keys[i]]]);	
						}
						
						let json =  chnged_val.reduce(function(p, c) {
									 p[c[0]] = c[1];
									 return p;}, {});
									 
						let query = {id: {_id: vale._id}, query: json};
						
						if(machine === "N2"){
							this.props.put_N2(query);
							this.props.get_N2();
						}else if(machine === "N2_plus_150"){
							this.props.put_N2_plus_150(query);
							this.props.get_N2_plus_150();
						}else if(machine === "N2_plus_50"){
							this.props.put_N2_plus_50(query);
							this.props.get_N2_plus_50();
						}
						
						rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
					}
					
				}else if(validate_cell(rows[row_id])){
					this.setState({empty_row: Object.values(changed)});
				}
				
			}
			
			this.setState({ rows, deletingRows: deleted || getStateDeletingRows() });
		};

		this.cancelDelete = () => this.setState({ deletingRows: [] });
		this.exitDialog = () => this.setState({ empty_row : [] });
		
		this.deleteRows = () => {
			const rows = getStateRows().slice();
			getStateDeletingRows().forEach((rowId) => {
				let index = rows.findIndex(row => row.id === rowId);
				let query = {_id: rows[index]._id };
				if(this.props.machine === "N2"){
					this.props.delete_N2(query);
					this.props.get_N2();
				}else if(this.props.machine === "N2_plus_150"){
					this.props.delete_N2_plus_150(query);
					this.props.get_N2_plus_150();
				}else if(this.props.machine === "N2_plus_50"){
					this.props.delete_N2_plus_50(query);
					this.props.get_N2_plus_50();
				}
				if (index > -1) {
					rows.splice(index, 1);
				}
			});
			this.setState({ rows, deletingRows: [] });
		};
		
	}
	
	componentDidMount(){

		const { machine } = this.props;
		if(machine === "N2"){
			this.props.get_N2();
		}else if(machine === "N2_plus_150"){
			this.props.get_N2_plus_150();
		}else if(machine === "N2_plus_50"){
			this.props.get_N2_plus_50();
		}
		
	}

	static getDerivedStateFromProps(nextProps, prevState){		
		const { machine } = nextProps;
		if(machine === "N2"){
			if(nextProps.N2!==prevState.N2){
				if(empty(nextProps.N2.Get_n2)){
					return { data: [] };
				}else{
				return { data: nextProps.N2.Get_n2,  totalCount: nextProps.N2.Get_n2.length };
				}
			}else { return null };
		}else if(machine === "N2_plus_150"){
			if(nextProps.N2_Plus_150!==prevState.N2_Plus_150 ){
				if(empty(nextProps.N2_Plus_150.Get_n2_plus_150)){
					return { data: [] };
				}else{
					return { data: nextProps.N2_Plus_150.Get_n2_plus_150, totalCount: nextProps.N2_Plus_150.length };
				}
			}else { return null };
		}else if(machine === "N2_plus_50"){
			if(nextProps.N2_Plus_50!==prevState.N2_Plus_50 ){
				if(empty(nextProps.N2_Plus_50.Get_n2_plus_50)){
					return { data: [] };
				}else{
					return { data: nextProps.N2_Plus_50.Get_n2_plus_50,  totalCount: nextProps.N2_Plus_50.length };
				}
			}else { return null };
		}
	};
	
    
	componentDidUpdate(prevProps, prevState) {
		const { machine } = this.props;
		const { currentPage } = this.state;
		
		if(machine === "N2"){
			if(prevProps.N2!==this.props.N2  ){
				if(empty(this.props.N2.Get_n2)){
					this.setState({
						data: [],
						rows: [],
					})
				}else{
					this.setState({
						data: this.props.N2.Get_n2,
						totalCount: this.props.N2.Get_n2.length,
						rows: this.props.N2.Get_n2[currentPage].rows
					});
				}
			}else{
				return null;
			}
		}else if(machine === "N2_plus_150"){
			if(prevProps.N2_Plus_150!==this.props.N2_Plus_150){
				if(empty(this.props.N2_Plus_150.Get_n2_plus_150)){
					this.setState({
						rows: [],
						data: [],
					})
				}else{
					this.setState({
						data: this.props.N2_Plus_150.Get_n2_plus_150,
						totalCount: this.props.N2_Plus_150.Get_n2_plus_150.length,
						rows: this.props.N2_Plus_150.Get_n2_plus_150[currentPage].rows,
					});
				}
			}else{
				return null;
			}
		}else if(machine === "N2_plus_50"){
			if(prevProps.N2_Plus_50!==this.props.N2_Plus_50){
				if(empty(this.props.N2_Plus_50.Get_n2_plus_50)){
					this.setState({
						rows: [],
						data: [],
					})
				}else{
					this.setState({
						data: this.props.N2_Plus_50.Get_n2_plus_50,
						totalCount: this.props.N2_Plus_50.Get_n2_plus_50.length,
						rows: this.props.N2_Plus_50.Get_n2_plus_50[currentPage].rows,
					});
				}
			}else{
				return null;
			}
		}
	}
  

	
	render(){
		const { classes } = this.props;
		const { 
			rows,
			columns,
			tableColumnExtensions,
			editingRowIds,
			defaultSorting,
			rowChanges,
			addedRows,
			deletingRows,
			leftFixedColumns,
			empty_row,
			dateColumns,
			dateTimeColumns,
			sortingStateColumnExtensions,
			TimeColumns,
			pageSize, 
			currentPage, 
			totalCount 
		} = this.state;
				
		return(
		<Paper>
			<Grid
			  rows={rows}
			  columns={columns}
			  getRowId={getRowId}
			>
			<PagingState
				currentPage={currentPage}
				onCurrentPageChange={this.changeCurrentPage}
				pageSize={pageSize}
			/>
			
			<CustomPaging
				totalCount={totalCount}
			/>
			
			<SortingState
				defaultSorting={defaultSorting}
				onSortingChange={this.changeSorting}
				columnExtensions={sortingStateColumnExtensions}
			/>
			
			<EditingState
					editingRowIds={editingRowIds}
					onEditingRowIdsChange={this.changeEditingRowIds}
					rowChanges={rowChanges}
					onRowChangesChange={this.changeRowChanges}
					addedRows={addedRows}
					onAddedRowsChange={this.changeAddedRows}
					onCommitChanges={this.commitChanges}
			/>
			
			<IntegratedSorting />
			
			<TimeProvider 
				for={TimeColumns}
			/>
			<DateTypeProvider
				for={dateColumns}
			/>
			<DateTimeTypeProvider
				for={dateTimeColumns}
			/>
			
			<Table
			style={{paddingBottom: 15}}
			columnExtensions={tableColumnExtensions} 
			cellComponent={Cell}/>
			
			<TableHeaderRow  showSortingControls />
	
			<TableEditRow cellComponent={EditCell}/>
			
			
			<TableEditColumn
            width={150}
            showEditCommand
            showDeleteCommand
            commandComponent={Command}
			/>
			
			<TableFixedColumns
            leftColumns={leftFixedColumns}
			/>
			
			<PagingPanel />
			</Grid>
			<Dialog
				open={!!deletingRows.length}
				onClose={this.cancelDelete}
				classes={{ paper: classes.dialog }}
			>
			
          <DialogTitle>
            Delete Row
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the following row?
            </DialogContentText>
            <Paper>
              <Grid
                rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                columns={columns}
              >
			  
					<TimeProvider 
						for={TimeColumns}
					/>
					<DateTypeProvider
						for={dateColumns}
					/>
					<DateTimeTypeProvider
						for={dateTimeColumns}
					/>
				
                <Table
                  cellComponent={Cell}
				  columnExtensions={tableColumnExtensions}
                />
				
                <TableHeaderRow />
				
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteRows} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
		
		
		<Dialog
          open={!!empty_row.length}
          onClose={this.exitDialog}
          classes={{ paper: classes.dialog }}
		>
          <DialogTitle>
		   Some field are Empty
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
				Please fill all fields !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.exitDialog} color="secondary" >
              Exit
            </Button>
          </DialogActions>
        </Dialog>
		
		</Paper>
		
		)
		
	}
	
}


ViewTable.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	get_N2: PropTypes.func.isRequired,
	put_N2: PropTypes.func.isRequired,
	get_N2_plus_150: PropTypes.func.isRequired,
	get_N2_plus_50: PropTypes.func.isRequired,
	put_N2_plus_150: PropTypes.func.isRequired,
	put_N2_plus_50: PropTypes.func.isRequired,
	delete_N2: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	N2: state.N2,
	N2_Plus_150: state.N2_Plus_150,
	N2_Plus_50: state.N2_Plus_50
});


export default  connect(mapStateToProps, {  get_N2, put_N2, get_N2_plus_150, get_N2_plus_50, put_N2_plus_150, put_N2_plus_50, delete_N2, delete_N2_plus_150, delete_N2_plus_50 } )(withStyles(styles)(ViewTable));


