import React, { useEffect, useState } from "react";
import Select from "react-select";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

function LocationSelect({ field, form, border }) {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const screenSize = useSelector(selectScreenSize);
	useEffect(() => {
		fetch(
			"https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code",
		)
			.then((response) => response.json())
			.then((data) => {
				setCountries(data.countries);
				setSelectedCountry(data.userSelectValue);
			});
	}, []);

	const customStyles = {
		control: (provided) => ({
			...provided,
			border: "1px solid #c1c1c1",
			borderRadius: "10px",
			minHeight: "40px",
			boxShadow: "none",
			border: border,
			"&:hover": {
				border: "1px solid black",
			},
			backgroundColor: "#f5f5f5",
			height: "40px",
		}),
		option: (provided, state) => ({
			...provided,
			color: "black",
			zIndex: 99999999,
		}),
		menu: (provided) => ({
			...provided,
			zIndex: 99999999,
		}),
	};

	const handleCountryChange = (selectedOption) => {
		setSelectedCountry(selectedOption);
		form.setFieldValue(field.name, selectedOption.value);

		// console.log(field.name, selectedOption.value)
	};

	return (
		<Select
			options={countries}
			value={selectedCountry}
			onChange={handleCountryChange}
			styles={customStyles}
		/>
	);
}

export default LocationSelect;
