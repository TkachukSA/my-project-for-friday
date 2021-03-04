import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../common/c7-SuperRange/SuperRange";
import SuperDoubleRange from "../common/c8-SuperDoubleRange/SuperDoubleRange";


function PreJunior() {
    let arr = ['1', '2', '3']
    const [checked, setChecked] = useState(false)
    const [EditableSpan, setEditableSpan] = useState('false')
    const [value, setvalue] = useState(arr[0])
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(100)

    return (
        <div>
            <div><SuperInputText/></div>
            <div><SuperButton onClick={() => alert('hi')}>delite</SuperButton></div>
            <div><SuperCheckbox checked={checked} onChangeChecked={setChecked}>{'sdcsdd'}</SuperCheckbox></div>
            <div><SuperEditableSpan value={EditableSpan} onChangeText={setEditableSpan}
                                    spanProps={{children: checked ? undefined : "enter text..."}}/></div>
            <div><SuperSelect options={arr} value={value} onChangeOption={setvalue}/></div>
            <div><SuperRadio name={"radio"}
                             options={arr}
                             value={value}
                             onChangeOption={setvalue}
                             onChange={(e) => setvalue(e.currentTarget.value)}/></div>
            <div><SuperRange value={value1}
                             onChangeRange={setValue1}/></div>
            <div><SuperDoubleRange value={[value1, value2]}/></div>
        </div>


    );
}

export default PreJunior;

