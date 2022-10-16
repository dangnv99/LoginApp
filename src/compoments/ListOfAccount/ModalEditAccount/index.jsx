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
    Modal,
    Toast
} from '@shopify/polaris';
import {
    EditMinor, CalendarMajor
} from '@shopify/polaris-icons';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from 'sub-vn'
import moment from "moment";
import { useFormik } from 'formik';
import * as yup from "yup";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import './index.scss';
import ShowPassWord from '../../../image/ShowPassWord';
import HidePassword from '../../../image/HidePassword';
import { useSelector, useDispatch } from "react-redux";
import { userSettingsOperations } from "../../../state/modules/userSettings";
const ModalEditAccount = (props) => {

    const { userSettings } = useSelector(
        (state) => state
    );

    const dispatch = useDispatch();

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isConfirmRevealPwd, setIsConfirmRevealPwd] = useState(false);
    const [listProvinces, setListProvinces] = useState();
    const [listDistricts, setListDistricts] = useState();
    const [listWards, setListWards] = useState();
    const [showResult, setShowResult] = useState(false);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState();

    const handleChangeModal = () => {
        setActive(!active);
        setLoading(false);
    };
    
    const handleSubmit = () => {
        if(checkConfirmPassword()){
            setLoading(true);
            dispatch(userSettingsOperations.fetchUpdate(dataSubmit.id, dataSubmit, () => {
                dispatch(userSettingsOperations.fetchList(dataSubmit, () => {
                    dispatch(userSettingsOperations.fetchList())
                    handleChangeModal();
                    formik.resetForm();
                }));
            }))
        }
    }

    const activatorMoal = (
        <Button id="btn-outline" onClick={handleChangeModal} icon={EditMinor}></Button>
    );


    const validationSchema = yup.object({
        email: yup.string().email('Email invalid').required("Email is required"),
        password: yup.string().required("Password is required"),
        confirm_password: yup.string().required("Confirm Password is required"),
        user_name: yup.string().required("Confirm Password is required"),
        date_of_birth: yup.string().required("Date of birth is required"),
        city_province: yup.string().required("City/Province is required"),
        district: yup.string().required("District of birth is required"),
        wards: yup.string().required("Wards of birth is required"),
        detailed_address: yup.string().required("Detailed address of birth is required"),
    });

    const formik = useFormik({
        initialValues: {
            user_name: "",
            email: "",
            password: "",
            confirm_password: "",
            date_of_birth: "",
            city_province: "",
            district: "",
            wards: "",
            detailed_address: "",
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: () => {
            handleSubmit()
        },
    });

    let dataSubmit = {
        id: props.selected.id,
        user_name: formik.values.user_name,
        email: formik.values.email,
        password: formik.values.password,
        // confirm_password: formik.values.confirm_password,
        date_of_birth: formik.values.date_of_birth,
        city_province: formik.values.city_province,
        district: formik.values.district,
        wards: formik.values.wards,
        detailed_address: formik.values.detailed_address,
    }
    const handleChange = (value, id, name) => {
        let event = {
            target: {
                id: id,
                name: name,
                value: value,
            }
        }
        formik.handleChange(event)
    }

    const handleError = (key) => {
        return (formik.touched[key] && Boolean(formik.errors[key])) ? (formik.touched[key] && formik.errors[key]) : ""
    }

    const date = new Date();
    const [{ month, year }, setDate] = useState({ month: date.getMonth(), year: date.getFullYear() });
    const [selectedDates, setSelectedDates] = useState(new Date());
    const [popoverActive, setPopoverActive] = useState(false);
    const togglePopoverActive = () => {
        setPopoverActive((popoverActive) => !popoverActive)
    };
    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        [],
    );

    useEffect(() => {
        formik.setValues(
            {
                user_name: props.selected.user_name,
                email: props.selected.email,
                password: props.selected.password,
                confirm_password: props.selected.confirm_password,
                date_of_birth: props.selected.date_of_birth,
                city_province: props.selected.city_province,
                district: props.selected.district,
                wards: props.selected.wards,
                detailed_address: props.selected.detailed_address,
            }
        )

        let data = getProvinces();
        let newData = data.map((item) => ({ label: item.name, value: item.code }));
        setListProvinces(newData)

        if (props.selected.city_province && newData) {
            let dataDistrict = getDistrictsByProvinceCode(props.selected.city_province);
            let newDataDistrict = dataDistrict.map((item) => ({ label: item.name, value: item.code }));
            setListDistricts(newDataDistrict);
            if (newDataDistrict && props.selected.wards) {
                let dataWards = getWardsByDistrictCode(props.selected.district);
                let newDataWards = dataWards.map((item) => ({ label: item.name, value: item.code }));
                setListWards(newDataWards);
            }
        }
    }, [props.selected]);

    useEffect(() => {
        let data = getProvinces();
        let newData = data.map((item) => ({ label: item.name, value: item.code }));
        setListProvinces(newData)
    }, []);

    const handleGetListDistrict = (provinces) => {
        if (provinces) {
            let dataDistrict = getDistrictsByProvinceCode(provinces);
            let newDataDistrict = dataDistrict.map((item) => ({ label: item.name, value: item.code }));
            setListDistricts(newDataDistrict);
        }
    }
    const handleGetListWards = (districts) => {
        if (districts) {
            let dataWards = getWardsByDistrictCode(districts);
            let newDataWards = dataWards.map((item) => ({ label: item.name, value: item.code }));
            setListWards(newDataWards);
        }
    }
    const {
        placePredictions,
        getPlacePredictions,
    } = usePlacesService({
        apiKey: 'AIzaSyB6EejE-BbzkbGKgcY-dYXeSPaq36O7Jf0',
        debounce: 300,
        language: "vi",
        options: {
            input: 'vietnam',
            componentRestrictions: { country: 'vn' },
        }
    });

    const handleSelectAddress = useCallback((terms) => {
        let convertTerms = [];
        if (terms.length > 4) {
            convertTerms = terms.splice(0, terms.length - 2);
        } else {
            convertTerms = terms;
        }
        const convertAddress = convertTerms
            .map((item) => item.value)
            .join(", ");
        handleChange(convertAddress, 'detailed_address', 'detailed_address')
        setShowResult(false);
    }, []);

    const validateInput = (value) => {
        return value.replace(/<[^>]+>/g, "").trim();
    };
    const checkConfirmPassword = () => {
        let check = true;
        if (formik.values.password != formik.values.confirm_password) {
            setErrorConfirm('Comfirm Password Invalid')
            check = false;
        }
        else {
            setErrorConfirm()
        }
        return check;
    }
    return (
        <Modal
            activator={activatorMoal}
            open={active}
            onClose={handleChangeModal}
            title={props.title}
        >
            <form onSubmit={formik.handleSubmit}>
                <div className="sign-up-account-edit">
                    <div className="list-text-setting">
                        <div className="text-setting-item">
                            <TextField
                                label="User name"
                                id="user_name"
                                name="user_name"
                                placeholder="Your name"
                                value={formik.values.user_name}
                                onChange={(value, id) => { handleChange(value, id, 'user_name') }}
                                onBlur={(val, id) => { handleChange(validateInput(val.target.value), id, 'user_name') }}
                                error={handleError('password')}
                            />
                        </div>

                        <div className="text-setting-item">
                            <TextField
                                label="Password"
                                id="password"
                                name="password"
                                type={isRevealPwd ? "text" : "password"}
                                placeholder="Your password"
                                value={formik.values.password}
                                onChange={(value, id) => { handleChange(value, id, 'password') }}
                                onBlur={(val, id) => { handleChange(validateInput(val.target.value), id, 'password') }}
                                error={handleError('password')}
                                suffix={
                                    <Button
                                        plain
                                        onClick={() => setIsRevealPwd(prevState => !prevState)}
                                    >
                                        {isRevealPwd ? <ShowPassWord /> : <HidePassword />}
                                    </Button>
                                }
                            />
                        </div>

                        <div className="text-setting-item">
                            <TextField
                                label="Comfirm password"
                                id="confirm_password"
                                name="confirm_password"
                                type={isConfirmRevealPwd ? "text" : "password"}
                                placeholder="Your comfirm password"
                                value={formik.values.confirm_password}
                                onChange={(value, id) => {
                                     handleChange(value, id, 'confirm_password')
                                     setErrorConfirm()
                                    }}
                                onBlur={(val, id) => { handleChange(validateInput(val.target.value), id, 'confirm_password') }}

                                error={errorConfirm ? errorConfirm : handleError('confirm_password')}
                                suffix={
                                    <Button
                                        plain
                                        onClick={() => setIsConfirmRevealPwd(prevState => !prevState)}
                                    >
                                        {isConfirmRevealPwd ? <ShowPassWord /> : <HidePassword />}
                                    </Button>
                                }
                            />
                        </div>

                        <div className="text-setting-item">
                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={(value, id) => { handleChange(value, id, 'email') }}
                                onBlur={(val, id) => { handleChange(validateInput(val.target.value), id, 'email') }}
                                error={handleError('email')}
                            />
                        </div>

                        <div className="text-setting-item">
                            <Popover
                                active={popoverActive}
                                fullWidth
                                sectioned
                                activator={
                                    <TextField
                                        type="text"
                                        label='Date of Birth'
                                        id='date_of_birth'
                                        name='date_of_birth'
                                        error={handleError('date_of_birth')}
                                        prefix={
                                            <div onClick={togglePopoverActive} style={{ cursor: 'pointer' }}>
                                                <Icon
                                                    source={CalendarMajor}
                                                    color="base"
                                                />
                                            </div>
                                        }
                                        value={formik.values.date_of_birth}
                                        y
                                        onFocus={togglePopoverActive}
                                    />
                                }>
                                <DatePicker
                                    month={month}
                                    year={year}
                                    onChange={
                                        (value) => {
                                            let dateSelect = new Date();
                                            dateSelect.setDate(value.start.getDate());
                                            dateSelect.setMonth(value.start.getMonth());
                                            dateSelect.setFullYear(value.start.getFullYear());
                                            let dateSelected = moment(dateSelect).format("DD/MM/YYYY");
                                            setSelectedDates(dateSelect);
                                            handleChange(dateSelected, 'date_of_birth', 'date_of_birth')
                                            togglePopoverActive();
                                        }
                                    }
                                    onMonthChange={handleMonthChange}
                                    selected={selectedDates}
                                />
                            </Popover>
                        </div>

                        <div className="text-setting-item">
                            <FormLayout>
                                <FormLayout.Group condensed>
                                    <Select
                                        label="City/Province"
                                        id="city_province"
                                        name="city_province"
                                        options={listProvinces}
                                        value={formik.values.city_province}
                                        placeholder="Your city/province"
                                        onChange={(value, id) => {
                                            handleGetListDistrict(value)
                                            handleChange(value, id, 'city_province')
                                            if(formik.values.district){
                                                handleChange('', 'district', 'district')
                                            }
                                        }}
                                        error={handleError('city_province')}
                                    />
                                    <Select
                                        label="District"
                                        id="district"
                                        name="district"
                                        options={listDistricts}
                                        placeholder="Your district"
                                        value={formik.values.district}
                                        onChange={(value, id) => {
                                            handleGetListWards(value)
                                            handleChange(value, id, 'district')
                                            if(formik.values.wards){
                                                handleChange('', 'wards', 'wards')
                                            }
                                        }}

                                        error={handleError('district')}
                                    />
                                    <Select
                                        label="Wards"
                                        id="wards"
                                        name="wards"
                                        options={listWards}
                                        placeholder="Your wards"
                                        value={formik.values.wards}
                                        onChange={(value, id) => {
                                            handleChange(value, id, 'wards')
                                        }}
                                        error={handleError('wards')}
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </div>

                        <div className="text-setting-item">
                            <TextField
                                label="Detailed address"
                                id="detailed_address"
                                name="detailed_address"
                                error={handleError('detailed_address')}
                                onChange={(value, id) => {
                                    handleChange(value, id, 'detailed_address')
                                    getPlacePredictions({
                                        input: value,
                                    });
                                    setShowResult(true);

                                }}
                                onBlur={(val, id) => { handleChange(validateInput(val.target.value), id, 'detailed_address') }}
                                onMouseLeave={() => setShowResult(false)}
                                value={formik.values.detailed_address}
                            />
                            {showResult &&
                                (
                                    <div className="text-setting-item"
                                        onMouseLeave={() => setShowResult(false)}
                                    >
                                        <div className="detailed-result">
                                            {placePredictions.length > 0 &&
                                                placePredictions.map((item) => (
                                                    <p
                                                        key={item.place_id}
                                                        className="autocomplete-result-item"
                                                        onClick={() => {
                                                            handleSelectAddress(
                                                                item.terms
                                                            )
                                                        }}
                                                    >
                                                        {item.description}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className="text-setting-item" style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <div style={{ color: '#bf0711', marginRight: '10px' }}>
                                <Button monochrome outline
                                    onClick={() => {
                                        //  formik.resetForm();
                                        handleChangeModal();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                            <Button primary submit loading={loading}>
                                Submit
                            </Button>
                        </div>
                    </div>

                </div>
            </form>
        </Modal>
    )
};
export default ModalEditAccount;