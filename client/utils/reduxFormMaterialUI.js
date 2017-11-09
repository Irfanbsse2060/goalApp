// libs
import React from 'react'
import { DatePicker, SelectField, RadioButtonGroup, Checkbox, TextField, AutoComplete } from 'material-ui'

// src

export const renderTextFieldWithFixedLabel = ({ input, label, innerRef, meta: { touched, error }, ...custom }) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFixed
    fullWidth
    errorText={touched && error}
    ref={innerRef}
    hintStyle={{fontSize: 12}}
    {...input}
    {...custom}
  />
)

export const renderTextField = ({ input, label, autoComplete, innerRef, meta: { touched, error, submitting }, ...custom }) => (
  <TextField
    floatingLabelText={ label }
		floatingLabelStyle={{ fontWeight: 400 }}
		fullWidth
		disabled={ submitting }
    errorText={ touched && error }
    ref={ innerRef }
    autoComplete={ autoComplete }
    hintStyle={ {fontSize: 14} }
    {...input}
    {...custom}
		/>
	)
	
	export const renderTextArea = ({ input, label, rows, rowsMax, autoComplete, innerRef,  meta: { touched, error, submitting }, ...custom }) => (
		<TextField
    floatingLabelText={label}
		floatingLabelStyle={{ fontWeight: 400 }}
    fullWidth
		disabled={ submitting }
		multiLine
		rows={rows}
		rowsMax={rowsMax}
    errorText={touched && error}
    ref={innerRef}
    autoComplete={autoComplete}
    hintStyle={{fontSize: 12}}
    {...input}
    {...custom} />
	)
	
	export const renderAutocomplete = ({ input, label, dataSource, innerRef,  meta: { touched, error }, ...custom }) => (
		<AutoComplete
		underlineShow={false}
		inputStyle={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
		fullWidth
		hintText={ label }
		errorText={touched && error}
		dataSource={ dataSource }
		hintStyle={{fontSize: 16, paddingLeft: 15}}
    ref={innerRef}
		filter={AutoComplete.caseInsensitiveFilter} 
		{...input}
		{...custom} />
	)
	
	export const renderCheckbox = ({ input, label, padding }) => (
		<Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    style={{paddingTop: padding[0], paddingRight: padding[1], paddingBottom: padding[2], paddingLeft: padding[3]}}
		/>
	)
	
	export const renderRadioGroup = ({ input, label, ...rest }) => (
		<div style={{margin: '10px 0'}}>
    <label style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.298039)'}}>{label}</label>
    <RadioButtonGroup {...input} {...rest}
		valueSelected={input.value}
		onChange={(event, value) => input.onChange(value)}/>
		</div>
	)
	
	export const renderSelectField = ({ input, label, meta: { touched, error, submitting }, children }) => (
		<SelectField
		disabled={ submitting }
		selectedMenuItemStyle={{ color: '#00ACC1' }}
    floatingLabelText={label}
		floatingLabelStyle={{ fontWeight: 400 }}
		hintStyle={{ fontSize: 14 }} 
    floatingLabelFixed={false}
    fullWidth
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}/>
	)
	
	export const renderDatePicker = ({ input, label, maxDate, minDate, meta: { touched, error, submitting } }) => (
		<DatePicker
		autoOk
		disabled={ submitting }
		fullWidth
		minDate={ minDate }
		maxDate={ maxDate }
		floatingLabelText={ label }
		floatingLabelStyle={{ fontWeight: 400 }}
		errorText = {touched && error} 
		{...input}
		value = {input.value !== '' ? new Date(input.value) : null}
		onChange = {(event, value) => {input.onChange(value)}} />
)

export const renderStyledDatePicker = ({ input, label, meta: { touched, error } }) => (
	<DatePicker
		autoOk
		fullWidth
		underlineShow={ false }
		style={{ border: '1px solid #C9C9C9', borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 4, borderBottomRightRadius: 4, paddingLeft: 15 }}
		textFieldStyle={{ maxHeight: 46 }}
		hintText={ label }
		errorText = {touched && error} 
		{...input}
		value = {input.value !== '' ? new Date(input.value) : null}
		onChange = {(event, value) => {input.onChange(value)}} />
)
