import React, { useState, useCallback, useEffect } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import {
    Layout,
    Card,
    TextField,
    Heading,
    Button,
    Popover,
    DatePicker,
    Icon,
    Select,
    FormLayout,
    ButtonGroup,
    DataTable
} from '@shopify/polaris';
import {
    CalendarMajor
} from '@shopify/polaris-icons';
import moment from "moment";
import { useFormik } from 'formik';
import * as yup from "yup";
import './index.scss';
import ModalDelete from './ModalDelete';
import ModalEditAccount from './ModalEditAccount';
import MUIDataTable from "mui-datatables";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { getWards, getDistricts, getProvinces } from 'sub-vn'
import { useSelector, useDispatch } from "react-redux";
import { userSettingsOperations } from "../../state/modules/userSettings";

const ListOfAccount = () => {


    const { userSettings } = useSelector(
        (state) => state
    );

    const dispatch = useDispatch();

    const [listOfAccount, setListOfAccount] = useState(userSettings?.listUserSettings)
    const [listOfWards, setListOfWards] = useState(getWards())
    const [listOfDistricts, setListOfDistricts] = useState(getDistricts())
    const [listOfProvinces, setListOfProvinces] = useState(getProvinces())
    const validateInput = (value) => {
        return value.replace(/<[^>]+>/g, "").trim();
    };

    useEffect(() => {
        dispatch(userSettingsOperations.fetchList())
    }, []);

    useEffect(() => {
        setListOfAccount(userSettings?.listUserSettings)
    }, [userSettings?.listUserSettings]);

    const columns = [
        {
            label: "User name",
            name: "user_name",
            options: {
                display: true,
                filter: false,
                noHeaderWrap: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <p>{value}</p>
                        </div>
                    );
                },
            },
        },

        {
            label: "Password",
            name: "password",
            options: {
                display: true,
                filter: false,
                noHeaderWrap: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            {value}
                        </div>
                    );
                },
            },
        },

        {
            label: "Email",
            name: "email",
            options: {
                display: true,
                filter: false,
                noHeaderWrap: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            {value}
                        </div>
                    );
                },
            },
        },

        {
            label: "Date of birth",
            name: "date_of_birth",
            options: {
                display: true,
                filter: false,
                noHeaderWrap: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            {value}
                        </div>
                    );
                },
            },
        },

        {
            label: "City/province - District - Wards",
            name: "id",
            options: {
                display: true,
                filter: false,
                noHeaderWrap: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const selected = tableMeta.tableData.find(
                        (element) => element.id === value
                    );
                    let province = listOfProvinces.find((item) => item.code == selected.city_province).name
                    let district = listOfDistricts.find((item) => item.code == selected.district).name
                    let ward = listOfWards.find((item) => item.code == selected.wards).name
                    return (
                        <div>
                            {selected.detailed_address},{ward},{district},{province}
                        </div>
                    );
                },
            },
        },

        {
            label: "Edit/Delete",
            name: "id",
            options: {
                display: true,
                filter: false,
                noHeaderWrap: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    var index = tableMeta.rowIndex;
                    const selected = tableMeta.tableData.find(
                        (element) => element.id === value
                    );
                    // let getData = data.find(element => element.id == tableMeta.tableData[index]["id"])
                    return (
                        <div>
                            <div style={{ display: "flex" }}>
                                <ModalEditAccount
                                    title="Edit Account"
                                    action={async () => {

                                    }}
                                    selected={selected}
                                />
                                <ModalDelete
                                    title="Do you want to delete?"
                                    action={async (success = () => { }) => {
                                        dispatch(userSettingsOperations.fetchDelete(value, () => {
                                            dispatch(userSettingsOperations.fetchList(
                                                success()
                                            ))
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                    );
                },
            },
        },
    ]

    const options = {
        filterType: "multiselect",
        selectableRows: "false",
        search: false,
        download: false,
        print: false,
        filter: false,
        rowsSelected: [],
        viewColumns: false,
        selectableRowsHideCheckboxes: true,
        selectableRowsOnClick: false,
        selectableRowsHeader: false,
    };

    const getMuiTheme = () =>
        createTheme({
            overrides: {
                MuiTableCell: {
                    root: {
                        fontSize: "1.3rem",
                        padding: "5px",
                    },
                },
                MuiButton: {
                    root: {
                        fontSize: "1.3rem",
                        fontWeight: "bold",
                    },
                },
                MUIDataTable: {
                    responsiveBase: {
                        padding: "0 20px 20px 20px",
                    },
                },
                MUIDataTableHeadCell: {
                    root: {
                        fontWeight: "bold",
                    },
                },
                MuiTypography: {
                    root: {
                        fontSize: "1.3rem!important",
                    },
                },
                MUIDataTableToolbar: {
                    actions: {
                        flex: "none",
                    },
                },
            },
        });

    return (

        <div className="list-of-account">
            <Card>

                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={
                            <p style={{ fontSize: '25px', fontWeight: 'bolder' }}>
                                List of accounts
                            </p>
                        }
                        columns={columns}
                        options={options}
                        data={listOfAccount}
                    />
                </MuiThemeProvider>
            </Card>
        </div>

    )
};
export default ListOfAccount;