import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value)
    }


    const mappedOptions = options ? options.map((o, i) => (

        <FormControl component="fieldset">
            <RadioGroup defaultValue="female" onChange={onChangeCallback} name="customized-radios">
                <FormControlLabel key={name + "-" + i}
                                  name={name}
                                  value={o}
                                  control={<Radio checked={value === o}/>}
                                  label={o}/>

            </RadioGroup>
        </FormControl>
    )) : [];

    return (
        <>
            {mappedOptions}
        </>
    );
}

export default SuperRadio;
