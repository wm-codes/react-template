
import React, { PureComponent, Fragment } from 'react';
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";

import Fetch from 'utils/fetch';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { withStore } from 'store';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import MaterialUIForm from 'material-ui-form'
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';


import 'react-sortable-tree/style.css';

const maxDepth = 2;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    field: {
        marginTop: 35,
        marginLeft: 50,
        marginRight: 50,
        display: 'flex',
    },
    button2: {
        margin: theme.spacing.unit,
        float: 'right',
    },
    wrapper: {
        height: '100%',
        width: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    treeWrapper: {
        // height: calc(100% - 25px);
        // height: theme.spacing.height - 25,
        height: '500px',
    }
});

class Menu extends PureComponent {
    state = {
        treeData: [],
        open: false,
        modal: false,
        order_mode: false,
        tool_id: '',
        menu_id: '',
        title: '',
        menu: {icon: '', label: '', url: '', _id: ''}
    };

    componentDidMount() {
        this.fetchMenus();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchMenus();
        }
    }

    generateTreeData (data) {
        const treeData = (data || []).map(el => {

            let children = [];

            (el.submenus || []).forEach(sub => {
                children.push({
                    _id: sub._id,
                    expanded: true,
                    title: `${sub.icon} ${sub.label} ${sub.url}`,
                    data: sub
                })
            })

            return {
                _id: el._id,
                expanded: true,
                title: `icon: ${el.icon} lable: ${el.label} url: ${el.url}`,
                children: children,
                data: el
            }
        });

        return treeData;
    }

    addToTreeData(data) {

        let { treeData } = this.state;

        let children = [];

        (data.submenus || []).forEach(sub => {
            children.push({
                _id: sub._id,
                expanded: true,
                title: `${sub.icon} ${sub.label} ${sub.url}`,
                data: sub
            })
        })

        let temp = {
            _id: data._id,
            expanded: true,
            title: `icon: ${data.icon} lable: ${data.label} url: ${data.url}`,
            children: children,
            data: data
        };

        return [temp, ...treeData];
    }

    updateTreeData(data) {
        let { treeData } = this.state;

        let children = [];

        const index = treeData.findIndex(el => el._id === data._id);

        (data.submenus || []).forEach(sub => {
            children.push({
                _id: sub._id,
                expanded: true,
                title: `${sub.icon} ${sub.label} ${sub.url}`,
                data: sub
            })
        })

        let temp = {
            _id: data._id,
            expanded: true,
            title: `icon: ${data.icon} lable: ${data.label} url: ${data.url}`,
            children: children,
            data: data
        };

        treeData[index] = temp;

        return treeData;
    }

    fetchMenus = () => {
        const path = this.props.history.location.pathname;
        const toolId = path.split('projects/')[1].split('/')[0];
        const { order_mode } = this.state;

        this.setState({
            tool_id: toolId
        });

        this.props.storeActions.getMenusByToolID({id: toolId})
            .then(response => {

                const treeData = this.generateTreeData(response);

                this.setState({
                    treeData,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleMenuAdd = () => {
        this.setState({
            modal: true,
            title: 'Add menu item',
            menu: {icon: '', label: '', url: '', _id: ''}
        });
    };

    handleChangeMode = () => {
        let {order_mode} = this.state

        this.setState({
            order_mode: !order_mode,
        });
    }

    handleMenuRemove = (rowInfo) => {
        this.setState({
            open: true,
            menu_id: rowInfo.node.data._id
        });
    }

    handleMenuEdit = (data) => {
        let state = {...this.state};

        state.title = 'Edit ' + data.node.data.label + ' item';
        state.menu.icon = data.node.data.icon || '';
        state.menu.label = data.node.data.label || '';
        state.menu.url = data.node.data.url || '';
        state.menu._id = data.node.data._id;
        state.modal = true;

        this.setState(
            state
        );
    };

    submit = (values) => {
        if (values._id) {
            this.props.storeActions.editMenu({
                tool_id: this.state.tool_id,
                menu_id: values._id,
                parent_id: values._id,
                menu: values
            }).then(response => {
                const treeData = this.updateTreeData(response);

                this.setState({
                    treeData: [...treeData],
                    modal: false
                });
            })
        } else {
            this.props.storeActions.createNewMenu({
                id: this.state.tool_id,
                menu: {icon: values.icon, label: values.label, url: values.url}
            }).then(response => {
                const treeData = this.addToTreeData(response);
                this.setState({
                    treeData,
                    modal: false
                });
            })
        }

    }

    handleConfirmDelete = () => {
        this.props.storeActions.deleteMenu({
            tool_id: this.state.tool_id,
            menu_id: this.state.menu_id
        })
            .then(response => {
                const treeData = this.generateTreeData(response);

                this.setState({
                    treeData: treeData,
                    open: false
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleCloseModal = () => {
        this.setState({
            modal: false,
        });
    };

    handleSaveOrdering = () => {
        const { treeData } = this.state;
        let menus_id = [];

        (treeData || []).forEach ( menu => {
            let subMenus = [];
            (menu.children || []).forEach ( child => {
                subMenus.push(child._id);
            })

            menus_id.push({_id: menu._id, sub_ids: subMenus});
        })

        this.props.storeActions.orderMenus({
            tool_id: this.state.tool_id,
            menus_ids: menus_id,
        })
            .then(response => {
                const treeData2 = this.generateTreeData(response);

                this.setState({
                    treeData: [...treeData2],
                    open: false
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleTreeOnChange = treeData => {
        this.setState({ treeData });
    };

    render() {
        const { classes } = this.props;
        const {open, modal, menu, order_mode, title} = this.state;

        const {
            treeData,
        } = this.state;

        return (
            <Fragment>
                {!order_mode ? (
                    <div>
                        <Button onClick={this.handleChangeMode} variant="contained" color="primary"
                                className={classes.button}>
                            Order Mode
                        </Button>
                        <Button onClick={this.handleMenuAdd} variant="contained" color="primary"
                                className={classes.button}>
                            Create Menu
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button onClick={this.handleChangeMode} variant="contained" color="primary"
                                className={classes.button}>
                            Edit Mode
                        </Button>
                        <Button onClick={this.handleSaveOrdering} variant="contained" color="primary"
                                className={classes.button}>
                            Save Order
                        </Button>
                    </div>
                )}

                <div className={classes.treeWrapper}>
                    <SortableTree
                        treeData={treeData}
                        onChange={this.handleTreeOnChange}
                        onMoveNode={({ node, treeIndex, path }) =>
                            global.console.debug(
                                "node:",
                                node,
                                "treeIndex:",
                                treeIndex,
                                "path:",
                                path
                            )
                        }
                        maxDepth={maxDepth}
                        canDrag={({ node }) => order_mode}
                        canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
                        isVirtualized={true}
                        generateNodeProps={rowInfo => ({
                            buttons: [
                                <div>
                                    {(!rowInfo.node.children || !rowInfo.node.children.length) && (
                                    <Link to={`${this.props.location.pathname}/${rowInfo.node.data._id}/view`}>
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            View
                                        </Button>
                                    </Link>
                                    )}

                                    <IconButton aria-label="Edit">
                                        <EditIcon onClick={() => this.handleMenuEdit(rowInfo)}/>
                                    </IconButton>
                                    {!order_mode && (
                                        <IconButton aria-label="Delete">
                                        <DeleteIcon onClick={() => this.handleMenuRemove(rowInfo)}/>
                                    </IconButton>
                                        )}
                                </div>
                            ]
                        })}
                    />
                </div>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you want to Delete this Menu Item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseModal} color="primary">
                            NO
                        </Button>
                        <Button onClick={this.handleConfirmDelete} color="primary" autoFocus>
                            YES
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={modal}
                    onClose={this.handleCloseModal}
                    title='{title}'
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <MaterialUIForm onSubmit={this.submit}>
                        <DialogContent>
                            <TextField
                                type="hidden"
                                name="_id"
                                autoFocus={false}
                                value={menu._id}
                                data-validators="isAlias"
                                variant="outlined"
                            />

                            <TextField
                                className={classes.field}
                                label="Icon"
                                type="text"
                                name="icon"
                                autoFocus={true}
                                value={menu.icon}
                                data-validators="isRequired,isAlias"
                                variant="outlined"
                            />

                            <TextField
                                className={classes.field}
                                label="Label"
                                type="text"
                                name="label"
                                value={menu.label}
                                data-validators="isRequired,isAlias"
                                variant="outlined"
                            />

                            <TextField
                                className={classes.field}
                                label="URL"
                                type="text"
                                name="url"
                                value={menu.url}
                                data-validators="isRequired"
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" className={classes.button}
                                    onClick={this.handleCloseModal}> Cancel </Button>
                            <Button variant="contained" color="primary" className={classes.button}
                                    type="submit"> Save </Button>
                        </DialogActions>
                    </MaterialUIForm>
                </Dialog>
            </Fragment>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStore(withStyles(styles)(Menu)));