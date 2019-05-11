import React, { PureComponent } from "react";
import { Link } from 'react-router-dom';

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { withStore } from 'store';

import {
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from "@material-ui/core";

import {
    SortableContainer,
} from "react-sortable-hoc";

import arrayMove from "array-move";

import Row from './row';

const styles = {
    table: {
        margin: 20,
    },
    label: {
        marginLeft: 20,
    },
    addButton: {
        width: 36,
        height: 36,
        position: "absolute",
        top: 0,
        right: 0,
    },
    textField: {
        height: 40,
    },
    selectField: {
        width: 120,
    },
};

const TableBodySortable = SortableContainer(
    ({ children, displayRowCheckbox }) => (
        <TableBody displayRowCheckbox={displayRowCheckbox}>
            {children}
        </TableBody>
    )
);

TableBodySortable.muiName = "TableBody";

class SortableTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tool_id: '',
            menu_id: '',
            menu: {}
        };
    }

    // Обработчик заверщения перемещения, используется helper arrayMove
    handleSortEnd = ({ oldIndex, newIndex }) => {
        let { menu } = this.state;

        menu.data.fields = arrayMove([...menu.data.fields], oldIndex, newIndex);

        this.setState({
            menu: {...menu}
        });
    };

    handleRowAddClick = _ => {
        this.setState({
            // menu.data.fields
            // menu.data.fields: [
            //     ...this.state.menu.data.fields,
            //     {
            //         id: 4,
            //         name: "People 2",
            //         status: "enabled"
            //     },
            // ]
        })
    }

    componentDidMount() {
        this.fetchMenuView();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchMenuView();
        }
    }

    fetchMenuView = () => {
        const path = this.props.history.location.pathname;
        const toolId = path.split('projects/')[1].split('/')[0];
        const menuId = path.split('menu/')[1].split('/')[0];

        this.props.storeActions.getMenuItem({menu_id: menuId, tool_id: toolId})
            .then(response => {
                this.setState({
                    tool_id: toolId,
                    menu_id: menuId,
                    menu: {...response}
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChangeRows = (e, index) => {
        let { menu } = this.state;

        switch(e.name) {
            case 'label':
                menu.data.fields[index].label = e.value;
                break;
            case 'field':
                menu.data.fields[index].field = e.value;
                break;
            case 'editable':
                menu.data.fields[index].editable = e.value;
                break;
            default:
            // code block
        }

        this.setState({
            menu
        });
    }

    handleSaveChanges = () => {
        const { tool_id, menu_id, menu } = this.state;

        this.props.storeActions.editMenu({
            tool_id: tool_id,
            menu_id: menu_id,
            parent_id: menu_id,
            menu: menu
        })
            .then(response => {
                console.log(response);

                // const treeData2 = this.generateTreeData(response);

                // this.setState({
                //     treeData: [...treeData2],
                //     open: false
                // });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { classes } = this.props;
        const { menu } = this.state;
        const fields = menu && menu.data && menu.data.fields.length ? menu.data.fields : [];
        const backPathname = this.props.location.pathname.split('/menu')[0] + '/menu';

        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.label}>Create Menu Content</FormLabel>
                
                <Table className={classes.table}>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        className={classes.addButton}
                        onClick={this.handleRowAddClick}
                    >
                        <AddIcon />
                    </Fab>
                    <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableCell style={{ width: "5%" }}>&nbsp;</TableCell>
                            <TableCell>Label</TableCell>
                            <TableCell>Field Name</TableCell>
                            <TableCell>Enable in Form</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBodySortable
                        onSortEnd={this.handleSortEnd}
                        useDragHandle
                        displayRowCheckbox={false}
                    >
                        {(fields).map((row, index) => (
                            <Row
                                key={row.field}
                                index={index}
                                data={row}
                                fields={fields}
                                onChange={this.handleChangeRows}
                            />
                        ))}
                    </TableBodySortable>
                </Table>
                <Link to={`${backPathname}`}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Cancel
                    </Button>
                </Link>
                <Button onClick={this.handleSaveChanges} variant="contained" color="primary"
                        className={classes.button}>
                    Save
                </Button>
            </FormControl>
        );
    }
}

export default withStore(withStyles(styles)(SortableTable));
