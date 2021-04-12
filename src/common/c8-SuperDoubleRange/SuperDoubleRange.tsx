import React, {ChangeEvent} from "react";
import {Typography} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value,
        // min, max, step, disable, ...
    }
) => {
    // сделать самому, можно подключать библиотеки

    const onChangeCallback = (e: any, value: (number[] | number)) => {
        onChangeRange && onChangeRange( value as [number, number]);
    }
    return (
        <>

            <Typography id="range-slider" gutterBottom>

            </Typography>
            <Slider
                max={30}
                min={0}
                value={value}
                onChange={onChangeCallback}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"

            />
        </>
    );
}

export default SuperDoubleRange;
