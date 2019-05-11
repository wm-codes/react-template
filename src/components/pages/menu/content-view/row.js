import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
    TableRow,
    TableCell
} from "@material-ui/core";

import {
    SortableHandle,
    SortableElement,
} from "react-sortable-hoc";

const styles = {
    table: {
        margin: 20
    },
    addButton: {
        width: 36,
        height: 36,
        position: "absolute",
        top: 0,
        right: 0
    },
    textField: {
        height: 40,
    },
    selectField: {
        width: 120,
    },
};

const DragHandle = SortableHandle(({ style }) => (
    <span style={{ ...style, ...{ cursor: "move" } }}>{"::::"}</span>
));

class Row extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            label: props.data.label,
            field: props.data.field,
            editable: props.data.editable,
            fields: props.fields,
        };
    }

    handleLabelChange = e => {
        this.setState({label: e.target.value}, () => this.props.onChange({name: 'label', value: this.state.label}, this.props.index))
    }

    handleFieldNameChange = e => {
        this.setState({field: e.target.value}, () => this.props.onChange({name: 'field', value: this.state.field}, this.props.index))
    }

    handleEnableInFormChange = _ => {
        this.setState(prevState => ({ editable: !prevState.editable }), () => this.props.onChange({name: 'editable', value: this.state.editable}, this.props.index))
    }

    // Компонент строки таблицы с оберткой в sortable элемент
    Row = SortableElement(({ data, ...other }) => {
        const { classes } = this.props;
        const { label, field, editable, fields } = this.state;

        return (
            <TableRow {...other}>
                <TableCell style={{ width: "5%" }}>
                    <DragHandle />
                </TableCell>
                <TableCell style={{ width: "150px" }}>
                    <TextField
                        id="outlined-bare"
                        InputProps={{
                            className: classes.textField,
                        }}
                        margin="normal"
                        variant="outlined"
                        value={label}
                        onChange={this.handleLabelChange}
                    />
                </TableCell>
                <TableCell style={{ width: "150px" }}>
                    <Select
                        value={field}
                        onChange={this.handleFieldNameChange}
                        displayEmpty
                        className={classes.selectField}
                    >
                        {(fields || []).map(el => <MenuItem key={el.field} value={el.field}>{el.field}</MenuItem>)}
                    </Select>

                </TableCell>
                <TableCell>
                    <Checkbox
                        checked={editable}
                        onChange={this.handleEnableInFormChange}
                        color="primary"
                        value={editable}
                    />
                </TableCell>
            </TableRow>
        );
    });

    render() {
        const { index, data } = this.props;

        return (
            <this.Row
                index={index}
                data={data}
            />
        );
    }
}

export default withStyles(styles)(Row);
